export interface CompanyRegistration {
  e_mail: string;
  password: string;
  name: string;
  address: string;
  contact_number: string;
  nit: string;
}

export interface CompanyResponse {
  name: string;
  address: string;
  contact_number: string;
  nit: string;
}

export interface CompanyResponseAdmin {

  _id: string;
  name: string;
  nit: string;
}

export interface CompanyResponseAdmin2 {

  _id: string;
  name: string;
  nit: string;
  contact_number: string;
  address: string;
  active: boolean;
}
