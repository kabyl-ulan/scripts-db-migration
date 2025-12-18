import { Router } from "express";

import { MigrationController } from "./migration.controller";

const router = Router();
const ctrl = new MigrationController();

/**
 * @swagger
 * /api/migration/databases:
 *   get:
 *     tags:
 *       - Migration
 *     summary: Получить список доступных баз данных
 *     description: Возвращает список всех настроенных серверов и их баз данных
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список баз данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "master"
 *                       host:
 *                         type: string
 *                         example: "localhost"
 *                       databases:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["edu"]
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["master", "production"]
 */
router.get("/databases", ctrl.getDatabases);

/**
 * @swagger
 * /api/migration/tables:
 *   get:
 *     tags:
 *       - Migration
 *     summary: Получить список таблиц из базы данных
 *     description: Возвращает список всех таблиц в указанной базе данных с количеством строк
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: server
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: "master"
 *         description: ID сервера
 *       - name: database
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: "edu"
 *         description: Название базы данных
 *     responses:
 *       200:
 *         description: Список таблиц
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       table_name:
 *                         type: string
 *                         example: "users"
 *                       row_count:
 *                         type: number
 *                         example: 150
 *       400:
 *         description: Отсутствуют обязательные параметры
 */
router.get("/tables", ctrl.getTables);

/**
 * @swagger
 * /api/migration/functions:
 *   get:
 *     tags:
 *       - Migration
 *     summary: Получить список функций из базы данных
 *     description: Возвращает список всех функций в указанной базе данных
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: server
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: "master"
 *         description: ID сервера
 *       - name: database
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: "edu"
 *         description: Название базы данных
 *     responses:
 *       200:
 *         description: Список функций
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       function_name:
 *                         type: string
 *                         example: "update_timestamp"
 *                       return_type:
 *                         type: string
 *                         example: "trigger"
 *       400:
 *         description: Отсутствуют обязательные параметры
 */
router.get("/functions", ctrl.getFunctions);

/**
 * @swagger
 * /api/migration/generate:
 *   post:
 *     tags:
 *       - Migration
 *     summary: Сгенерировать миграцию из выбранных таблиц и функций
 *     description: Создает новый файл миграции с определениями выбранных таблиц и функций
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - server
 *               - database
 *             properties:
 *               server:
 *                 type: string
 *                 example: "master"
 *                 description: ID сервера
 *               database:
 *                 type: string
 *                 example: "edu"
 *                 description: Название базы данных
 *               tables:
 *                 oneOf:
 *                   - type: array
 *                     items:
 *                       type: string
 *                   - type: string
 *                     enum: [all]
 *                 example: ["users", "roles"]
 *                 description: 'Список таблиц для миграции или "all" для всех таблиц'
 *               functions:
 *                 oneOf:
 *                   - type: array
 *                     items:
 *                       type: string
 *                   - type: string
 *                     enum: [all]
 *                 example: ["update_timestamp", "calculate_total"]
 *                 description: 'Список функций для миграции или "all" для всех функций'
 *               description:
 *                 type: string
 *                 example: "add user tables"
 *                 description: Описание миграции
 *     responses:
 *       200:
 *         description: Миграция успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     filename:
 *                       type: string
 *                       example: "V002__add_user_tables.sql"
 *                     path:
 *                       type: string
 *                       example: "/path/to/migrations/V002__add_user_tables.sql"
 *                     version:
 *                       type: number
 *                       example: 2
 *                     sql:
 *                       type: string
 *                       description: Содержимое миграции
 *       400:
 *         description: Отсутствуют обязательные параметры или не выбраны элементы
 */
router.post("/generate", ctrl.generateMigration);

export default router;
