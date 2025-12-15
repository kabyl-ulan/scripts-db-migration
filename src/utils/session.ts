import { Request, Response } from "express";

import { dbQuery } from "../config/db";
import { ENV } from "../config/env";

import { md5 } from "./crypto";

const COOKIE_NAME = ENV.COOKIE_NAME;
const COOKIE_MOBILE = "isMobile";

export async function Delete(res: Response, token: string) {
  const cookieId = md5(token);
  res.clearCookie(COOKIE_NAME);
  const sql = `UPDATE "Session" SET offline=true WHERE offline=false AND login IN (SELECT login FROM "Session" WHERE cookie=$1)`;
  const { command } = await dbQuery(sql, [cookieId]);
  return command === "UPDATE";
}

export async function GetUser(token: string) {
  const sql = `SELECT * FROM "fn_Session_Get_User"($1);`;
  const { rowCount, rows } = await dbQuery(sql, [md5(token)]);
  if (rowCount) {
    const user = { ...rows[0] };
    return user;
  } else false;
}

export async function Check(token: string, role: number) {
  const user = await GetUser(token);
  if (user && user.role === role) return true;
  return false;
}

export async function Login(
  req: Request,
  res: Response,
  role: number,
  login: string,
  id: number,
  token: string
) {
  const isMobile = String(req.cookies[COOKIE_MOBILE]) == "true" ? true : false;
  const cookieId = md5(token);
  res.cookie(COOKIE_NAME, cookieId, { maxAge: 60000000 });
  const ip = req.headers["x-forwarded-for"]
    ? String(req.headers["x-forwarded-for"]).split(",").shift()
    : req.ip;

  const sql = `SELECT EXISTS(SELECT 1 FROM "Session" WHERE login = $1);`;
  const { rows } = await dbQuery(sql, [login]);
  const isExists = rows[0]?.exists as boolean;

  if (isExists) {
    const sql = `UPDATE "Session" SET offline=false, last_action=current_timestamp, cookie=$2, id_role=$3, id_user=$4, is_mobile=$5 WHERE login=$1;`;
    const values = [login, cookieId, role, id, isMobile];
    const { command } = await dbQuery(sql, values);

    if (command === "UPDATE") {
      return await LoginLog(login, role, id, isMobile, ip);
    }
    return false;
  } else {
    const sql = `INSERT INTO "Session" (cookie, id_role, login, id_user, last_action, is_mobile) VALUES ($1, $2, $3, $4, current_timestamp, $5);`;
    const values = [cookieId, role, login, id, isMobile];
    const { command } = await dbQuery(sql, values);

    if (command === "INSERT") {
      return await LoginLog(login, role, id, isMobile, ip);
    }
    return false;
  }
}

export async function LoginLog(
  login: string,
  role: number,
  id: number,
  isMobile: boolean,
  ip?: string
) {
  const sql = `INSERT INTO "Session_log" (login, id_role, id_user, log_time, is_mobile, ip) VALUES ($1, $2, $3, current_timestamp, $4, $5);`;
  const values = [login, role, id, isMobile, ip];
  const { command } = await dbQuery(sql, values);
  return command === "INSERT";
}
