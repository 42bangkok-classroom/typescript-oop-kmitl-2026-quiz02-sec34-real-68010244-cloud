import axios from "axios";
interface Geo {
  lat: string;
  lng: string;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface ApiUser {
  id: number;
  name?: string;
  phone?: string;
  address?: Address;
}
interface UserOutput {
  id: number;
  name: string | null;
  phone: string | null;
  address: Address | null;
}
export async function safeFetchUser(userId: number): Promise<UserOutput | null> {
  if (userId <= 0) {
    return null;
  }
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await axios.get<ApiUser[]>(url);
    const data = response.data;
    if (!data) {
      return null;
    }
    const user = data.find((u) => u.id === userId);
    if (!user) {
      return null;
    }
    const result = {
      id: user.id,
      name: user.name ?? null,
      phone: user.phone ?? null,
      address: user.address ?? null,
    };
    return result;
  } catch (error) {
    return null;
  }
}