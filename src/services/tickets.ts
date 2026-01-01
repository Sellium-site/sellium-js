import { HTTPClient } from "../http";
import { QueryParams, ResponseMeta } from "../types";

export class TicketsService {
    constructor(private readonly http: HTTPClient) {}

    // GET /tickets
    async list(params?: {
        page?: number;
        limit?: number;
        status?: string;
        priority?: string;
        email?: string;
    }): Promise<{ data: any; meta: ResponseMeta }> {
        const query: QueryParams = {
            page: params?.page,
            limit: params?.limit,
            status: params?.status,
            priority: params?.priority,
            email: params?.email
        };
        return this.http.request("GET", "/tickets", { query });
    }

    // GET /tickets/{ticketId}
    async get(ticketId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("GET", `/tickets/${ticketId}`);
    }

    // POST /tickets/{ticketId}/reply
    async reply(ticketId: string, payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("POST", `/tickets/${ticketId}/reply`, { body: payload });
    }

    // PATCH /tickets/{ticketId}
    async update(ticketId: string, payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("PATCH", `/tickets/${ticketId}`, { body: payload });
    }
}
