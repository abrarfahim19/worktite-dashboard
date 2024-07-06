export interface IMAGE {
  id: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  image: string;
  created_by: number;
}

export interface ISender {
  id: number;
  email: string;
  username: string | null;
  details: IUserDetails;
}

export interface IUserDetails {
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

export interface IUser {
  id: number | string;
  email: string;
  user_details: IUserDetails;
}

export interface IChat {
  id: number;
  sender: ISender;
  receiver: ISender;
  created_at: string;
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

export interface IClientStatus {
  id: number | string;
  title: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICategory {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  created_by: number;
  images: any;
}

export interface IProjectData {
  id: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  is_active: boolean;
  started_at: string;
  ended_at: string;
  status: string;
  title: string;
  description: string;
  pricing_type: string;
  price: string;
  category: number;
  client: number;
  image: IMAGE;
  durations: number;
}

interface ISlot {
  id: number;
  created_at: string;
  updated_at: string;
  start_at: string;
  end_at: string;
  created_by: number;
}

export interface IMeetingData {
  id: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  meeting_obj_notes: string;
  meeting_complete_notes: string;
  meeting_link: string | null;
  meeting_date_at: string;
  created_by: number;
  slot: ISlot;
  project: number;
  client: number;
}
