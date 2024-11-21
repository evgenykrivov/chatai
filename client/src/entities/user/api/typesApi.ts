export enum ERole {
  ADMIN = "ADMIN",
  MODER = "MODER",
  USER = "USER",
}

export interface ILoginRequestApi {
  email: string
  password: string
}

export interface ILoginResponseApi {
  access_token: string
}

export interface IRegisterRequestApi {
  email: string
  password: string
  role: ERole
}

export interface IRegisterResponseApi {
  access_token: string
}
export interface IRefreshResponseApi {
  access_token: string
}
