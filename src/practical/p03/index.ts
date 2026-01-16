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
export async function filterUserById(id: number): Promise<UserOutput | string> {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await axios.get<ApiUser[]>(url);
    const data = response.data;
    const us = data.find((u) => u.id === id);
    if (!us) {
      return "Invalid id";
    }
    const result = {
      id: us.id,
      name: us.name ?? null,
      phone: us.phone ?? null,
      address: us.address ?? null,
    };
    return result;
  } catch (error) {
    return "Invalid id";
  }
}