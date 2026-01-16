import { getPostalAddress } from "../p01";
export async function filterUserById(id: number) {
    const rs = await getPostalAddress();
    const us = rs.find((u) => u.id === id);
    if (!us) {
      return "Invalid id";
    }
    return us;
}
