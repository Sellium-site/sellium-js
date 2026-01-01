import { HTTPClient } from "../http";
import { QueryParams, ResponseMeta } from "../types";

export class CustomersService {
    constructor(private readonly http: HTTPClient) {}

    // GET /customers
    async list(params?: {
        page?: number;
        limit?: number;
        email?: string;
    }): Promise<{ data: any; meta: ResponseMeta }> {
        const query: QueryParams = {
            page: params?.page,
            limit: params?.limit,
            email: params?.email
        };
        return this.http.request("GET", "/customers", { query });
    }

    // GET /customers/{email}
    async get(email: string): Promise<{ data: any; meta: ResponseMeta }> {
        const encoded = encodeURIComponent(email);
        return this.http.request("GET", `/customers/${encoded}`);
    }
}
