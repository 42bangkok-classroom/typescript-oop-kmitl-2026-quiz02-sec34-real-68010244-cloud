import { getPostalAddress } from "../p01";
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
type UserOutput = {
  id:number;
  name:string | null;
  phone:string | null;
  address:newUser["address"] | null;
};

export async function addUser(newUserData:newUser|null):Promise<UserOutput[]> {
  try {
    const us = await getPostalAddress();
    if (!newUserData) {
      return us;
    }
    const lastId = us[us.length - 1]?.id ?? 0;
    const addedUser: UserOutput = {
      id:lastId + 1,
      name:newUserData.name ?? null,
      phone:newUserData.phone ?? null,
      address:newUserData.address ?? null,
    };
    return [...us, addedUser];
  } catch {
    return [];
  }
}