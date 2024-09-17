import { client, db } from "."
import { products } from "./schema"
import { skus } from "./productList"

async function seed() {
    await db.delete(products)

    const result = await db.insert(products).values(skus).returning()
}

seed().finally(()=>{
    client.end()
})