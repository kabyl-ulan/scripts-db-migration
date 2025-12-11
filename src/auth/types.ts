import { IRoleTypeNumber } from "../config/roles";

export interface IUserLoginParams {
  login: string;
  password: string;
  role: IRoleTypeNumber;
}

export interface IAuthState {
  id: number;
  role: IRoleTypeNumber;
}

export interface IAuthInfo {
  id: number;
  id_role: IRoleTypeNumber;
  role_ru: string;
  role_en: string;
  name: string;
  id_university: number;
  file_name: string | null;
}
