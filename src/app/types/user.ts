export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}