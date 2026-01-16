import axios from "axios";
type newUser = {
  name:string;
  username?:string;
  email?:string;
  address?: {
    street:string;
    suite:string;
    city:string;
    zipcode:string;
    geo: {
      lat:string;
      lng:string;
    };
  } | null;
  phone:string;
  website?:string;
  company?:{
    name:string;
    catchPhrase:string;
    bs:string;
  };
};
type ApiUser = {
  id:number;
  name?:string;
  phone?:string;
  address?:newUser["address"];
};
type UserOutput = {
  id:number;
  name:string | null;
  phone:string | null;
  address:newUser["address"] | null;
};

export async function addUser(newUserData:newUser|null):Promise<UserOutput[]> {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get<ApiUser[]>(url);
    const data = response.data;
    const users: UserOutput[] = data.map((u) => ({
      id: u.id,
      name: u.name ?? null,
      phone: u.phone ?? null,
      address: u.address ?? null,
    }));
    if (!newUserData) {
      return users;
    }
    const lastId = users[users.length - 1]?.id ?? 0;
    const addedUser: UserOutput = {
      id:lastId + 1,
      name:newUserData.name ?? null,
      phone:newUserData.phone ?? null,
      address:newUserData.address ?? null,
    };
    return [...users, addedUser];
  } catch {
    return [];
  }
}