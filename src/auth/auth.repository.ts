import { dbQuery } from "../config/db";
import { IRoleTypeNumber } from "../config/roles";

import { IAuthInfo, IAuthState } from "./types";

export class AuthRepository {
  async findUserByPinPasswordAuth(data: {
    login: string;
    hashPassword: string;
    id_role: IRoleTypeNumber;
  }) {
    const sql = `SELECT * FROM fn_auth($1, $2, $3);`;
    const values = [data.login, data.hashPassword, data.id_role];
    const { rows, rowCount } = await dbQuery(sql, values);
    if (rowCount) {
      return rows[0] as IAuthState;
    }
    return null;
  }

  async findUserAuthInfo(data: IAuthState) {
    const sql = `SELECT * FROM fn_auth_info($1, $2);`;
    const values = [data.id, data.role];
    const { rows, rowCount } = await dbQuery(sql, values);
    if (rowCount) {
      return rows[0] as IAuthInfo;
    }
    return null;
  }
}
