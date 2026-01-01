import { HTTPClient } from "../http";
import { ResponseMeta } from "../types";

export class StoreService {
    constructor(private readonly http: HTTPClient) {}

    // GET /store
    async get(): Promise<{ data: any; meta: ResponseMeta }> {
        return this.http.request("GET", "/store");
    }
}
