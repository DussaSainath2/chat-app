export class User {
  id?: string;
  name!: string;         // ✅ Add this
  email!: string;
  age!:number;
  gender!:string;
  phone!: string;
  password!: string;
  profilePictureUrl?: string;
  online?: boolean;
  friendIds?: string[];
  country!:string;
  friendRequests?: string[];
}
