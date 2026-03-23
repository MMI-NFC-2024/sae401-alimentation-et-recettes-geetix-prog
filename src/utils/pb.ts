import PocketBase from "pocketbase";
import type { TypedPocketBase } from "../pocketbase-types";

export function createPb(): TypedPocketBase {
    return new PocketBase(import.meta.env.POCKETBASE_URL) as TypedPocketBase;
}

export async function createAdminPb(): Promise<TypedPocketBase> {
    const pb = createPb();
    await pb.collection("_superusers").authWithPassword(
        import.meta.env.PB_EMAIL,
        import.meta.env.PB_PASSWORD
    );
    return pb;
}
