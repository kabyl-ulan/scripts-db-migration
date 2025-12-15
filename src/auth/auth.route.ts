import { Router } from "express";

import { isNotEmpToken } from "../middleware/authorize";

import { AuthController } from "./auth.controller";

const router = Router();
const ctrl = new AuthController();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Авторизация пользователя
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *               - role
 *             properties:
 *               login:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *     responses:
 *       200:
 *         description: Успешный вход, возвращает токен и данные пользователя
 */
router.post("/login", ctrl.login);

/**
 * @swagger
 * /api/auth/check:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Проверка токена
 *     description: Проверяет валидность токена и возвращает состояние авторизации пользователя
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Токен действителен
 */
router.post("/check", ctrl.checkToken);

/**
 * @swagger
 * /api/auth/info:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Получить информацию об авторизованном пользователе
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Успешный ответ — данные пользователя
 */
router.get("/info", isNotEmpToken, ctrl.authInfo);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Выход из системы
 *     description: Завершает сессию пользователя и делает токен недействительным.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Успешный выход
 */
router.post("/logout", ctrl.logout);

export default router;
