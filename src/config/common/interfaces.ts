export interface IMAGE {
  id: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  image: string;
  created_by: number;
}

export interface Sender {
  id: number;
  email: string;
  username: string | null;
  details: UserDetails;
}

export interface UserDetails {
  name: string | null;
  contact_name: string | null;
  company_name: string | null;
  phone: string | null;
  vat: string | null;
  bill_email: string | null;
  mail_address: string | null;
  gender: number;
  profile_picture: string | null;
  full_name: string | null;
}

export interface User {
  id: number | string;
  email: string;
  user_details: UserDetails;
}

export interface Chat {
  id: number;
  sender: Sender;
}

export interface IFiles {
  id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  file: string;
  created_by: number;
}

export interface IInvoice {
  id: number;
  created_at: string;
  updated_at: string;
  file_type: number;
  is_receive: boolean;
  created_by: number;
  project: number;
  file: IFiles | null;
}
