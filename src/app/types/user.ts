export interface UserLogin {
  username: string;
  email: string;
  password: string;
  token: string;
}

export interface UserRegister {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  imageURL: string;
  created: string;
  modified: string;
}