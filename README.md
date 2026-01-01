# @sellium/sdk

Official TypeScript/JavaScript SDK for the Sellium API, providing typed access to stores, products, orders, customers, tickets, and more.

This SDK is designed to be **TypeScript-first**, while remaining fully compatible with JavaScript projects.

---

## Features

- Full coverage of Sellium API v1
- TypeScript-first with generated type definitions
- Works in Node.js (18+), Bun, Deno, and modern browsers
- Clean service-based API structure
- Built-in rate limit metadata
- Zero runtime dependencies

---

## Requirements

- Node.js **18+** (or any runtime with `fetch`)
- npm, pnpm, or yarn

---

## Installation

```bash
npm install @sellium-site/sdk
```

---

## Quick Start

```ts
import { SelliumClient } from "@sellium-site/sdk";

const client = new SelliumClient({
  baseUrl: "https://yourdomain.com/api/v1",
  apiKey: "YOUR_API_KEY",
  storeId: "YOUR_STORE_ID",
});

const { data, meta } = await client.products.list({ page: 1, limit: 20 });
console.log("Products:", data.products.length);

if (meta.rateLimit) {
  console.log("Rate remaining:", meta.rateLimit.remaining);
}
```

---

## Authentication

All requests automatically include:

- `X-API-Key`
- `X-Store-ID`

These are configured once when creating the client.

---

## Client Configuration

```ts
const client = new SelliumClient({
  baseUrl: "https://yourdomain.com/api/v1",
  apiKey: process.env.SELLIUM_API_KEY!,
  storeId: process.env.SELLIUM_STORE_ID!,
  userAgent: "my-app/1.0",
  timeoutMs: 30_000,
});
```

---

## Services Overview

The SDK exposes one service per API group:

- `client.store`
- `client.products`
- `client.orders`
- `client.coupons`
- `client.customers`
- `client.tickets`
- `client.feedback`
- `client.groups`
- `client.blacklist`

---

## Example Usage

### Products

```ts
await client.products.list({ page: 1, limit: 25 });
await client.products.get("product_id");
await client.products.create({
  name: "Example Product",
  price_in_cents: 999,
  delivery_type: "file",
});
```

### Orders

```ts
await client.orders.list({ status: "pending" });
await client.orders.get("order_id");
await client.orders.update("order_id", { status: "completed" });
```

### Tickets

```ts
await client.tickets.list({ status: "open" });
await client.tickets.reply("ticket_id", {
  message: "Thanks for reaching out, we'll help you shortly.",
});
```

---

## Rate Limits

Rate limit information is returned with every request:

```ts
const { meta } = await client.products.list();

if (meta.rateLimit) {
  console.log(meta.rateLimit.remaining);
}
```

---

## Error Handling

Errors throw a typed `APIError`:

```ts
import { APIError } from "@sellium-site/sdk";

try {
  await client.products.get("invalid_id");
} catch (err) {
  if (err instanceof APIError) {
    console.error(err.status, err.code, err.message);
  }
}
```

---

## Running Examples Locally

```bash
npm install
npm run build
npx tsx examples/basic.ts
```

---

## Project Structure

```text
sellium-js/
├── src/
│   ├── client.ts
│   ├── http.ts
│   ├── errors.ts
│   ├── types.ts
│   └── services/
├── examples/
│   └── basic.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## License

MIT License

---
## Contributing

Pull requests are welcome.  
Please ensure all code is formatted with `gofmt` and passes `go test ./...` before submitting.

---

## Support

For questions or issues related to the Sellium API, please refer to the official Sellium documentation or open an issue in this repository.
