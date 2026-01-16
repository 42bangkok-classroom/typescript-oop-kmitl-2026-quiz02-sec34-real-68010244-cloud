import ax from 'axios';
interface UserApiRe {
  id: number;
  name: string;
  phone: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}
interface UserData {
  id: number;
  name: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | null;
}

export const getPostalAddress = async (): Promise<UserData[]> => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await ax.get<UserApiRe[]>(url);
    const data = response.data;
    if (!data || data.length === 0) {
      return [];
    }
    const users: UserData[] = data.map((u) => ({
      id: u.id,
      name: u.name,
      phone: u.phone,
      address: u.address ? u.address : null,
    }));
    return users;
  } catch (error) {
    return [];
  }
};

// getPostalAddress().then(u=>{
//     console.log(u)
// })