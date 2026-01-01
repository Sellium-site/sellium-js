import { HTTPClient } from "../http";
import { QueryParams, ResponseMeta } from "../types";

export class ProductsService {
    constructor(private readonly http: HTTPClient) {}

    // GET /products
    async list(params?: {
        page?: number;
        limit?: number;
        active?: boolean;
        group_id?: string;
    }): Promise<{ data: any; meta: ResponseMeta }> {
        const query: QueryParams = {
            page: params?.page,
            limit: params?.limit,
            active: params?.active,
            group_id: params?.group_id
        };
        return this.http.request("GET", "/products", { query });
    }

    // POST /products
    async create(payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("POST", "/products", { body: payload });
    }

    // GET /products/{productId}
    async get(productId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("GET", `/products/${productId}`);
    }

    // PATCH /products/{productId}
    async update(productId: string, payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("PATCH", `/products/${productId}`, { body: payload });
    }

    // DELETE /products/{productId}
    async delete(productId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("DELETE", `/products/${productId}`);
    }
}
