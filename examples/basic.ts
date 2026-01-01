import { SelliumClient } from "../src/index"


const client = new SelliumClient({
    baseUrl: "https://sellium.site/api/v1",
    apiKey: "YOUR_API_KEY",
    storeId: "YOUR_STORE_ID"
});

async function main() {
    const { data, meta } = await client.products.list({ page: 1, limit: 20 });
    console.log("Products:", data?.products?.length ?? "(see API envelope shape)");
    if (meta.rateLimit) console.log("Rate remaining:", meta.rateLimit.remaining);
}

main().catch(console.error);
