import { HTTPClient } from "../http";
import { QueryParams, ResponseMeta } from "../types";

export class FeedbackService {
    constructor(private readonly http: HTTPClient) {}

    // GET /feedback
    async list(params?: {
        page?: number;
        limit?: number;
        rating?: number;
        has_response?: boolean;
        is_visible?: boolean;
        email?: string;
    }): Promise<{ data: any; meta: ResponseMeta }> {
        const query: QueryParams = {
            page: params?.page,
            limit: params?.limit,
            rating: params?.rating,
            has_response: params?.has_response,
            is_visible: params?.is_visible,
            email: params?.email
        };
        return this.http.request("GET", "/feedback", { query });
    }

    // GET /feedback/{feedbackId}
    async get(feedbackId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("GET", `/feedback/${feedbackId}`);
    }

    // PATCH /feedback/{feedbackId}
    async update(feedbackId: string, payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("PATCH", `/feedback/${feedbackId}`, { body: payload });
    }
}
