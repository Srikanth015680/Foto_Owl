export type Gender = "Male" | "Female" | "Other";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  gender: Gender;
  mobileNumber: string;
  address: string;
  city: string;
}

export type PublicUser = Omit<User, "password">;

export interface RegisterFormValues {
  fullName: string;
  email: string;
  gender: Gender | null;
  mobileNumber: string;
  address: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ProfileFormValues {
  fullName: string;
  mobileNumber: string;
  gender: Gender;
  address: string;
  city: string;
}

export interface PicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export type FilterOption = "all" | "a-m" | "n-z";

export interface FormErrors {
  [field: string]: string | undefined;
}