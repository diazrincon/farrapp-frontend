export class ClientRegistration {
  name: string;
  lastname: string;
  birthdate: string;
  gender: string;
  e_mail: string;
  password: string;
}

export interface ClientLogin {
  e_mail: string;
  password: string;
}

export interface ClientResponse {

  name: string;
  lastname: string;
  birthdate: string;
  gender: string;

}

export interface ClientResponseAdmin {
  _id: string;
  name: string;
  lastname: string;
  birthdate: string;
  gender: string;
  e_mail: string;

}
