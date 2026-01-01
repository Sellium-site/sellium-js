// src/http.ts

import { APIError } from "./errors"
import type {
    ClientOptions,
    FetchLike,
    QueryParams,
    ResponseMeta,
    SelliumEnvelope,
} from "./types"
import { buildQuery, parseRateLimit } from "./types"

export class HTTPClient {
    private readonly baseUrl: string
    private readonly apiKey: string
    private readonly storeId: string
    private readonly userAgent: string
    private readonly timeoutMs: number

    private readonly fetchImpl: FetchLike

    constructor(opts: ClientOptions) {
        this.baseUrl = opts.baseUrl.replace(/\/+$/, "")
        this.apiKey = opts.apiKey
        this.storeId = opts.storeId
        this.userAgent = opts.userAgent ?? "@sellium/sdk"
        this.timeoutMs = opts.timeoutMs ?? 30_000

        const f =
            opts.fetch ??
            (globalThis.fetch ? globalThis.fetch.bind(globalThis) : undefined)

        if (!f) {
            throw new Error(
                "No fetch implementation found. Provide `fetch` in ClientOptions or use Node 18+."
            )
        }

        this.fetchImpl = f
    }

    async request<T = any>(
        method: string,
        path: string,
        opts?: { query?: QueryParams; body?: any }
    ): Promise<{ data: T; meta: ResponseMeta }> {
        const url = `${this.baseUrl}${path}${buildQuery(opts?.query)}`

        const headers: Record<string, string> = {
            "X-API-Key": this.apiKey,
            "X-Store-ID": this.storeId,
            Accept: "application/json",
            "User-Agent": this.userAgent,
        }

        let body: string | undefined
        if (opts?.body !== undefined) {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(opts.body)
        }

        const controller = new AbortController()
        const t = setTimeout(() => controller.abort(), this.timeoutMs)

        let resp: Response
        try {
            resp = await this.fetchImpl(url, {
                method,
                headers,
                body,
                signal: controller.signal,
            })
        } catch (e: any) {
            clearTimeout(t)
            throw new APIError(0, "NETWORK_ERROR", e?.message ?? "Network error", e)
        } finally {
            clearTimeout(t)
        }

        const meta: ResponseMeta = {
            status: resp.status,
            headers: resp.headers,
            rateLimit: parseRateLimit(resp.headers),
        }

        const text = await resp.text()

        if (!text) {
            if (resp.ok) return { data: {} as T, meta }
            throw new APIError(resp.status, "HTTP_ERROR", `HTTP ${resp.status}`, {
                status: resp.status,
            })
        }

        let json: any
        try {
            json = JSON.parse(text)
        } catch {
            if (resp.ok) return { data: ({ raw: text } as any) as T, meta }
            throw new APIError(resp.status, "HTTP_ERROR", `HTTP ${resp.status}`, text)
        }

        if (json && typeof json === "object" && "success" in json) {
            const env = json as SelliumEnvelope
            if ((env as any).success === true) {
                return { data: (env as any).data as T, meta }
            }

            const err = (env as any).error ?? {}
            throw new APIError(
                resp.status,
                String(err.code ?? "API_ERROR"),
                String(err.message ?? "Request failed"),
                json
            )
        }

        if (resp.ok) return { data: json as T, meta }
        throw new APIError(resp.status, "HTTP_ERROR", `HTTP ${resp.status}`, json)
    }
}
