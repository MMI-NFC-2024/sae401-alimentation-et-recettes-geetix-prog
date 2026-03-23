import { createPb } from "./pb";

export function loadAdminAuth(cookieHeader: string | null) {
    const pb = createPb();
    pb.authStore.loadFromCookie(cookieHeader ?? "", "pb_admin_auth");
    return pb;
}
