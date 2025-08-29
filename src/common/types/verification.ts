export enum VerificationTypes {
    RESET_PASSWORD = 'RESET_PASSWORD',
    REGISTER = 'REGISTER',
    RESET_EMAIL = 'RESET_EMAIL'
}


export interface ICheckOtp {
  type: VerificationTypes;
  email: string;
  otp: string;
}
