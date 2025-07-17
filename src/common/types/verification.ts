export enum VerificationTypes {
    RESET_PASSWORD,
    REGISTER,
    RESET_PHONE
}


export interface ICheckOtp {
  type: VerificationTypes;
  phone: string;
  otp: string;
}
