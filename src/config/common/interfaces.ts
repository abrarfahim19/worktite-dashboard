import {Sender} from "@/app/message/page";

export interface IMAGE {
    id: number;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    image: string;
    created_by: number;
}

export interface UserDetails {
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    vat: string | null;
    bill_email: string | null;
    mail_address: string | null;
    gender: number;
    profile_picture: string | null;
    full_name: string | null;
}

export interface Chat {
    id: number;
    sender: Sender;
}