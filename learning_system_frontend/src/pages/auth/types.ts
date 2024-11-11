export interface enteredCredentials_login_inter {
  email: string;
  password: string;
}

export interface enteredCredentials_signup_inter
  extends enteredCredentials_login_inter {
  name: string;
  dob: string;
  confirmPassword: string;
}
