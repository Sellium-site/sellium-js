// src/client.ts

import { HTTPClient } from "./http"
import type { ClientOptions } from "./types"

import { StoreService } from "./services/store"
import { ProductsService } from "./services/products"
import { OrdersService } from "./services/orders"
import { CouponsService } from "./services/coupons"
import { CustomersService } from "./services/customers"
import { TicketsService } from "./services/tickets"
import { FeedbackService } from "./services/feedback"
import { GroupsService } from "./services/groups"
import { BlacklistService } from "./services/blacklist"

export class SelliumClient {
    private readonly http: HTTPClient

    public readonly store: StoreService
    public readonly products: ProductsService
    public readonly orders: OrdersService
    public readonly coupons: CouponsService
    public readonly customers: CustomersService
    public readonly tickets: TicketsService
    public readonly feedback: FeedbackService
    public readonly groups: GroupsService
    public readonly blacklist: BlacklistService

    constructor(opts: ClientOptions) {
        this.http = new HTTPClient(opts)

        this.store = new StoreService(this.http)
        this.products = new ProductsService(this.http)
        this.orders = new OrdersService(this.http)
        this.coupons = new CouponsService(this.http)
        this.customers = new CustomersService(this.http)
        this.tickets = new TicketsService(this.http)
        this.feedback = new FeedbackService(this.http)
        this.groups = new GroupsService(this.http)
        this.blacklist = new BlacklistService(this.http)
    }

    public request<T = any>(
        method: string,
        path: string,
        opts?: Parameters<HTTPClient["request"]>[2]
    ) {
        return this.http.request<T>(method, path, opts as any)
    }
}
