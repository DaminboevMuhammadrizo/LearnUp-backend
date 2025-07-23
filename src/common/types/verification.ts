export enum VerificationTypes {
    RESET_PASSWORD = 'RESET_PASSWORD',
    REGISTER = 'REGISTER',
    RESET_PHONE = 'RESET_PHONE'
}


export interface ICheckOtp {
  type: VerificationTypes;
  phone: string;
  otp: string;
}
