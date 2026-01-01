import { HTTPClient } from "../http";
import { QueryParams, ResponseMeta } from "../types";

export class GroupsService {
    constructor(private readonly http: HTTPClient) {}

    // GET /groups
    async list(params?: {
        page?: number;
        limit?: number;
        active?: boolean;
        search?: string;
    }): Promise<{ data: any; meta: ResponseMeta }> {
        const query: QueryParams = {
            page: params?.page,
            limit: params?.limit,
            active: params?.active,
            search: params?.search
        };
        return this.http.request("GET", "/groups", { query });
    }

    // POST /groups
    async create(payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("POST", "/groups", { body: payload });
    }

    // GET /groups/{groupId}
    async get(groupId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("GET", `/groups/${groupId}`);
    }

    // PATCH /groups/{groupId}
    async update(groupId: string, payload: Record<string, any>): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("PATCH", `/groups/${groupId}`, { body: payload });
    }

    // DELETE /groups/{groupId}
    async delete(groupId: string): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("DELETE", `/groups/${groupId}`);
    }
}
