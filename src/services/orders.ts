import { HTTPClient } from "../http";
import { QueryParams, ResponseMeta } from "../types";

export class OrdersService {
    constructor(private readonly http: HTTPClient) {}

    // GET /orders
    async list(params?: {
        page?: number;
        limit?: number;
        status?: string;
        product_id?: string;
        customer_email?: string;
    }): Promise<{ data: any; meta: ResponseMeta }> {
        const query: QueryParams = {
            page: params?.page,
            limit: params?.limit,
            status: params?.status,
            product_id: params?.product_id,
            customer_email: params?.customer_email
        };
        return this.http.request("GET", "/orders", { query });
    }

    // POST /orders
    async create(payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("POST", "/orders", { body: payload });
    }

    // GET /orders/{orderId}
    async get(orderId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("GET", `/orders/${orderId}`);
    }

    // PATCH /orders/{orderId}
    async update(orderId: string, payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("PATCH", `/orders/${orderId}`, { body: payload });
    }
}
