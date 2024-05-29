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

export interface IUploadedProject {
  id: number;
  project_type: string;
  design_type: string;
  pricing_type: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  price: string;
  duration: number;
  quantity: number;
  extra_fields: Record<string, string>;
  active: boolean;
  created_by: number;
  category: number;
  images: IMAGE[];
  file: any[];
  three_d_file: any[];
}

export interface ITimeSlot {
  id: number;
  disabled: boolean;
  created_at: string;
  updated_at: string;
  start_at: string;
  end_at: string;
  created_by: number;
}
