import { HTTPClient } from "../http";
import { QueryParams, ResponseMeta } from "../types";

export class CouponsService {
    constructor(private readonly http: HTTPClient) {}

    // GET /coupons
    async list(params?: {
        page?: number;
        limit?: number;
        active?: boolean;
        code?: string;
    }): Promise<{ data: any; meta: ResponseMeta }> {
        const query: QueryParams = {
            page: params?.page,
            limit: params?.limit,
            active: params?.active,
            code: params?.code
        };
        return this.http.request("GET", "/coupons", { query });
    }

    // POST /coupons
    async create(payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("POST", "/coupons", { body: payload });
    }

    // GET /coupons/{couponId}
    async get(couponId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("GET", `/coupons/${couponId}`);
    }

    // PATCH /coupons/{couponId}
    async update(couponId: string, payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("PATCH", `/coupons/${couponId}`, { body: payload });
    }

    // DELETE /coupons/{couponId}
    async delete(couponId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("DELETE", `/coupons/${couponId}`);
    }
}
