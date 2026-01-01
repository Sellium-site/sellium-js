export type Json =
    | null
    | boolean
    | number
    | string
    | Json[]
    | { [key: string]: Json };

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

export type SelliumSuccessEnvelope<TData = any> = {
    success: true;
    data: TData;
};

export type SelliumErrorEnvelope = {
    success: false;
    error?: {
        code?: string;
        message?: string;
        details?: any;
    };
};

export type SelliumEnvelope<TData = any> = SelliumSuccessEnvelope<TData> | SelliumErrorEnvelope;

export type RateLimit = {
    limit: number;
    remaining: number;
    resetSec: number;
};

export type ResponseMeta = {
    status: number;
    headers: Headers;
    rateLimit?: RateLimit;
};

export type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export type ClientOptions = {
    baseUrl: string;
    apiKey: string;
    storeId: string;
    userAgent?: string;
    timeoutMs?: number;
    fetch?: FetchLike;
};

export function buildQuery(params?: QueryParams): string {
    if (!params) return "";
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null) continue;
        sp.set(k, String(v));
    }
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
}

export function parseRateLimit(headers: Headers): RateLimit | undefined {
    const limit = toInt(headers.get("X-RateLimit-Limit"));
    const remaining = toInt(headers.get("X-RateLimit-Remaining"));
    const resetSec = toInt(headers.get("X-RateLimit-Reset"));
    if (limit === undefined && remaining === undefined && resetSec === undefined) return undefined;

    return {
        limit: limit ?? 0,
        remaining: remaining ?? 0,
        resetSec: resetSec ?? 0
    };
}

function toInt(v: string | null): number | undefined {
    if (!v) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
}
