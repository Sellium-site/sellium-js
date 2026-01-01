import { HTTPClient } from "../http";
import { QueryParams, ResponseMeta } from "../types";

export class BlacklistService {
    constructor(private readonly http: HTTPClient) {}

    // GET /blacklist
    async list(params?: {
        page?: number;
        limit?: number;
        type?: string;
        search?: string;
    }): Promise<{ data: any; meta: ResponseMeta }> {
        const query: QueryParams = {
            page: params?.page,
            limit: params?.limit,
            type: params?.type,
            search: params?.search
        };
        return this.http.request("GET", "/blacklist", { query });
    }

    // GET /blacklist/{entryId}
    async get(entryId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("GET", `/blacklist/${entryId}`);
    }

    // POST /blacklist
    async create(payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("POST", "/blacklist", { body: payload });
    }

    // DELETE /blacklist/{entryId}
    async delete(entryId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("DELETE", `/blacklist/${entryId}`);
    }
}
