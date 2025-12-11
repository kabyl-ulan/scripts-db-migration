var app;(()=>{"use strict";var __webpack_modules__={89:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const auth_route_1=__importDefault(__webpack_require__(792));exports.default=auth_route_1.default},218:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(req,res,_next){if("/"===req.originalUrl)return res.redirect("/edugate");const publicDir=function(startDir){let currentDir=startDir;for(;;){const potentialDir=path_1.default.join(currentDir,"public");if(fs_1.default.existsSync(potentialDir)&&fs_1.default.statSync(potentialDir).isDirectory())return potentialDir;const parentDir=path_1.default.dirname(currentDir);if(parentDir===currentDir)break;currentDir=parentDir}return null}(__dirname);if(!publicDir)return res.status(404).send("Public directory not found");return res.sendFile(path_1.default.join(publicDir,"index.html"))};const fs_1=__importDefault(__webpack_require__(9896)),path_1=__importDefault(__webpack_require__(6928))},236:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.directionUpdateSchema=exports.directionCreateSchema=void 0;const zod_1=__webpack_require__(1569);exports.directionCreateSchema=zod_1.z.object({id_faculty:zod_1.z.number().int().positive(),direction_cipher:zod_1.z.string().min(1).max(50),direction:zod_1.z.string().min(1).max(400),direction_en:zod_1.z.string().min(1).max(400)}),exports.directionUpdateSchema=zod_1.z.object({direction_cipher:zod_1.z.string().min(1).max(50),direction:zod_1.z.string().min(1).max(400),direction_en:zod_1.z.string().min(1).max(400)})},288:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateSpecialtySchema=exports.createSpecialtySchema=void 0;const zod_1=__webpack_require__(1569);exports.createSpecialtySchema=zod_1.z.object({id_direction:zod_1.z.number().int().positive(),specialty_cipher:zod_1.z.string().min(1).max(50),specialty:zod_1.z.string().min(1).max(255),specialty_en:zod_1.z.string().min(1).max(255),id_learning:zod_1.z.number().int().positive(),id_education_language:zod_1.z.number().int().positive(),id_profession:zod_1.z.number().int().positive()}),exports.updateSpecialtySchema=zod_1.z.object({specialty_cipher:zod_1.z.string().min(1).max(50),specialty:zod_1.z.string().min(1).max(255),specialty_en:zod_1.z.string().min(1).max(255),id_learning:zod_1.z.number().int().positive(),id_education_language:zod_1.z.number().int().positive(),id_profession:zod_1.z.number().int().positive()})},335:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlanRepository=void 0;const db_1=__webpack_require__(6067);exports.PlanRepository=class{async findBySpecialtyAndBkAndYearAndWs(id_specialty,id_bk,id_years,id_ws){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_plan($1,$2,$3,$4);",[id_specialty,id_bk,id_years,id_ws])}async findPlanGrid(id_users,id_role,language,id_direction=0,id_year=0,id_ws=1){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_plan_grid($1, $2, $3, $4, $5, $6);",[id_users,id_role,language,id_direction,id_year,id_ws])}async managePlan(id_users,iud,id_plan,id_specialty,id_bk,kol_plan,smeta_doc,smeta_education,comments,comments_en,individual,id_control_type,smeta_near_abroad,smeta_far_abroad,id_year,id_ws){return await(0,db_1.dbQuery)("CALL p_vuz_plan_grid_iud($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);",[id_users,iud,id_plan,id_specialty,id_bk,kol_plan,smeta_doc,smeta_education,comments,comments_en,individual,id_control_type,smeta_near_abroad,smeta_far_abroad,id_year,id_ws,""])}}},376:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.usersUpdateSchema=exports.usersCreateSchema=void 0;const zod_1=__webpack_require__(1569),regex_1=__webpack_require__(3807);exports.usersCreateSchema=zod_1.z.object({id_university:zod_1.z.number().int(),users_fio:zod_1.z.string().min(1).transform(s=>s.trim()),pin:zod_1.z.number().int().nullish(),logins:zod_1.z.string().min(3).max(100).transform(s=>s.trim()),passwords:zod_1.z.string().min(1),telefon:zod_1.z.string().nullish(),email:zod_1.z.string().nullish().transform(v=>""===v?null:v).refine(v=>null==v||(0===v.length||regex_1.EMAIL_FORMAT_REGEX.test(v)))}),exports.usersUpdateSchema=zod_1.z.object({id_users:zod_1.z.number().int().positive(),id_university:zod_1.z.number().int(),users_fio:zod_1.z.string().min(1).transform(s=>s.trim()),pin:zod_1.z.number().int().nullish(),logins:zod_1.z.string().min(3).max(100).transform(s=>s.trim()),old_passwords:zod_1.z.string().min(1),new_passwords:zod_1.z.string().nullish().transform(v=>void 0===v?null:v??null),telefon:zod_1.z.string().nullish(),email:zod_1.z.string().nullish().transform(v=>""===v?null:v).refine(v=>null==v||(0===v.length||regex_1.EMAIL_FORMAT_REGEX.test(v)))})},465:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.refreshMv=function(){node_cron_1.default.schedule("0 1 * * *",async()=>{console.log("CRON: Refresh materialized view started...");try{await(0,db_1.dbQuery)("REFRESH MATERIALIZED VIEW CONCURRENTLY mv_university_specialties"),console.log("CRON: Refresh completed successfully.")}catch(err){console.error("CRON ERROR refreshing MV:",err)}},{timezone:"Asia/Bishkek"})};const node_cron_1=__importDefault(__webpack_require__(2703)),db_1=__webpack_require__(6067)},545:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const monitoring_route_1=__importDefault(__webpack_require__(8740));exports.default=monitoring_route_1.default},556:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.changeEmailSchema=exports.changePasswordSchema=void 0;const zod_1=__webpack_require__(1569),regex_1=__webpack_require__(3807);exports.changePasswordSchema=zod_1.z.object({old_password:zod_1.z.string().min(1),new_password:zod_1.z.string().min(6)}),exports.changeEmailSchema=zod_1.z.object({email:zod_1.z.string({required_error:"email_required",invalid_type_error:"email_invalid"}).regex(regex_1.EMAIL_FORMAT_REGEX,{message:"email_invalid"}),code:zod_1.z.string({required_error:"code_required",invalid_type_error:"code_invalid"}).regex(regex_1.CODE_FORMAT_REGEX,{message:"code_length"})})},567:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.UsersController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),users_schema_1=__webpack_require__(376),service=new(__webpack_require__(5152).UsersService);exports.UsersController=class{constructor(){this.usersList=async(req,res,next)=>{try{const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getAllUsers(id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.createUsers=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(users_schema_1.usersCreateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"INSERT"===await service.createUsers(id_users,data)?(0,response_1.sendSuccess)(res,req.t("successAdd")):(0,response_1.sendError)(res,req.t("errorAdd"))}catch(error){return next(error)}},this.updateUsers=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(users_schema_1.usersUpdateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"UPDATE"===await service.updateUsers(id_users,data)?(0,response_1.sendSuccess)(res,req.t("successUpdate")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}},this.deleteUsers=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_users_del=(0,helpers_1.toNumber)(req.params?.id_users);if(!id_users_del)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"DELETE"===await service.deleteUsers(id_users,id_users_del)?(0,response_1.sendSuccess)(res,req.t("successDelete")):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){return next(error)}}}}},572:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.CommissionController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),commission_schema_1=__webpack_require__(2931),commission_service_1=__webpack_require__(2761);exports.CommissionController=class{constructor(){this.service=new commission_service_1.CommissionService,this.getCommissionMembers=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const language=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getCommissionMembers(id_users,language);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ error CommissionController getCommissionMembers: ",error.message),next(error)}},this.createCommission=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(commission_schema_1.commissionCreateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"INSERT"===await this.service.createCommission(id_users,data)?(0,response_1.sendSuccess)(res,req.t("successAdd")):(0,response_1.sendError)(res,req.t("errorCreate"))}catch(error){return next(error)}},this.updateCommission=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_commission=(0,helpers_1.toNumber)(req.params.id_commission);if(!id_commission)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(commission_schema_1.commissionUpdateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"UPDATE"===await this.service.updateCommission(id_users,id_commission,data)?(0,response_1.sendSuccess)(res,req.t("successUpdate")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}},this.deleteCommission=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_commission=(0,helpers_1.toNumber)(req.params.id_commission);if(!id_commission)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"DELETE"===await this.service.deleteCommission(id_users,id_commission)?(0,response_1.sendSuccess)(res,req.t("successDelete")):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){return next(error)}}}}},689:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.readinessHandler=void 0;const db_1=__importDefault(__webpack_require__(6067)),env_1=__webpack_require__(6138),cache_1=__webpack_require__(9982);exports.readinessHandler=async(_req,res)=>{const startTime=Date.now(),memoryUsage=process.memoryUsage();let dbStatus="disconnected",dbResponseTime=0;try{const dbStart=Date.now();await db_1.default.query("SELECT 1"),dbResponseTime=Date.now()-dbStart,dbStatus="connected"}catch(err){return dbStatus="error",void res.status(503).json({status:"not ready",error:"database unavailable"})}let cacheStatus="disabled",cacheResponseTime=0;const redisClient=(0,cache_1.getRedisClient)();if(redisClient)try{const cacheStart=Date.now();await redisClient.ping(),cacheResponseTime=Date.now()-cacheStart,cacheStatus="connected"}catch(err){cacheStatus="error"}const responseTime=Date.now()-startTime;res.json({status:"ready",timestamp:(new Date).toISOString(),uptime:Math.floor(process.uptime()),responseTime:`${responseTime}ms`,memory:{rss:`${Math.round(memoryUsage.rss/1024/1024)}MB`,heapUsed:`${Math.round(memoryUsage.heapUsed/1024/1024)}MB`,heapTotal:`${Math.round(memoryUsage.heapTotal/1024/1024)}MB`},version:{node:process.version,app:"1.0.0"},environment:env_1.ENV.NODE_ENV,pid:process.pid,services:{database:{status:dbStatus,responseTime:`${dbResponseTime}ms`},cache:{status:cacheStatus,responseTime:cacheResponseTime>0?`${cacheResponseTime}ms`:null}}})}},792:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),rateLimiter_1=__webpack_require__(7773),auth_controller_1=__webpack_require__(3501),router=(0,express_1.Router)(),ctrl=new auth_controller_1.AuthController;
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Регистрация абитуриента
 *     description: Регистрирует нового пользователя (абитуриента). Поддерживает загрузку фото и проверку капчи.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surname
 *               - names
 *               - birth_date
 *               - id_gender
 *               - passport
 *               - passport_date
 *               - id_country
 *               - telephone
 *               - email
 *               - code
 *               - consent
 *             properties:
 *               surname:
 *                 type: string
 *                 example: "Иванов"
 *               names:
 *                 type: string
 *                 example: "Иван"
 *               patronymic:
 *                 type: string
 *                 example: "Иванович"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-15"
 *               id_gender:
 *                 type: number
 *                 example: 1
 *               passport:
 *                 type: string
 *                 example: "ID1234567"
 *               passport_date:
 *                 type: string
 *                 format: date
 *                 example: "2020-05-10"
 *               id_country:
 *                 type: number
 *                 example: 417
 *               telephone:
 *                 type: string
 *                 example: "+996700123456"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               code:
 *                 type: string
 *                 example: "123456"
 *               consent:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Регистрация успешна
 *       400:
 *         description: Ошибка валидации данных или капчи
 *       409:
 *         description: Пользователь уже зарегистрирован
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post("/register",rateLimiter_1.authLimiter,ctrl.register),
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Авторизация пользователя
 *     description: Вход по логину, паролю и роли (2, 3 или 5)
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
 *               role:
 *                 type: integer
 *                 enum: [2, 3, 5]
 *                 example: 5
 *     responses:
 *       200:
 *         description: Успешный вход, возвращает токен и данные пользователя
 */
router.post("/login",ctrl.login),
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
router.post("/check",ctrl.checkToken),
/**
 * @swagger
 * /api/auth/info:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Получить информацию об авторизованном пользователе
 *     description: Возвращает основную информацию о текущем пользователе (id, role, name, id_university, file_name).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Успешный ответ — данные пользователя
 */
router.get("/info",authorize_1.isNotEmpToken,ctrl.authInfo),
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
router.post("/logout",ctrl.logout),exports.default=router},818:module=>{module.exports=require("dotenv")},829:module=>{module.exports=require("jsonwebtoken")},865:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.UniversityController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),my_service_1=__webpack_require__(8643),university_schema_1=__webpack_require__(3346),university_service_1=__webpack_require__(6102);exports.UniversityController=class{constructor(){this.service=new university_service_1.UniversityService,this.myUniversityService=new my_service_1.MyUniversityService,this.universityList=async(req,res)=>{try{const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAllUniversity(id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ error UniversityController universityList: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"))}},this.universitySelectorList=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),id_year=(0,helpers_1.toNumber)(req.query.id_year)||0,id_ws=(0,helpers_1.toNumber)(req.query.id_ws)||0,result=await this.service.getUniversitiesForMinistrySelector({id_users,id_lang,id_year,id_ws});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ error UniversityController universitySelectorList: ",error.message),next(error)}},this.levelEducationSelectorList=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getLevelEducationSelector(id_users,id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.createUniversity=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(university_schema_1.createUniversitySchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await this.service.createUniversity(id_users,data);return"INSERT"===result?(0,response_1.sendSuccess)(res,req.t("successAdd")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("university.duplicate"),!1,409):"Отказ"===result?(0,response_1.sendError)(res,req.t("token.permission"),!1,403):(0,response_1.sendError)(res,req.t("errorAdd"))}catch(error){return next(error)}},this.updateUniversity=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_university=(0,helpers_1.toNumber)(req.params?.id_university);if(!id_university)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(university_schema_1.updateUniversitySchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await this.service.updateUniversity(id_users,id_university,data);return"UPDATE"===result?(0,response_1.sendSuccess)(res,req.t("successUpdate")):"Отказ"===result?(0,response_1.sendError)(res,req.t("token.permission"),!1,403):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}},this.uncheckedCount=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getUncheckedCount(id_users,id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),{kol:result})}catch(error){return next(error)}},this.getApplicantsReport=async(req,res,next)=>{try{const id_users=req.user?.id,id_role=req.user?.role;if(!id_users||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const language=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),id_year=(0,helpers_1.toNumber)(req.query.id_year)??0,id_ws=(0,helpers_1.toNumber)(req.query.id_ws)??0,id_university=(await this.myUniversityService.getMyUniversity(id_users)).id_university,result=await this.service.getApplicantsReport(id_users,id_role,language,id_university,id_year,id_ws);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}}}}},963:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NotificationRepository=void 0;const db_1=__webpack_require__(6067);exports.NotificationRepository=class{async findAbiturientNotifications(id_lang,id_abiturient){return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_notification($1, $2);",[id_lang,id_abiturient])}async findUniversityNotifications(id_users){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_notification_grid($1);",[id_users])}async notificationIUD(id_users,data){const values=[data.iud,id_users,data.id_notification,data.id_learning,data.id_education_language,data.id_faculty,data.title_ru,data.title_en,data.notification_ru,data.notification_en,null,null];return await(0,db_1.dbQuery)("CALL p_vuz_notification_iud($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",values)}}},970:module=>{module.exports=JSON.parse('{"success":"Успешно","inValidFormat":"Неверный формат данных","hasRelations":"Невозможно удалить: есть связанные данные","error":{"unknown":"Произошла неизвестная ошибка","internal_server":"Внутренняя ошибка сервера","dbConnection":"Ошибка подключения к базе данных","validation":"Некорректные данные","notFound":"Запрашиваемый ресурс не найден","tooManyRequests":"Слишком много запросов. Пожалуйста, повторите попытку позже","tooManyLoginAttempts":"Слишком много попыток входа. Пожалуйста, повторите попытку через 15 минут","tooManyUploads":"Слишком много загрузок файлов. Пожалуйста, повторите попытку позже"},"token":{"token_required":"Токен не предоставлен","permission":"Доступ запрещен","invalid":"Токен недействителен","notFound":"Токен не найден","expired":"Срок действия токена истек","generateError":"Ошибка генерации токена","invalid_token":"Неверный токен","permission_denied":"Нет прав для доступа к ресурсу","unknown_error":"Произошла неизвестная ошибка при проверке токена"},"auth":{"Required":"Введите логин и пароль","login_required":"Пожалуйста, введите логин","password_required":"Пожалуйста, введите пароль","role_required":"Пожалуйста, выберите роль, под которой вы хотите войти в систему","role_invalid":"Неверная роль, не допустимые значения","invalid_credentials":"Неправильный логин или пароль","loginFailed":"Не удалось выполнить вход"},"logout":{"success":"Вы успешно вышли из системы","failed":"Не удалось выйти из системы"},"register":{"Required":"Пожалуйста, заполните необходимые поля","consent_required":"Необходимо подтвердить согласие с условиями пользовательского соглашения","consent_invalid":"Некорректное значение согласия","token_required":"Требуется проверка reCAPTCHA","token_invalid":"Неверный токен reCAPTCHA","token_captcha_invalid":"Проверка reCAPTCHA не пройдена. Попробуйте еще раз","surname_required":"Пожалуйста, введите фамилию","names_required":"Пожалуйста, введите имя","patronymic_invalid":"Неверный формат отчества","birth_date_required":"Пожалуйста, введите дату рождения","birth_date_invalid":"Неверный формат даты рождения","birth_date_format":"Дата рождения должна быть в формате ГГГГ-MM-ДД","id_gender_required":"Пожалуйста, выберите пол","id_gender_invalid":"Неверный формат пола","passport_required":"Пожалуйста, введите номер паспорта","passport_invalid":"Неверный формат паспорта","passport_date_required":"Пожалуйста, введите дату выдачи паспорта","passport_date_invalid":"Неверный формат даты выдачи паспорта","passport_date_format":"Дата выдачи паспорта должна быть в формате ГГГГ-MM-ДД","id_country_required":"Пожалуйста, укажите страну","id_country_invalid":"Неверный формат страны","email_required":"Пожалуйста, введите email","email_invalid":"Неверный формат email","code_required":"Пожалуйста, введите код подтверждения","code_invalid":"Неверный формат кода","code_length":"Код должен состоять из 6 цифр","password_required":"Пожалуйста, введите пароль","password_invalid":"Неверный формат пароля","password_minLength":"Пароль должен быть не менее 6 символов","password_maxLength":"Пароль слишком длинный","repeat_password_required":"Пожалуйста, введите пароль повторный пароль","repeat_password_invalid":"Неверный формат повторного пароля","repeat_password_minLength":"Повторный пароль должен быть не менее 6 символов","repeat_password_maxLength":"Повторный пароль слишком длинный","telephone_required":"Пожалуйста, введите номер телефона","telephone_invalid":"Неверный формат телефона","photo_invalid":"Файл должен быть изображением","already_registered":"Вы уже были зарегистрированы","passport_duplicate":"Пользователь с таким паспортом уже зарегистрирован","email_duplicate":"Пользователь с таким email уже зарегистрирован","save_error":"Не удалось сохранить данные","unknown_error":"Неизвестная ошибка","success":"Вы успешно зарегистрированы","password_sent":"Пароль отправлен на вашу почту"},"email":{"Required":"Пожалуйста, заполните необходимые поля","email_required":"Пожалуйста, введите электронную почту","email_invalid":"Неверный формат электронной почты","isExistEmailCode":"На этот адрес уже отправлен код подтверждения","success_send":"Код подтверждения успешно отправлен","error_send":"Ошибка при отправке кода, попробуйте еще раз","error":"Произошла ошибка при обработке запроса","already_exist":"Пользователь с таким email уже существует"},"password":{"change":{"success":"Пароль успешно изменён","wrongOld":"Неверный текущий пароль","failed":"Не удалось изменить пароль. Попробуйте позже"}},"application":{"success":"Заявка успешно подана","alreadyRegistered":"Вы уже подали заявку","canceled":"Заявка успешно отменена","invalidFormat":"Неверный формат данных","unknownError":"Произошла неизвестная ошибка"},"settings":{"notFound":"Настройки системы не найдены или не сконфигурированы"},"plan":{"notFound":"План приема не найден для выбранной специальности"},"specialty":{"notDelete":"Не возможно удалить, есть абитуриенты"},"admissionPlan":{"exceeded":"Невозвожно добавить или изменить план, так как он превышает общий"},"notDelete":"Невозможно удалить, есть запись","notFound":"Данные не найдены","invalidEmailCode":"Неверный код. Пожалуйста, запросите код на электронную почту","errorSendEmail":"Ошибка отправки по электронной почте!","noValidEmail":"Неверный адрес электронной почты!","errorGenerateCode":"Ошибка при генерации кода!","errorVerifyCaptcha":"Вы не прошли проверку по captcha!","errorExistRecover":"Ссылка на сброс пароля уже использована!","successSave":"Данные успешно сохранены","errorSave":"Ошибка при сохранении данных","successAdd":"Данные успешно добавлены","errorAdd":"Ошибка при добавлении данных","successUpdate":"Данные успешно изменены","errorUpdate":"Ошибка при изменении данных","errorDelete":"Ошибка при удалении данных","successDelete":"Данные успешно удалены","errorDateValid":"Неправильная дата!","errorGet":"Ошибка при получении данных!","errorEmailUserNotFound":"Пользователь с указанным адресом электронной почты не найден!","errorUserId":"Пользователь не найден!","isTooShort":"Новый пароль короткий. Введите не менее 6 символов!","passDoesNotMatch":"Новые пароли не совпадают!","changePassword":"Пароль успешно изменен!","sendLinkSuccess":"Письмо с инструкциями по сбросу пароля отправлено на электронную почту!","isExistEmailLink":"Ссылка для восстановления уже отправлена!","emailInCorrect":"Введите правильную почту!","pinExistError":"Пользователь с такой ПИН не найден!","yourEmail":"Ваша почта","errorStartYear":"Год начало неправильно!","errorIdEducation":"Выберите уровень образования!","errorIdFormEducation":"Выберите форму обучения!","errorOnlyPdfFile":"Загрузите только PDF файл!","errorFileAdd":"Ошибка при сохранении файла!","errorExistFile":"Файл не найден!","errorMaxFilesExceeded":"Максимальное количество загружаемых файлов: {{maxFiles}}!","errorDataPassportInCorrect":"Введите паспортные данные правильно!","errorExistSeries":"Данная серия паспорта не найдена!","errorPinInCorrect":"Введите ПИН правильно!","existUserLang":"У вас выбран этот язык!","existUserKeySkill":"У вас выбран этот навык!","errorYear":"Введите правильный год!","errorSelectOrg":"Напишите организацию!","existUserMilitary":"У вас уже есть военный учет!","olympiad":{"nameInCorrect":"Введите правильно имя!","surnameInCorrect":"Введите правильно фамилию!","patronymicInCorrect":"Введите правильно отчество!"},"emplyee":{"nameInCorrect":"Введите правильно имя!","surnameInCorrect":"Введите правильно фамилию!","patronymicInCorrect":"Введите правильно отчество!"},"upload_xml":"Загрузите XML-файл!","uploadCurrectXml":"Загрузите правильный XML-файл!","inValidPin":"Не правильный ПИН!","laptopDuplicate":"Уже получил ноутбук!","updateEmail":{"pinError":"Не правильный ПИН!","userNotFound":"Этот пользователь не найден в системе!","userNotRegister":"Пользователь с таким ПИН еще не зарегистрирован!","surnameCorrect":"Напишите фамилию правильно!","nameCorrect":"Напишите имя правильно!","patronymicCorrect":"Напишите отчество правильно!","patronymicRequired":"Напишите отчество!","birthDayCorrect":"Напишите дата рождения правильно!","emailSame":"Новый email не должен совпадать с текущим!","success":"Ваш email успешно обновлен"},"accessDenied":"Доступ запрещен!","esi":{"invalidRequest":"Для входа в систему недостаточно информации. Заполните информацию и повторите попытку.","authFailedState":"Срок действия запроса истёк или данные недействительны. Попробуйте войти ещё раз.","tokenFailed":"Не удалось получить доступ. Пожалуйста, повторите попытку позже.","userNotFound":"Вы еще не зарегистрированы. Пожалуйста, зарегистрируйтесь в системе \\"Мугалим\\".","tryError":"Произошла ошибка при входе в систему! Попробуйте еще раз!"},"userNotRegister":"Пользователь с таким ПИН еще не зарегистрирован!","existHeadOrganization":"Назначаемый кандидат уже занимает должность руководителя в другой организации!","existHeadOldOrganization":"В организации уже назначен руководитель (в том числе временно или исполняющий обязанности). Пожалуйста, сначала выполните его увольнение!","passport":{"successSave":"Данные успешно сохранены","errorSave":"Ошибка при сохранении данных!","notFoundWithPin":"Паспорт с таким ПИН {{pin}} не найден","notFound":"Паспорт не найден","serviceUnavailable":"Сервис проверки паспорта временно недоступен. Попробуйте позже","unknownError":"Произошла неизвестная ошибка. Попробуйте позже"},"errorSaveFile":"Произошла ошибка при сохранении файла","uploadFile":"Загрузите файл","uploadImage":"Загрузите фото","errorTestDelete":"Невозможно удалить тест — по нему уже есть поданные заявки","tour":{"notAdd":"Такой тур уже существует","notDelete":"Не возможно удалить, есть связь"},"avatar":{"notFound":"Аватар не найден"},"document":{"notFound":"Документ не найден"},"university":{"not_found":"Университет не найден или пользователь не привязан к университету","duplicate":"Университет с таким названием уже существует"},"abiturient":{"duplicate":"Абитуриент с таким паспортом или email уже существует"},"faculty":{"duplicate":"Факультет с таким названием уже существует","errorAdd":"Ошибка при добавлении факультета","errorUpdate":"Ошибка при обновлении факультета","errorDelete":"Ошибка при удалении факультета","operationDenied":"Отказ в операции","cannotDeleteLinked":"Невозможно удалить факультет, есть связанные записи","noResponse":"Нет ответа от базы данных"},"direction":{"not_found":"Направления не найдены","duplicate":"Направление с таким шифром уже существует","errorAdd":"Ошибка при добавлении направления","errorUpdate":"Ошибка при обновлении направления","errorDelete":"Ошибка при удалении направления","operationDenied":"Отказ в операции","cannotDeleteLinked":"Невозможно удалить направление, есть связанные записи"},"country":{"not_found":"Страна не найдена","duplicate":"Страна с таким названием уже существует"},"noFileUploaded":"Файл не загружен","successUpload":"Загрузка прошла успешно","errorUpload":"Ошибка при загрузке","cache":{"key_not_found":"Ключ не найден в кэше","deleted":"Ключ удален из кэша","pattern_deleted":"Ключи удалены по шаблону","flushed":"Весь кэш очищен"}}')},1008:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.isResponsibleToken=exports.isUniversityToken=exports.isNotEmpToken=exports.isAbitToken=exports.isMinistryToken=exports.isAdminToken=void 0,exports.checkToken=checkToken;const jsonwebtoken_1=__webpack_require__(829),env_1=__webpack_require__(6138),jwt_1=__webpack_require__(3481),response_1=__webpack_require__(8369),session_1=__webpack_require__(7372),isDevelopment="development"===env_1.ENV.NODE_ENV,returnMessage=(res,message)=>(0,response_1.sendError)(res,message,!1,401),logTokenDebug=(message,data)=>{isDevelopment&&console.log(message,data)},logAuthError=(message,details)=>{isDevelopment?console.warn(message,details):console.error({level:"warn",type:"auth_error",message,timestamp:(new Date).toISOString(),...details})};exports.isAdminToken=async(req,res,next)=>await checkToken(req,res,next,[1]);exports.isMinistryToken=async(req,res,next)=>await checkToken(req,res,next,[2]);exports.isAbitToken=async(req,res,next)=>await checkToken(req,res,next,[5]);exports.isNotEmpToken=async(req,res,next)=>await checkToken(req,res,next,[1,2,3,4,5,6]);exports.isUniversityToken=async(req,res,next)=>await checkToken(req,res,next,[3,4,6]);async function checkToken(req,res,next,role){try{const authHeader=req.headers.authorization;if(!authHeader?.startsWith("Bearer "))return logAuthError("Missing or invalid Authorization header",{url:req.url,method:req.method,ip:req.ip}),returnMessage(res,req.t("token.token_required"));const token=authHeader.slice(7);if(isDevelopment){const tokenPreview=token.substring(0,20)+"...";logTokenDebug(`🔐 Auth request: ${req.method} ${req.url} [token: ${tokenPreview}]`)}let authState;try{authState=(0,jwt_1.verifyToken)(token),logTokenDebug("✅ Token decoded",{userId:authState.id,role:authState.role})}catch(error){return error instanceof jsonwebtoken_1.TokenExpiredError?(logAuthError("Token expired",{url:req.url,expiredAt:error.expiredAt,ip:req.ip}),returnMessage(res,req.t("token.expired"))):(logAuthError("Invalid token",{url:req.url,error:error.message,ip:req.ip}),returnMessage(res,req.t("token.invalid_token")))}return await(0,session_1.Check)(token,authState.role)?role.includes(authState.role)?(req.user=authState,logTokenDebug(`✅ Authorized: user ${authState.id}, role ${authState.role}`),next()):(logAuthError("Permission denied",{url:req.url,userId:authState.id,requiredRoles:role,userRole:authState.role,ip:req.ip}),returnMessage(res,req.t("token.permission"))):(logAuthError("Session expired or invalid",{url:req.url,userId:authState.id,role:authState.role}),returnMessage(res,req.t("token.expired")))}catch(error){return logAuthError("Unexpected auth error",{url:req.url,error:error.message,stack:isDevelopment?error.stack:void 0}),returnMessage(res,req.t("token.invalid"))}}exports.isResponsibleToken=async(req,res,next)=>await checkToken(req,res,next,[2,3,4,6])},1022:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),users_controller_1=__webpack_require__(567),router=(0,express_1.Router)(),ctrl=new users_controller_1.UsersController;
/**
 * @swagger
 * /api/users/responsible-universities:
 *   get:
 *     tags:
 *       - Users
 *     summary: Получить список ответственных
 *     description: Возвращает все ответственные
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список ответсвенных успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/responsible-universities",authorize_1.isMinistryToken,ctrl.usersList),
/**
 * @swagger
 * /api/users/responsible-universities:
 *   post:
 *     tags:
 *       - Users
 *     summary: Создать ответственного
 *     description: Создаёт нового ответственного пользователя для университета
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_university
 *               - users_fio
 *               - logins
 *               - passwords
 *             properties:
 *               id_university:
 *                 type: integer
 *                 example: 12
 *               users_fio:
 *                 type: string
 *                 description: Полное имя пользователя
 *                 example: "Иванов Иван Иванович"
 *               pin:
 *                 type: integer
 *                 nullable: true
 *                 example: 12345678901234
 *               logins:
 *                 type: string
 *                 description: Логин пользователя
 *                 example: "ivanov.i"
 *               passwords:
 *                 type: string
 *                 description: Пароль пользователя
 *                 example: "Secret123!"
 *               telefon:
 *                 type: string
 *                 nullable: true
 *                 description: Телефон пользователя
 *                 example: "+996701234567"
 *               email:
 *                 type: string
 *                 nullable: true
 *                 description: Электронная почта пользователя
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Данные успешно добавлены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: boolean
 *                   example: true
 */
router.post("/responsible-universities",authorize_1.isMinistryToken,ctrl.createUsers),
/**
 * @swagger
 * /api/users/responsible-universities:
 *   put:
 *     tags:
 *       - Users
 *     summary: Обновить данные ответственного пользователя
 *     description: Обновляет данные существующего ответственного пользователя университета
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_users
 *               - id_university
 *               - users_fio
 *               - logins
 *               - old_passwords
 *             properties:
 *               id_users:
 *                 type: integer
 *                 description: ID редактируемого пользователя
 *                 example: 25
 *               id_university:
 *                 type: integer
 *                 example: 12
 *               users_fio:
 *                 type: string
 *                 description: Полное имя пользователя
 *                 example: "Иванов Иван Иванович"
 *               pin:
 *                 type: integer
 *                 nullable: true
 *                 example: 12345678901234
 *               logins:
 *                 type: string
 *                 description: Логин пользователя
 *                 example: "ivanov.i"
 *               old_passwords:
 *                 type: string
 *                 description: Текущий закешированный пароль пользователя
 *                 example: "8462e344a4377b1dc19aded82b6bfaa1"
 *               new_passwords:
 *                 type: string
 *                 nullable: true
 *                 description: Новый пароль пользователя (если требуется обновление)
 *                 example: "NewPassword456!"
 *               telefon:
 *                 type: string
 *                 nullable: true
 *                 description: Телефон пользователя
 *                 example: "+996701234567"
 *               email:
 *                 type: string
 *                 nullable: true
 *                 description: Электронная почта пользователя
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Данные успешно обновлены
 */
router.put("/responsible-universities",authorize_1.isMinistryToken,ctrl.updateUsers),
/**
 * @swagger
 * /api/users/responsible-universities/{id_users}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Удалить ответственного пользователя
 *     description: Удаляет ответственного пользователя по его ID.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: path
 *         name: id_users
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор пользователя, которого нужно удалить
 *         example: 25
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Пользователь успешно удалён
 *       400:
 *         description: Неверный формат параметров (например, id не число)
 */
router.delete("/responsible-universities/:id_users",authorize_1.isMinistryToken,ctrl.deleteUsers),exports.default=router},1067:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.EmailController=void 0;const abiturient_service_1=__webpack_require__(7076),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),email_schema_1=__webpack_require__(9700),emailService=new(__webpack_require__(1948).EmailService),abitService=new abiturient_service_1.AbiturientService;exports.EmailController=class{constructor(){this.verificationEmail=async(req,res)=>{try{const{isValid,data,issues}=(0,validation_1.validate)(email_schema_1.emailVerifySchema,req.body);if(!isValid||!data){const msgKey=issues[0].message;return(0,response_1.sendError)(res,req.t(`email.${msgKey}`))}const email=data.email.toLocaleLowerCase().trim();if((data?.isCheckEmail??!0)&&await abitService.checkExistEmail(email))return(0,response_1.sendError)(res,req.t("email.already_exist"));if(await emailService.existEmailVerify(email))return(0,response_1.sendError)(res,req.t("email.isExistEmailCode"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage);return await emailService.emailConfirmCode(email,id_lang)?(0,response_1.sendSuccess)(res,req.t("email.success_send")):(0,response_1.sendError)(res,req.t("email.error_send"))}catch(error){return console.error("❌ EmailController.verificationEmail error: ",error.message),(0,response_1.sendError)(res,req.t("email.error"))}}}}},1077:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.validate=function(schema,payload){const result=schema.safeParse(payload);if(result.success)return{isValid:!0,data:result.data};return{isValid:!1,issues:result.error.issues}}},1132:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.countryUpdateSchema=exports.countryCreateSchema=void 0;const zod_1=__webpack_require__(1569);exports.countryCreateSchema=zod_1.z.object({country:zod_1.z.string().min(1),country_en:zod_1.z.string().min(1),agreement:zod_1.z.boolean(),agreement_year:zod_1.z.string().regex(/^\d{4}$/,{message:"agreement_year_format"}).nullable().optional(),spravka:zod_1.z.boolean(),id_country_type:zod_1.z.number().int(),ort:zod_1.z.boolean(),ort_max_ball:zod_1.z.number().nullable().optional()}),exports.countryUpdateSchema=zod_1.z.object({country:zod_1.z.string().min(1),country_en:zod_1.z.string().min(1),agreement:zod_1.z.boolean(),agreement_year:zod_1.z.string().regex(/^\d{4}$/,{message:"agreement_year_format"}).nullable().optional(),spravka:zod_1.z.boolean(),id_country_type:zod_1.z.number().int(),ort:zod_1.z.boolean(),ort_max_ball:zod_1.z.number().nullable().optional()})},1136:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.livenessHandler=void 0;exports.livenessHandler=(_req,res)=>{res.json({status:"ok",uptime:Math.floor(process.uptime()),timestamp:(new Date).toISOString()})}},1187:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.UsersRepository=void 0;const db_1=__webpack_require__(6067);exports.UsersRepository=class{async findAllUsers(id_lang){try{const sql="SELECT * FROM fn_mon_universities_users_grid($1);",{rows}=await(0,db_1.dbQuery)(sql,[id_lang]);return rows}catch(error){throw console.error("❌ UsersRepository.findAllUsers error:",error.message),error}}async usersIUD(params){const values=[params.id_users,params.iud,params.id_users_edit??null,params.id_university??null,params.users_fio??null,params.pin??null,params.logins??null,params.passwords??null,params.telefon??null,params.email??null,null];return await(0,db_1.dbQuery)("CALL p_mon_universities_users_iud($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",values)}}},1319:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.withTimeout=function(promise,timeoutMs,errorMessage){return Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error(errorMessage)),timeoutMs))])}},1442:(__unused_webpack_module,exports)=>{var IUDOperation;Object.defineProperty(exports,"__esModule",{value:!0}),exports.IUDOperation=void 0,function(IUDOperation){IUDOperation[IUDOperation.INSERT=0]="INSERT",IUDOperation[IUDOperation.UPDATE=1]="UPDATE",IUDOperation[IUDOperation.DELETE=2]="DELETE"}(IUDOperation||(exports.IUDOperation=IUDOperation={}))},1539:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.CountryController=void 0;const helpers_1=__webpack_require__(8549),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),country_schema_1=__webpack_require__(1132),service=new(__webpack_require__(9956).CountryService);exports.CountryController=class{constructor(){this.countryAll=async(req,res)=>{try{const result=await service.getAllCountry();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ error CountryController countryAll: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.countryCreate=async(req,res,next)=>{try{const{isValid,data}=(0,validation_1.validate)(country_schema_1.countryCreateSchema,req.body);if(!isValid)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await service.createCountry(data);return"INSERT"===result?(0,response_1.sendSuccess)(res,req.t("successAdd")):"Дубликат"===result?(0,response_1.sendError)(res,req.t("country.duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorAdd"))}catch(error){return next(error)}},this.countryUpdate=async(req,res,next)=>{try{const id_country=(0,helpers_1.toNumber)(req.params?.id_country);if(!id_country)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(country_schema_1.countryUpdateSchema,req.body);if(!isValid)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await service.updateCountry(id_country,data);return"UPDATE"===result?(0,response_1.sendSuccess)(res,req.t("successUpdate")):"NOT FOUND"===result?(0,response_1.sendError)(res,req.t("country.not_found"),!1,404):"Дубликат"===result?(0,response_1.sendError)(res,req.t("country.duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}},this.countryDelete=async(req,res,next)=>{try{const id_country=(0,helpers_1.toNumber)(req.params?.id_country);if(!id_country)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await service.deleteCountry(id_country);return"DELETE"===result?(0,response_1.sendSuccess)(res,req.t("successDelete")):"NOT FOUND"===result?(0,response_1.sendError)(res,req.t("country.not_found"),!1,404):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){return next(error)}}}}},1546:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.TourService=void 0;const tour_respository_1=__webpack_require__(8058);exports.TourService=class{constructor(){this.repository=new tour_respository_1.TourRepository}async checkTour(){const{rows,rowCount}=await this.repository.checkTour();return rowCount?rows[0]:null}}},1569:module=>{module.exports=require("zod")},1651:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.DirectionController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),direction_schema_1=__webpack_require__(236),direction_service_1=__webpack_require__(3892);exports.DirectionController=class{constructor(){this.service=new direction_service_1.DirectionService,this.getDirectionsByFaculty=async(req,res,next)=>{try{const id_faculty=(0,helpers_1.toNumber)(req.params.id_faculty);if(!id_faculty)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.getDirectionsByFaculty(id_users,id_faculty);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.getDirectionsSelector=async(req,res,next)=>{try{const id_faculty=(0,helpers_1.toNumber)(req.query.id_faculty);if(!id_faculty)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,id_role=req.user.role,id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getDirectionsSelector(id_users,id_role,id_lang,id_faculty);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.getLearningSelector=async(req,res,next)=>{try{const id_direction=(0,helpers_1.toNumber)(req.query.id_direction);if(!id_direction)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,id_role=req.user.role,language=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getLearningSelector(id_users,id_role,language,id_direction);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.getEducationLanguageSelector=async(req,res,next)=>{try{const id_direction=(0,helpers_1.toNumber)(req.query.id_direction),id_learning=(0,helpers_1.toNumber)(req.query.id_learning);if(!id_direction||!id_learning)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,id_role=req.user.role,language=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getEducationLanguageSelector(id_users,id_role,language,id_direction,id_learning);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.getSpecialtySelector=async(req,res,next)=>{try{const id_direction=(0,helpers_1.toNumber)(req.query.id_direction),id_learning=(0,helpers_1.toNumber)(req.query.id_learning),id_education_language=(0,helpers_1.toNumber)(req.query.id_education_language);if(!id_direction||!id_learning||!id_education_language)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,id_role=req.user.role,language=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getSpecialtySelector(id_users,id_role,language,id_direction,id_learning,id_education_language);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.createDirection=async(req,res,next)=>{try{const{isValid,data}=(0,validation_1.validate)(direction_schema_1.directionCreateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.createDirection(id_users,data);return"INSERT"===result?(0,response_1.sendSuccess)(res,req.t("createSuccess")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorCreate"))}catch(error){next(error)}},this.updateDirection=async(req,res,next)=>{try{const id_direction=(0,helpers_1.toNumber)(req.params.id_direction);if(!id_direction)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(direction_schema_1.directionUpdateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.updateDirection(id_users,id_direction,data);return"UPDATE"===result?(0,response_1.sendSuccess)(res,req.t("updateSuccess")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){next(error)}},this.deleteDirection=async(req,res,next)=>{try{const id_direction=(0,helpers_1.toNumber)(req.params.id_direction);if(!id_direction)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.deleteDirection(id_users,id_direction);return"DELETE"===result?(0,response_1.sendSuccess)(res,req.t("deleteSuccess")):"There is a connection to another table"===result?(0,response_1.sendError)(res,req.t("hasRelations"),!1,409):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){next(error)}}}}},1653:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.resizeImage=resizeImage;const sharp_1=__importDefault(__webpack_require__(9288));async function resizeImage(options){const{input,width,height,outputPath}=options;try{const destination=`${outputPath}`;return await(0,sharp_1.default)(input).resize(width,height,{fit:sharp_1.default.fit.outside,withoutEnlargement:!0}).toFile(destination),!0}catch(error){return console.error("❌ resizeImage error:",error.message),!1}}exports.default={resizeImage}},1763:module=>{module.exports=require("express-rate-limit")},1889:module=>{module.exports=require("i18next-http-middleware")},1948:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.EmailService=void 0;const env_1=__webpack_require__(6138),EmailService_1=__webpack_require__(2348),helpers_1=__webpack_require__(8549),email_repository_1=__webpack_require__(3359),email_templates_1=__webpack_require__(3428);exports.EmailService=class{constructor(){this.emailRepository=new email_repository_1.EmailRepository}async emailConfirmCode(email,id_lang=2){try{const code=String((0,helpers_1.generateCode)()),type=env_1.ENV.EMAIL.TYPE_CONFIRM,message=(0,email_templates_1.getVerificationEmailContent)(code,id_lang),emailSendData=await(0,EmailService_1.emailSendService)({email,type,message});if(emailSendData){const id_status=emailSendData.status;return await this.insertEmailVerify({email,id_status,code}),!0}return!1}catch(error){return console.error("❌ EmailService.emailConfirmCode error:",error.message),!1}}async emailRecoverLink(email,link,id_lang=1){try{const type=env_1.ENV.EMAIL.TYPE_RECOVER,message=(0,email_templates_1.getPasswordResetEmailContent)(link,id_lang);return!!await(0,EmailService_1.emailSendService)({email,type,message})}catch(error){return console.error("❌ EmailService.emailRecoverLink error:",error.message),!1}}async sendRegistrationCredentials(email,password,id_lang=1){try{const type=env_1.ENV.EMAIL.TYPE_CONFIRM,message=(0,email_templates_1.getRegistrationCredentialsEmailContent)(email,password,id_lang);return!!await(0,EmailService_1.emailSendService)({email,type,message})}catch(error){return console.error("❌ EmailService.sendRegistrationCredentials error:",error.message),!1}}async insertEmailVerify(data){const{command}=await this.emailRepository.insertEmailVerification(data);return"INSERT"===command}async existEmailVerify(email){const{rows}=await this.emailRepository.existEmailVerification({email,minutes:15});return rows[0]?.exists??!1}async getEmailVerifyId(email,code){return await this.emailRepository.findEmailVerification({email:email.toLowerCase().trim(),code,minutes:30})}async updateEmailVerification(id_email_verification){const{command}=await this.emailRepository.updateEmailVerification(id_email_verification);return"UPDATE"===command}async insertRecoverPassword(email){try{return await this.emailRepository.insertRecoverPasswordEmail(email)}catch(error){return console.error("❌ EmailService.insertRecoverPassword error:",error.message),!1}}async updateRecoverPasswordEmail(data){try{return await this.emailRepository.updateRecoverPasswordEmail(data)}catch(error){return console.error("❌ EmailService.updateRecoverPasswordEmail error:",error.message),!1}}async existRecoverPassEmail(email){return await this.emailRepository.existRecoverPasswordEmail({email,minutes:5})}async existRecoverEmailById(data){return await this.emailRepository.existRecoverPassEmailById(data)}}},1949:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.AuthRepository=void 0;const db_1=__webpack_require__(6067);exports.AuthRepository=class{async findUserByPinPasswordAuth(data){const values=[data.login,data.hashPassword,data.id_role],{rows,rowCount}=await(0,db_1.dbQuery)("SELECT * FROM fn_auth($1, $2, $3);",values);return rowCount?rows[0]:null}async findUserAuthInfo(data){const values=[data.id,data.role],{rows,rowCount}=await(0,db_1.dbQuery)("SELECT * FROM fn_auth_info($1, $2);",values);return rowCount?rows[0]:null}async registerAbiturient(data){const values=[data.id_lang,data.surname,data.names,data.patronymic,data.surname_en,data.names_en,data.patronymic_en,data.birth_date,data.id_gender,data.passport,data.passport_date,data.id_country,data.email,data.hashPassword,data.telephone,null];return await(0,db_1.dbQuery)("CALL p_ab_registration($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16);",values)}}},2077:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const users_route_1=__importDefault(__webpack_require__(1022));exports.default=users_route_1.default},2087:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.DirectionRepository=void 0;const db_1=__webpack_require__(6067);exports.DirectionRepository=class{async getDirectionsByFaculty(id_users,id_faculty){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_direction_grid($1, $2)",[id_users,id_faculty])}async getDirectionsSelector(id_users,id_role,id_lang,id_faculty){return await(0,db_1.dbQuery)("SELECT * FROM fn_sel_direction($1, $2, $3, $4)",[id_users,id_role,id_lang,id_faculty])}async getLearningSelector(id_users,id_role,language,id_direction){return await(0,db_1.dbQuery)("SELECT * FROM fn_sel_learning_plan($1, $2, $3, $4)",[id_users,id_role,language,id_direction])}async getEducationLanguageSelector(id_users,id_role,language,id_direction,id_learning){return await(0,db_1.dbQuery)("SELECT * FROM fn_sel_education_lang_plan($1, $2, $3, $4, $5)",[id_users,id_role,language,id_direction,id_learning])}async getSpecialtySelector(id_users,id_role,language,id_direction,id_learning,id_education_language){return await(0,db_1.dbQuery)("SELECT * FROM fn_sel_specialty_plan($1, $2, $3, $4, $5, $6)",[id_users,id_role,language,id_direction,id_learning,id_education_language])}async manageDirection(id_users,iud,id_direction,id_faculty,direction_cipher,direction,direction_en){return await(0,db_1.dbQuery)("CALL p_vuz_direction_grid_iud($1, $2, $3, $4, $5, $6, $7, $8);",[id_users,iud,id_direction,id_faculty,direction_cipher,direction,direction_en,""])}}},2137:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const i18next_1=__importDefault(__webpack_require__(6427)),i18next_http_middleware_1=__importDefault(__webpack_require__(1889)),i18next_node_fs_backend_1=__importDefault(__webpack_require__(8495)),translation_json_1=__importDefault(__webpack_require__(9224)),translation_json_2=__importDefault(__webpack_require__(3087)),translation_json_3=__importDefault(__webpack_require__(970)),lang_1=__webpack_require__(7590),resources=Object.freeze({ru:Object.freeze({translation:translation_json_3.default}),en:Object.freeze({translation:translation_json_1.default}),ky:Object.freeze({translation:translation_json_2.default})});i18next_1.default.use(i18next_node_fs_backend_1.default).use(i18next_http_middleware_1.default.LanguageDetector).init({resources,defaultNS:"translation",lng:lang_1.DEFAULT_LANGUAGE_CODE,supportedLngs:lang_1.SUPPORTED_LANGUAGES,detection:{order:["querystring","cookie"],caches:["cookie"],lookupQuerystring:"lang",lookupCookie:"lang",cookieSecure:!0,cookieSameSite:"lax"},fallbackLng:lang_1.DEFAULT_LANGUAGE_CODE,preload:[lang_1.DEFAULT_LANGUAGE_CODE],interpolation:{escapeValue:!1},returnEmptyString:!1,saveMissing:!1,debug:!1}),exports.default=i18next_http_middleware_1.default.handle(i18next_1.default)},2189:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.normalizeFormData=function(input,options={emptyAsNull:!0,maxDepth:10}){const{emptyAsNull,maxDepth=10}=options;return function normalizeValue(value,depth=0){if(depth>maxDepth)return console.warn(`⚠️  Max depth (${maxDepth}) reached during normalization, skipping deeper levels`),value;if("string"==typeof value){const trimmed=value.trim();return!emptyAsNull||""!==trimmed&&"null"!==trimmed.toLowerCase()&&"undefined"!==trimmed.toLowerCase()?trimmed:null}if(Array.isArray(value))return value.map(item=>normalizeValue(item,depth+1));if(value&&"object"==typeof value){if(value instanceof Date)return value;if(Buffer.isBuffer(value))return value;if(value.mimetype||value.data||value.mv)return value;if(value instanceof RegExp||value instanceof Error||value instanceof Map||value instanceof Set)return value;const result={};for(const[key,val]of Object.entries(value))result[key]=normalizeValue(val,depth+1);return result}return value}(input)}},2210:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),shared_controller_1=__webpack_require__(2955),router=(0,express_1.Router)(),ctrl=new shared_controller_1.SharedController;
/**
 * @swagger
 * /api/shared/gender:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список полов
 *     description: Возвращает все доступные варианты пола с учётом языка локализации.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список полов успешно получен
 */
router.get("/gender",ctrl.genderList),
/**
 * @swagger
 * /api/shared/country:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список стран
 *     description: Возвращает все доступные варианты стран с учётом языка локализации.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список стран успешно получен
 */
router.get("/country",ctrl.allCountriesList),
/**
 * @swagger
 * /api/shared/region:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список регинов
 *     description: Возвращает все доступные варианты регинов с учётом языка локализации.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список регинов успешно получен
 */
router.get("/region",ctrl.regionList),
/**
 * @swagger
 * /api/shared/university:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список университетов
 *     description: Возвращает все доступные варианты университетов с учётом языка локализации.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список университетов успешно получен
 */
router.get("/university",ctrl.universityList),
/**
 * @swagger
 * /api/shared/university/{id_university}/specialty:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список специальностей факультетов по университетам
 *     description: Возвращает список направлений и специальностей факультетов по выбранного ID университета.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_university
 *         in: path
 *         required: true
 *         description: ID университета
 *         schema:
 *           type: integer
 *           example: 14
 *     responses:
 *       200:
 *         description: Список специальностей факультетов успешно получен
 */
router.get("/university/:id_university/specialty",ctrl.specialtyList),
/**
 * @swagger
 * /api/shared/faculty/{id_faculty}/contacts:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список контактов по факультетам
 *     description: Возвращает список контактов по факультетам выбранного университета по его ID.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_faculty
 *         in: path
 *         required: true
 *         description: ID факультета
 *         schema:
 *           type: integer
 *           example: 146
 *     responses:
 *       200:
 *         description: Список контактов успешно получен
 */
router.get("/faculty/:id_faculty/contacts",ctrl.contactsList),
/**
 * @swagger
 * /api/shared/education-document:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список документов об образовании
 *     description: Возвращает список документов об образовании
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список документов об образовании успешно получен
 */
router.get("/education-document",ctrl.educationDocList),
/**
 * @swagger
 * /api/shared/education-languages:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список языков обучения
 *     description: Возвращает все доступные языки обучения (русский, киргизский, английский и т.д.)
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список языков обучения успешно получен
 */
router.get("/education-languages",ctrl.educationLanguagesList),
/**
 * @swagger
 * /api/shared/control-types:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список типов контроля
 *     description: Возвращает все доступные типы контроля знаний с мультиязычной поддержкой
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список типов контроля успешно получен
 */
router.get("/control-types",ctrl.controlTypesList),
/**
 * @swagger
 * /api/shared/commission-positions:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список должностей приемной комиссии
 *     description: Возвращает все доступные должности членов приемной комиссии с мультиязычной поддержкой
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список должностей приемной комиссии успешно получен
 */
router.get("/commission-positions",ctrl.commissionPositionsList),
/**
 * @swagger
 * /api/shared/learning:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список форм обучения
 *     description: Возвращает все доступные формы обучения (очная, заочная и т.д.) с мультиязычной поддержкой
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список форм обучения успешно получен
 */
router.get("/learning",ctrl.learningList),
/**
 * @swagger
 * /api/shared/proffession:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список профессий
 *     description: Возвращает все доступные профессии с мультиязычной поддержкой (русский, английский, киргизский)
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список профессий успешно получен
 */
router.get("/proffession",ctrl.proffessionList),
/**
 * @swagger
 * /api/shared/ws:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список приемных кампаний
 *     description: Возвращает список приемных кампаний (сезонов приема) с мультиязычной поддержкой
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список приемных кампаний успешно получен
 */
router.get("/ws",ctrl.wsList),
/**
 * @swagger
 * /api/shared/bk:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список типов обучения (бюджет/контракт)
 *     description: Возвращает список типов обучения (бюджет, контракт) с мультиязычной поддержкой
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список типов обучения успешно получен
 */
router.get("/bk",ctrl.bkList),
/**
 * @swagger
 * /api/shared/years:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список годов
 *     description: Возвращает список доступных годов с мультиязычной поддержкой
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список годов успешно получен
 */
router.get("/years",ctrl.yearsList),
/**
 * @swagger
 * /api/shared/status-mon:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список статусов мониторинга
 *     description: Возвращает все доступные статусы мониторинга с мультиязычной поддержкой и цветовыми кодами
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список статусов мониторинга успешно получен
 */
router.get("/status-mon",ctrl.statusMonList),
/**
 * @swagger
 * /api/shared/education-direction:
 *   get:
 *     tags:
 *       - Shared
 *     summary: Получить список направлений образования
 *     description: Возвращает все доступные направления образования с мультиязычной поддержкой. Первый элемент (id=0) - "Все направления".
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список направлений образования успешно получен
 */
router.get("/education-direction",ctrl.educationDirectionList),exports.default=router},2284:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.applyAbiturientSchema=exports.abiturientDocumentSchema=exports.updatePersonalSchema=void 0;const zod_1=__webpack_require__(1569),regex_1=__webpack_require__(3807);exports.updatePersonalSchema=zod_1.z.object({surname:zod_1.z.string().min(1,{message:"surname_required"}),surname_en:zod_1.z.string().min(0).nullable(),names:zod_1.z.string().min(1,{message:"names_required"}),names_en:zod_1.z.string().min(0).nullable(),patronymic:zod_1.z.string().min(0).nullable(),patronymic_en:zod_1.z.string().min(0).nullable(),id_gender:zod_1.z.coerce.number({required_error:"id_gender_required",invalid_type_error:"id_gender_invalid"}),birth_date:zod_1.z.string({required_error:"birth_date_required",invalid_type_error:"birth_date_invalid"}).regex(regex_1.DATE_DB_FORMAT_REGEX,{message:"birth_date_format"}),passport:zod_1.z.string({required_error:"passport_required",invalid_type_error:"passport_invalid"}).min(1,{message:"passport_required"}),passport_date:zod_1.z.string({required_error:"passport_date_required",invalid_type_error:"passport_date_invalid"}).regex(regex_1.DATE_DB_FORMAT_REGEX,{message:"passport_date_format"}),id_country:zod_1.z.coerce.number({required_error:"id_country_required",invalid_type_error:"id_country_invalid"}),telephone:zod_1.z.string({required_error:"telephone_required",invalid_type_error:"telephone_invalid"}).min(1,{message:"telephone_required"}),id_education_doc:zod_1.z.coerce.number({required_error:"id_education_doc_required",invalid_type_error:"id_education_doc_invalid"}),serial_number:zod_1.z.string({required_error:"serial_number_required",invalid_type_error:"serial_number_invalid"}).min(1,{message:"serial_number_required"}),date_document:zod_1.z.string({required_error:"date_document_required",invalid_type_error:"date_document_invalid"}).regex(regex_1.DATE_DB_FORMAT_REGEX,{message:"date_document_format"}),name_org:zod_1.z.string({required_error:"name_org_required",invalid_type_error:"name_org_invalid"}).min(1,{message:"name_org_required"})}),exports.abiturientDocumentSchema=zod_1.z.object({id_document:zod_1.z.coerce.number({required_error:"id_document_required",invalid_type_error:"id_document_invalid"})}),exports.applyAbiturientSchema=zod_1.z.object({id_specialty:zod_1.z.coerce.number({required_error:"id_specialty_required",invalid_type_error:"id_specialty_invalid"}).int().positive("ID специальности должен быть положительным числом"),id_bk:zod_1.z.coerce.number({required_error:"id_bk_required",invalid_type_error:"id_bk_invalid"}).int().positive("ID бакалавриата должен быть положительным числом")})},2320:module=>{module.exports=require("swagger-ui-express")},2348:function(__unused_webpack_module,exports,__webpack_require__){var ownKeys,__createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||(ownKeys=function(o){return ownKeys=Object.getOwnPropertyNames||function(o){var ar=[];for(var k in o)Object.prototype.hasOwnProperty.call(o,k)&&(ar[ar.length]=k);return ar},ownKeys(o)},function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k=ownKeys(mod),i=0;i<k.length;i++)"default"!==k[i]&&__createBinding(result,mod,k[i]);return __setModuleDefault(result,mod),result});Object.defineProperty(exports,"__esModule",{value:!0}),exports.emailSendService=async function({email,type,redirect=!1,message,content=null}){try{const{data}=await axios_1.default.post(env_1.ENV.EMAIL.SECUIRITY_URL,{email,type,redirect,message,content},{timeout:15e3,headers:{"Content-Type":"application/json"}});return data}catch(error){return error instanceof axios_1.AxiosError?console.error("❌ emailSendService error:",{message:error.message,status:error.response?.status,data:error.response?.data}):console.error("❌ emailSendService error:",error.message),!1}};const axios_1=__importStar(__webpack_require__(8938)),env_1=__webpack_require__(6138)},2377:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.errorHandler=void 0;const env_1=__webpack_require__(6138),httpError_1=__webpack_require__(7178),response_1=__webpack_require__(8369);exports.errorHandler=(err,req,res,_next)=>{const isDevelopment="development"===env_1.ENV.NODE_ENV,statusCode=err instanceof httpError_1.HttpError?err.statusCode:500,errorMessage=err instanceof httpError_1.HttpError?err.message:"error.internal_server",errorContext={timestamp:(new Date).toISOString(),method:req.method,url:req.originalUrl||req.url,ip:req.ip||req.socket.remoteAddress,userId:req.user?.id||null,statusCode,errorType:err.constructor.name,message:err.message};return isDevelopment?(console.error("\n❌ ==================== ERROR ===================="),console.error("Context:",JSON.stringify(errorContext,null,2)),console.error("Stack:",err.stack),console.error("================================================\n")):console.error({level:"error",...errorContext,stack:err.stack?.split("\n").slice(0,3).join(" | ")}),err instanceof httpError_1.HttpError?(0,response_1.sendError)(res,req.t(errorMessage),!1,statusCode):isDevelopment?(0,response_1.sendError)(res,err.message||"Internal Server Error",!1,500):(0,response_1.sendError)(res,req.t("error.internal_server"),!1,500)}},2419:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.SettingsController=void 0;const abiturient_service_1=__webpack_require__(7076),email_service_1=__webpack_require__(1948),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),settings_schema_1=__webpack_require__(556),service=new(__webpack_require__(3156).SettingsService),emailService=new email_service_1.EmailService,abitService=new abiturient_service_1.AbiturientService;exports.SettingsController=class{constructor(){this.photoUpload=async(req,res)=>{try{const authState=req.user;if(!authState)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);let avatar=req.files?.avatar;if(Array.isArray(avatar)&&(avatar=avatar[0]),!avatar||avatar&&!avatar.mimetype.startsWith("image/"))return(0,response_1.sendError)(res,req.t("uploadImage"));return await service.savePhotoAvatar(authState,avatar)?(0,response_1.sendSuccess)(res,req.t("successSave")):(0,response_1.sendError)(res,req.t("errorSave"))}catch(error){return console.error("❌ SettingsController.photoUpload error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.changePassword=async(req,res)=>{try{const authState=req.user;if(!authState)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const{isValid,data}=(0,validation_1.validate)(settings_schema_1.changePasswordSchema,req.body);if(!isValid)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await service.updateUserPassword(authState,data);return"UPDATE"===result?(0,response_1.sendSuccess)(res,req.t("password.change.success")):"FAILURE"===result?(0,response_1.sendError)(res,req.t("password.change.wrongOld"),!1,422):"Unknown role"===result?(0,response_1.sendError)(res,req.t("password.change.failed")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return console.error("❌ SettingsController.changePassword error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.changeEmail=async(req,res)=>{try{const authState=req.user;if(!authState)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const{isValid,data}=(0,validation_1.validate)(settings_schema_1.changeEmailSchema,req.body);if(!isValid)return(0,response_1.sendError)(res,req.t("inValidFormat"));let{email,code}=data;if(email=email.toLocaleLowerCase(),await abitService.checkExistEmail(email))return(0,response_1.sendError)(res,req.t("email.already_exist"));const emailVerifyData=await emailService.getEmailVerifyId(email,code);if(!emailVerifyData||!emailVerifyData.id_email_verification)return(0,response_1.sendError)(res,req.t("invalidEmailCode"));return await service.updateAbiturientEmail({email,id_abiturient:authState.id})?(setImmediate(async()=>{await emailService.updateEmailVerification(emailVerifyData.id_email_verification)}),(0,response_1.sendSuccess)(res,req.t("successUpdate"))):(0,response_1.sendError)(res,req.t("updateError"))}catch(error){return console.error("❌ SettingsController.changeEmail error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.getAvatar=async(req,res)=>{try{const{file_name}=req.params,avatarStream=await service.getAvatarStream(file_name);if(!avatarStream)return(0,response_1.sendError)(res,req.t("avatar.notFound"),!1,404);res.setHeader("Content-Type","image/png"),res.sendFile(avatarStream)}catch(error){return console.error("❌ SettingsController.getAvatar error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.setGetAllSettings=async(req,res)=>{try{const settings=await service.getAllSettings();return(0,response_1.sendSuccess)(res,req.t("success"),settings)}catch(error){return console.error("❌ SettingsController.setGetAllSettings error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}}}}},2449:module=>{module.exports=require("pg")},2565:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const faculty_route_1=__importDefault(__webpack_require__(9682));exports.default=faculty_route_1.default},2633:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.MonitoringController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),monitoring_schema_1=__webpack_require__(4682),monitoring_service_1=__webpack_require__(8366);exports.MonitoringController=class{constructor(){this.service=new monitoring_service_1.MonitoringService,this.updateStatus=async(req,res,next)=>{try{const id_user=req.user?.id;if(!id_user)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(monitoring_schema_1.statusUpdateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage);return"UPDATE"===await this.service.updateStatus(id_user,id_lang,data)?(0,response_1.sendSuccess)(res,req.t("successUpdate")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}},this.getSpravka=async(req,res,next)=>{try{const id_abiturient=(0,helpers_1.toNumber)(req.params.id_abiturient);if(!id_abiturient)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await this.service.getSpravka(id_abiturient);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.getAbitRefusing=async(req,res,next)=>{try{const id_abiturient=(0,helpers_1.toNumber)(req.params.id_abiturient),id_movement=(0,helpers_1.toNumber)(req.params.id_movement);if(!id_abiturient||!id_movement)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAbitRefusing(id_lang,id_abiturient,id_movement);return(0,response_1.sendSuccess)(res,req.t("success"),{refusing:result})}catch(error){return next(error)}},this.getAbiturientGrid=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_university:(0,helpers_1.toNumber)(req.query.id_university),id_year:(0,helpers_1.toNumber)(req.query.id_year),id_ws:(0,helpers_1.toNumber)(req.query.id_ws),page:(0,helpers_1.toNumber)(req.query.page)||1,size:(0,helpers_1.toNumber)(req.query.size)||50,search:req.query.search?String(req.query.search):null},{isValid,data}=(0,validation_1.validate)(monitoring_schema_1.monitoringGridSchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAbitGrid(id_user,id_role,id_lang,data);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}}}}},2676:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.updatePlanSchema=exports.createPlanSchema=void 0;const zod_1=__webpack_require__(1569);exports.createPlanSchema=zod_1.z.object({id_specialty:zod_1.z.number().int().positive(),id_bk:zod_1.z.number().int().positive(),kol_plan:zod_1.z.number().int().nonnegative(),smeta_doc:zod_1.z.number().int().nonnegative(),smeta_education:zod_1.z.number().int().nonnegative(),comments:zod_1.z.string().max(255).optional().default(""),comments_en:zod_1.z.string().max(255).optional().default(""),individual:zod_1.z.boolean().default(!1),id_control_type:zod_1.z.number().int().positive().default(1),smeta_near_abroad:zod_1.z.number().int().nonnegative().default(0),smeta_far_abroad:zod_1.z.number().int().nonnegative().default(0),id_year:zod_1.z.number().int().nonnegative().default(0),id_ws:zod_1.z.number().int().positive().default(1)}),exports.updatePlanSchema=zod_1.z.object({id_specialty:zod_1.z.number().int().positive(),id_bk:zod_1.z.number().int().positive(),kol_plan:zod_1.z.number().int().nonnegative(),smeta_doc:zod_1.z.number().int().nonnegative(),smeta_education:zod_1.z.number().int().nonnegative(),comments:zod_1.z.string().max(255).optional().default(""),comments_en:zod_1.z.string().max(255).optional().default(""),individual:zod_1.z.boolean().default(!1),id_control_type:zod_1.z.number().int().positive().default(1),smeta_near_abroad:zod_1.z.number().int().nonnegative().default(0),smeta_far_abroad:zod_1.z.number().int().nonnegative().default(0)})},2699:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.corsMiddleware=function(){"*"===ALLOWED_ORIGINS?console.warn("⚠️  CORS: Allowing all origins (development mode)"):0===ALLOWED_ORIGINS.length?console.error("❌ CORS: No origins allowed - all requests will be blocked"):console.log(`✅ CORS: Allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);return(0,cors_1.default)(corsOptionsDelegate)};const cors_1=__importDefault(__webpack_require__(8577)),env_1=__webpack_require__(6138),ALLOWED_ORIGINS=(()=>{const originsEnv=env_1.ENV.ALLOWED_ORIGINS;if(!originsEnv){return"production"!==env_1.ENV.NODE_ENV?(console.warn("⚠️  ALLOWED_ORIGINS not set. Defaulting to localhost for development."),["http://localhost:3000"]):(console.error("❌ ALLOWED_ORIGINS environment variable is required in production"),[])}if("*"===originsEnv){return"production"===env_1.ENV.NODE_ENV?(console.error("❌ ALLOWED_ORIGINS=* is not allowed in production for security reasons"),[]):"*"}return originsEnv.split(",").map(origin=>origin.trim()).filter(Boolean)})(),corsOptionsDelegate=(req,callback)=>{const requestOrigin=req.headers.origin;let corsOptions;"*"===ALLOWED_ORIGINS||requestOrigin&&ALLOWED_ORIGINS.includes(requestOrigin)?corsOptions={origin:!0,methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],allowedHeaders:["Content-Type","Authorization","X-Requested-With","Accept","Origin"],exposedHeaders:["Content-Range","X-Content-Range","Content-Disposition"],credentials:!0,preflightContinue:!1,optionsSuccessStatus:204,maxAge:3600}:(corsOptions={origin:!1},requestOrigin&&console.warn(`🚫 CORS: Blocked request from unauthorized origin: ${requestOrigin}`)),callback(null,corsOptions)}},2703:module=>{module.exports=require("node-cron")},2761:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.CommissionService=void 0;const iud_1=__webpack_require__(1442),commission_repository_1=__webpack_require__(8700);exports.CommissionService=class{constructor(){this.repository=new commission_repository_1.CommissionRepository}async getCommissionMembers(id_users,language){const{rows}=await this.repository.findCommissionMembers(id_users,language);return rows}async createCommission(id_users,data){const{rows}=await this.repository.manageCommission(id_users,iud_1.IUDOperation.INSERT,0,data.id_commission_position,data.fio,data.fio_en);return rows[0]?.sms||""}async updateCommission(id_users,id_commission,data){const{rows}=await this.repository.manageCommission(id_users,iud_1.IUDOperation.UPDATE,id_commission,data.id_commission_position,data.fio,data.fio_en);return rows[0]?.sms||""}async deleteCommission(id_users,id_commission){const{rows}=await this.repository.manageCommission(id_users,iud_1.IUDOperation.DELETE,id_commission,0,"","");return rows[0]?.sms||""}}},2826:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.MyUniversityController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),my_schema_1=__webpack_require__(3929),my_service_1=__webpack_require__(8643);exports.MyUniversityController=class{constructor(){this.service=new my_service_1.MyUniversityService,this.getMyUniversity=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const result=await this.service.getMyUniversity(id_users);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ error MyUniversityController getMyUniversity: ",error.message),next(error)}},this.updateMyUniversity=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(my_schema_1.myUniversityUpdateSchema,req.body);if(!isValid)return(0,response_1.sendError)(res,req.t("inValidFormat"));return await this.service.updateMyUniversity(id_users,data)?(0,response_1.sendSuccess)(res,req.t("successUpdate")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return console.error("❌ error MyUniversityController updateMyUniversity: ",error.message),next(error)}},this.getUniversityUsers=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const language=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getUniversityUsers(id_users,language);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ error UniversityUsersController getUniversityUsers: ",error.message),next(error)}},this.createUniversityUser=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(my_schema_1.universityUserCreateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));let photo=req.files?.photo;if(Array.isArray(photo)&&(photo=photo[0]),photo&&!photo.mimetype.startsWith("image/"))return(0,response_1.sendError)(res,req.t("uploadImage"));const result=await this.service.createUniversityUser(id_users,data,photo);return"INSERT"===result?(0,response_1.sendSuccess)(res,req.t("successAdd")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):"Отказ"===result?(0,response_1.sendError)(res,req.t("token.permission"),!1,403):(0,response_1.sendError)(res,req.t("errorCreate"))}catch(error){next(error)}},this.updateUniversityUser=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_users_university=(0,helpers_1.toNumber)(req.params.id_users_university);if(!id_users_university)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(my_schema_1.universityUserUpdateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));let photo=req.files?.photo;if(Array.isArray(photo)&&(photo=photo[0]),photo&&!photo.mimetype.startsWith("image/"))return(0,response_1.sendError)(res,req.t("uploadImage"));const result=await this.service.updateUniversityUser(id_users,id_users_university,data,photo);return"UPDATE"===result?(0,response_1.sendSuccess)(res,req.t("successUpdate")):"Отказ"===result?(0,response_1.sendError)(res,req.t("token.permission"),!1,403):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){next(error)}},this.deleteUniversityUser=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_users_university=(0,helpers_1.toNumber)(req.params.id_users_university);if(!id_users_university)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await this.service.deleteUniversityUser(id_users,id_users_university);return"DELETE"===result?(0,response_1.sendSuccess)(res,req.t("successDelete")):"Отказ"===result?(0,response_1.sendError)(res,req.t("token.permission"),!1,403):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){next(error)}},this.updateUniversityUserAccess=async(req,res,next)=>{try{const{isValid,data}=(0,validation_1.validate)(my_schema_1.universityUserAccessSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"SUCCESS"===(await this.service.updateUniversityUserAccess(data)).sms?(0,response_1.sendSuccess)(res,req.t("successUpdate")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){next(error)}},this.createUniversityUserDocument=async(req,res,next)=>{try{const{isValid,data}=(0,validation_1.validate)(my_schema_1.universityUserDocumentCreateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"INSERT"===await this.service.createUniversityUserDocument(data)?(0,response_1.sendSuccess)(res,req.t("createSuccess")):(0,response_1.sendError)(res,req.t("errorCreate"))}catch(error){next(error)}},this.updateUniversityUserDocument=async(req,res,next)=>{try{const{isValid,data}=(0,validation_1.validate)(my_schema_1.universityUserDocumentUpdateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"UPDATE"===await this.service.updateUniversityUserDocument(data)?(0,response_1.sendSuccess)(res,req.t("updateSuccess")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){next(error)}}}}},2850:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const my_route_1=__importDefault(__webpack_require__(4649));exports.default=my_route_1.default},2886:module=>{module.exports=require("rate-limit-redis")},2931:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.commissionUpdateSchema=exports.commissionCreateSchema=void 0;const zod_1=__webpack_require__(1569);exports.commissionCreateSchema=zod_1.z.object({id_commission_position:zod_1.z.number().int().positive(),fio:zod_1.z.string().min(1).max(255),fio_en:zod_1.z.string().min(1).max(255)}),exports.commissionUpdateSchema=zod_1.z.object({id_commission_position:zod_1.z.number().int().positive(),fio:zod_1.z.string().min(1).max(255),fio_en:zod_1.z.string().min(1).max(255)})},2955:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.SharedController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),shared_service_1=__webpack_require__(3852);exports.SharedController=class{constructor(){this.service=new shared_service_1.SharedService,this.genderList=async(req,res,next)=>{try{const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAllGender(id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.allCountriesList=async(req,res,next)=>{try{const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAllCountries(id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.regionList=async(req,res,next)=>{try{const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getRegionIsVisible(id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.universityList=async(req,res,next)=>{try{const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAllUniversities(id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.specialtyList=async(req,res,next)=>{try{const id_university=(0,helpers_1.toNumber)(req.params.id_university);if(!id_university)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getFacultyDirectionByIdUniversity({id_lang,id_university});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.contactsList=async(req,res,next)=>{try{const id_faculty=Number(req.params.id_faculty);if(!id_faculty||Number.isNaN(id_faculty))return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getContactByIdFaculty({id_lang,id_faculty});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.educationDocList=async(req,res,next)=>{try{const result=await this.service.getEducationDocument();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.learningList=async(req,res,next)=>{try{const result=await this.service.getAllLearning();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.proffessionList=async(req,res,next)=>{try{const result=await this.service.getAllProfession();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.educationLanguagesList=async(req,res,next)=>{try{const result=await this.service.getAllEducationLanguages();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.controlTypesList=async(req,res,next)=>{try{const result=await this.service.getAllControlTypes();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.commissionPositionsList=async(req,res,next)=>{try{const result=await this.service.getAllCommissionPositions();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.wsList=async(req,res,next)=>{try{const result=await this.service.getAllWs();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.bkList=async(req,res,next)=>{try{const result=await this.service.getAllBk();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.yearsList=async(req,res,next)=>{try{const result=await this.service.getAllYears();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.statusMonList=async(req,res,next)=>{try{const result=await this.service.getAllStatusMon();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.educationDirectionList=async(req,res,next)=>{try{const result=await this.service.getAllEducationDirection(!0);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}}}}},3044:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),swagger_ui_express_1=__importDefault(__webpack_require__(2320)),swagger_1=__webpack_require__(7573),router=(0,express_1.Router)();router.use("/api-docs",(_req,res,next)=>{res.setHeader("Cache-Control","no-store, no-cache, must-revalidate, proxy-revalidate"),res.setHeader("Pragma","no-cache"),res.setHeader("Expires","0"),res.setHeader("Surrogate-Control","no-store"),next()},swagger_ui_express_1.default.serve,swagger_ui_express_1.default.setup(swagger_1.swaggerSpec,{explorer:!0,customCss:".swagger-ui .topbar { display: none }",customSiteTitle:"Edugate App API Documentation",customfavIcon:"/favicon.ico",swaggerOptions:{persistAuthorization:!0,displayRequestDuration:!0,filter:!0,tryItOutEnabled:!0,parameters:{lang:"ru"}}})),exports.default=router},3087:module=>{module.exports=JSON.parse('{"success":"Ийгиликтүү","inValidFormat":"Маалыматтарды туура толтуруңуз","hasRelations":"Өчүрүү мүмкүн эмес: байланышкан маалыматтар бар","error":{"unknown":"Белгисиз ката болду","internal_server":"Сервердин ички катасы","dbConnection":"Маалымат базасына туташууда ката кетти","validation":"Туура эмес маалымат киргизилди","notFound":"Суралган ресурс табылган жок","tooManyRequests":"Өтө көп сурамдар. Кийинчерээк кайталап көрүңүз","tooManyLoginAttempts":"Өтө көп киргизүү аракеттери. 15 мүнөттөн кийин кайталап көрүңүз","tooManyUploads":"Өтө көп файлдарды жүктөө. Кийинчерээк кайталап көрүңүз"},"token":{"token_required":"Токен берилген жок","permission":"Маалыматты алууга уруксатыңыз жок","invalid":"Токен жараксыз","notFound":"Токен табылган жок","expired":"Токендин жарактуулук мөөнөтү бүткөн","generateError":"Токен түзүүдө ката кетти","invalid_token":"Токен туура эмес","permission_denied":"Бул иш-аракетке укугуңуз жок","unknown_error":"Токенди текшерүүдө белгисиз ката кетти"},"auth":{"Required":"Логинди жана сырсөздү киргизиңиз","login_required":"Логинди киргизиңиз","password_required":"Сырсөздү киргизиңиз","role_required":"Системага киргиңиз келген ролду тандаңыз","role_invalid":"Жараксыз роль, жараксыз маанилер","invalid_credentials":"Логин же сырсөз туура эмес","loginFailed":"Кирүү ишке ашкан жок"},"logout":{"success":"Сиз системадан ийгиликтүү чыктыңыз","failed":"Системадан чыгууга мүмкүн болгон жок"},"register":{"Required":"Сураныч, керектүү талааларды толтуруңуз","consent_required":"Колдонуучу келишиминин шарттарына макул экениңизди тастыкташыңыз керек","consent_invalid":"Макулдук мааниси туура эмес","token_required":"reCAPTCHA текшерүүсү талап кылынат","token_invalid":"reCAPTCHA токени жараксыз","token_captcha_invalid":"reCAPTCHA текшерүүсүнөн өтпөдү. Кайра аракет кылыңыз","surname_required":"Сураныч, фамилияңызды киргизиңиз","names_required":"Сураныч, атыңызды киргизиңиз","patronymic_invalid":"Ата-энеңиздин аты туура эмес форматта","birth_date_required":"Сураныч, туулган күнүңүздү киргизиңиз","birth_date_invalid":"Туулган күнү туура эмес форматта","birth_date_format":"Туулган күнү ЖЖЖЖ-АА-КК форматында болушу керек","id_gender_required":"Сураныч, жынысты тандаңыз","id_gender_invalid":"Жыныс туура эмес форматта","passport_required":"Сураныч, паспорт номерин киргизиңиз","passport_invalid":"Паспорт туура эмес форматта","passport_date_required":"Сураныч, паспорт берилген күндү киргизиңиз","passport_date_invalid":"Паспорт берилген күн туура эмес форматта","passport_date_format":"Паспорт берилген күнү ЖЖЖЖ-АА-КК форматында болушу керек","id_country_required":"Сураныч, өлкөнү тандаңыз","id_country_invalid":"Өлкө туура эмес форматта","email_required":"Сураныч, электрондук почтаны киргизиңиз","email_invalid":"Электрондук почта туура эмес форматта","code_required":"Сураныч, тастыктоочу кодду киргизиңиз","code_invalid":"Код туура эмес форматта","code_length":"Код 6 цифрдан турушу керек","password_required":"Сураныч, сырсөзүңүздү киргизиңиз","password_invalid":"Сырсөз туура эмес форматта","password_minLength":"Сырсөз жок дегенде 6 символ болуусу керек","password_maxLength":"Сырсөз аябай эле узун","repeat_password_required":"Сураныч, кайталанган сырсөзүңүздү киргизиңиз","repeat_password_invalid":"Кайталанган сырсөз туура эмес форматта","repeat_password_minLength":"Кайталанган сырсөз жок дегенде 6 символ болуусу керек","repeat_password_maxLength":"Кайталанган сырсөз аябай эле узун","telephone_required":"Сураныч, телефон номерин киргизиңиз","telephone_invalid":"Телефон номер туура эмес форматта","photo_invalid":"Файл сүрөт болушу керек","already_registered":"Сиз буга чейин катталгансыз","passport_duplicate":"Бул паспорту менен колдонуучу мурунтан эле катталган","email_duplicate":"Бул email менен колдонуучу мурунтан эле катталган","save_error":"Маалыматтар сакталбады","unknown_error":"Белгисиз ката","success":"Сиз ийгиликтүү катталдыңыз","password_sent":"Сырсөз сиздин почтаңызга жөнөтүлдү"},"email":{"Required":"Сураныч, керектүү талааларды толтуруңуз","email_required":"Сураныч, электрондук почтаңызды киргизиңиз","email_invalid":"Электрондук почта туура эмес форматта","isExistEmailCode":"Бул электрондук почтага буга чейин код жөнөтүлгөн","success_send":"Тастыктоо коду ийгиликтүү жөнөтүлдү","error_send":"Код жөнөтүүдө ката кетти, кайрадан аракет кылыңыз","error":"Суроону иштетүүдө ката кетти","already_exist":"Бул email менен колдонуучу мурунтан бар"},"password":{"change":{"success":"Сыр сөз ийгиликтүү өзгөртүлдү","wrongOld":"Учурдагы сыр сөз туура эмес","failed":"Сыр сөздү өзгөртүү мүмкүн болгон жок. Кийин кайра аракет кылыңыз"}},"application":{"success":"Өтүнмө ийгиликтүү жөнөтүлдү","alreadyRegistered":"Сиз буга чейин өтүнмө жөнөткөнсүз","canceled":"Өтүнмө ийгиликтүү жокко чыгарылды","invalidFormat":"Маалыматтын форматы туура эмес","unknownError":"Белгисиз ката кетти"},"settings":{"notFound":"Системанын параметрлери табылган жок же конфигурацияланбаган"},"plan":{"notFound":"Тандалган адистик үчүн кабыл алуу планы табылган жок"},"specialty":{"notDelete":"Өчүрүү мүмкүн эмес, абитуриент бар"},"admissionPlan":{"exceeded":"Жалпы пландан ашып кеткендиктен планды кошууга, өзгөртүүгө мүмкүн болгон жок"},"notDelete":"Өчүрүү мүмкүн эмес, маалыматтар бар","notFound":"Маалымат табылган жок","invalidEmailCode":"Код жараксыз. Сураныч, электрондук почта аркылуу кодду сураңыз","noValidEmail":"Электрондук дарек туура эмес!","codeConfirmSuccess":"Ырастоо коду сиздин электрондук почтаңызга жөнөтүлдү!","isExistEmailCode":"Код мурун эле электрондук почтаңызга жөнөтүлгөн!","errorGenerateCode":"Кодду түзүүдө ката кетти!","errorSendEmail":"Электрондук почта аркылуу жөнөтүүдө ката кетти!","errorVerifyCaptcha":"Сиз captcha текшерүүсүнөн өткөн жоксуз!","errorExistRecover":"Сырсөздү калыбына келтирүү шилтемеси мурунтан эле колдонулган!","successSave":"Маалыматтар ийгиликтүү сакталды","errorSave":"Маалыматтарды сактоодо ката кетти","successAdd":"Маалыматтар ийгиликтүү кошулду","errorAdd":"Маалыматтарды кошууда ката кетти","successUpdate":"Маалыматтар ийгиликтүү өзгөртүлдү","errorUpdate":"Маалыматтарды өзгөртүүдө ката кетти","errorDelete":"Маалыматтарды өчүрүүдө ката кетти","successDelete":"Маалыматтар ийгиликтүү өчүрүлдү","errorDateValid":"Датасы туура эмес!","errorGet":"Маалыматтарды алууда ката кетти!","errorEmailUserNotFound":"Көрсөтүлгөн электрондук почтасы бар колдонуучу табылган жок!","errorUserId":"Колдонуучу табылган жок!","isTooShort":"Жаңы сырсөз кыска. Сураныч, кеминде 6 белги киргизиңиз!","passDoesNotMatch":"Жаңы сырсөздөр дал келбейт!","changePassword":"Сырсөз ийгиликтүү өзгөртүлдү!","sendLinkSuccess":"Сырсөздү калыбына келтирүү нускамалары электрондук почтаңызга жөнөтүлдү!","isExistEmailLink":"Шилтеме мурун эле жөнөтүлгөн!","emailInCorrect":"Элетрондук почтаңызды туура киргизиңиз!","pinExistError":"Мындай ИЖН(ПИН) менен колдонуучу табылган жок!","yourEmail":"Сиздин почта","errorStartYear":"Башталгыч жыл туура эмес!","errorIdEducation":"Билим деңгээлин тандаңыз!","errorIdFormEducation":"Окуу формасын тандаңыз!","errorOnlyPdfFile":"PDF файл гана жүктөңүз!","errorFileAdd":"Файлды сактоодо ката кетти!","errorExistFile":"Файл табылган жок!","errorMaxFilesExceeded":"{{maxFiles}} файлдан ашык эмес жүктөңүз!","errorDataPassportInCorrect":"Паспортуңуздун маалыматтарын туура киргизиңиз!","errorExistSeries":"Бул паспорттун сериясы табылган жок!","errorPinInCorrect":"ИЖН(ПИН)ди туура киргизиңиз!","existUserLang":"Сизде бул тил тандалган","existUserKeySkill":"Сизде бул жөндөм тандалган!","errorYear":"Жылды туура киргизиңиз!","errorSelectOrg":"Уюмду жазыңыз!","existUserMilitary":"Сизде аскердик каттоо бар!","olympiad":{"nameInCorrect":"Атын туура жазыңыз!","surnameInCorrect":"Фамилиясын туура жазыңыз!","patronymicInCorrect":"Атасынын атын туура жазыңыз!"},"emplyee":{"nameInCorrect":"Атын туура жазыңыз!","surnameInCorrect":"Фамилиясын туура жазыңыз!","patronymicInCorrect":"Атасынын атын туура жазыңыз!"},"upload_xml":"XML файл жүктөңүз!","uploadCurrectXml":"Туура XML файлды жүктөңүз!","inValidPin":"Туура эмес ИЖН(ПИН)!","laptopDuplicate":"Ноутбук эбак эле алган!","updateEmail":{"pinError":"ИЖН(PIN) туура эмес!","userNotFound":"Бул кол табылган жок!","userNotRegister":"Мындай ИЖН(PIN) менен колдонуучу катталган эмес!","surnameCorrect":"Фамилияңызды туура жазыңыз!","nameCorrect":"Атыңызды туура жазыңыз!","patronymicCorrect":"Атаңыздын атын туура жазыңыз!","patronymicRequired":"Атаңыздын атын жазыңыз!","birthDayCorrect":"Туулган күнүңүздү туура көрсөтүңүз!","emailSame":"Жаңы электрондук почта азыркыга дал келбеши керек!","success":"Сиздин электрондук почтаңыз ийгиликтүү алмашылды"},"accessDenied":"Кирүү четке кагылды!","esi":{"invalidRequest":"Кирүү үчүн керектүү маалыматтар жетишсиз. Маалыматтарды толуктап, кайра аракет жасап көрүңүз.","authFailedState":"Сессиянын мөөнөтү бүттү же шилтеме жараксыз. Кайра кирүүгө аракет кылыңыз.","tokenFailed":"Системага кирүү мүмкүн болгон жок. Сураныч, кийинчерээк кайра аракет кылыңыз.","userNotFound":"Сиз катталган эмессиз. Сураныч, \\"Мугалим\\" системасына катталыңыз.","tryError":"Кирүү учурунда ката кетти! Кайрадан аракет кылып көрүңүз!"},"userNotRegister":"Мындай ИЖН(ПИН) менен колдонуучу катталган эмес!","existHeadOrganization":"Дайындалып жаткан талапкер башка уюмда жетекчилик кызматты ээлейт!","existHeadOldOrganization":"Уюмдун жетекчиси (анын ичинде убактылуу же милдетин аткаруучу) дайындалган. Сураныч, адегенде анын кызматтан кетишин аткарыңыз!","passport":{"successSave":"Маалыматтар ийгиликтүү сакталды","errorSave":"Маалыматтарды сактоодо ката кетти!","notFoundWithPin":"Мындай ИЖН(ПИН) {{pin}} менен паспорт табылган","notFound":"Паспорт табылган жок","serviceUnavailable":"Паспортту текшерүү кызматы убактылуу иштебейт. Кийинчерээк кайра аракет кылыңыз","unknownError":"Белгисиз ката кетти. Кийинчерээк аракет кылыңыз"},"errorSaveFile":"Файлды сактоодо ката кетти","uploadFile":"Файл жүктөңүз","uploadImage":"Сүрөт жүктөңүз","errorTestDelete":"Тестти өчүрүү мүмкүн эмес, себеби бул тестке өтүнмөлөр бар","tour":{"notAdd":"ТМындай тур буга чейин эле бар","notDelete":"Өчүрүү мүмкүн эмес, байланыш бар"},"avatar":{"notFound":"Аватар табылган жок"},"document":{"notFound":"Документ табылган жок"},"university":{"not_found":"Университет табылган жок же колдонуучу университетке байланган эмес","duplicate":"Мындай аталыштагы университет мурунтан эле бар"},"abiturient":{"duplicate":"Мындай паспорт же email менен абитуриент мурунтан эле бар"},"faculty":{"duplicate":"Мындай аталыштагы факультет мурунтан эле бар","errorAdd":"Факультетти кошууда ката","errorUpdate":"Факультетти жаңыртууда ката","errorDelete":"Факультетти өчүрүүдө ката","operationDenied":"Операциядан баш тартуу","cannotDeleteLinked":"Факультетти өчүрүү мүмкүн эмес, байланыштуу жазуулар бар","noResponse":"Маалымат базасынан жооп жок"},"direction":{"not_found":"Багыттар табылган жок","duplicate":"Мындай шифрдеги багыт мурунтан эле бар","errorAdd":"Багытты кошууда ката","errorUpdate":"Багытты жаңыртууда ката","errorDelete":"Багытты өчүрүүдө ката","operationDenied":"Операциядан баш тартуу","cannotDeleteLinked":"Багытты өчүрүү мүмкүн эмес, байланыштуу жазуулар бар"},"country":{"not_found":"Өлкө табылган жок","duplicate":"Мындай аталыштагы өлкө мурунтан эле бар"},"noFileUploaded":"Файл жүктөлгөн жок","successUpload":"Ийгиликтүү жүктөлдү","errorUpload":"Жүктөөдө ката чыкты","cache":{"key_not_found":"Кэште ачкыч табылган жок","deleted":"Ачкыч кэштен өчүрүлдү","pattern_deleted":"Ачкычтар үлгү боюнча өчүрүлдү","flushed":"Бардык кэш тазаланды"}}')},3130:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),settings_controller_1=__webpack_require__(2419),router=(0,express_1.Router)(),ctrl=new settings_controller_1.SettingsController;
/**
 * @swagger
 * /api/settings/upload-avatar:
 *   post:
 *     tags:
 *       - Settings
 *     summary: Загрузить аватар пользователя
 *     description: Загружает файл аватара для авторизованного пользователя. Файл должен быть в поле `avatar` и иметь MIME-типы image/*.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Файл изображения (image/*)
 *           encoding:
 *             avatar:
 *               contentType: image/*
 *     responses:
 *       200:
 *         description: Аватар успешно сохранён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "successSave"
 *                 data:
 *                   type: boolean
 *                   example: true
 */
router.post("/upload-avatar",authorize_1.isNotEmpToken,ctrl.photoUpload),
/**
 * @swagger
 * /api/settings/change-password:
 *   post:
 *     tags:
 *       - Settings
 *     summary: Сменить пароль пользователя
 *     description: Изменяет пароль авторизованного пользователя. Требуется передать текущий (`old_password`) и новый пароль (`new_password`).
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - old_password
 *               - new_password
 *             properties:
 *               old_password:
 *                 type: string
 *                 description: Текущий пароль пользователя
 *                 example: "OldPassword123!"
 *               new_password:
 *                 type: string
 *                 description: Новый пароль (рекомендуется минимум 8 символов)
 *                 example: "NewPassword456!"
 *     responses:
 *       200:
 *         description: Пароль успешно изменён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "password.change.success"
 *                 data:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Неверный формат данных (валидация)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "inValidFormat"
 *                 data:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Отсутствует или просрочен токен авторизации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "token.expired"
 *                 data:
 *                   type: boolean
 *                   example: false
 *       422:
 *         description: Текущий (старый) пароль неверен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "password.change.oldWrong"
 *                 data:
 *                   type: boolean
 *                   example: false
 */
router.post("/change-password",authorize_1.isNotEmpToken,ctrl.changePassword),
/**
 * @swagger
 * /api/settings/change-email:
 *   post:
 *     tags:
 *       - Settings
 *     summary: Изменить email абитуриента
 *     description: Позволяет авторизованному абитуриенту изменить свой email. Требуется передать новый email и код подтверждения.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Новый email пользователя
 *                 example: "newemail@example.com"
 *               code:
 *                 type: string
 *                 description: Код подтверждения email
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Email успешно изменён
 *       400:
 *         description: Неверный формат данных (валидация)
 *       401:
 *         description: Отсутствует или просрочен токен авторизации
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post("/change-email",authorize_1.isAbitToken,ctrl.changeEmail),
/**
 * @swagger
 * /api/settings/all-list:
 *  get:
 *    tags:
 *      - Settings
 *    summary: Получить все настройки системы
 *    description: Возвращает список всех настроек системы из таблицы настроек.
 *    parameters:
 *      - $ref: '#/components/parameters/langParam'
 *    responses:
 *      200:
 *        description: Список настроек успешно получен
 */
router.get("/all-list",ctrl.setGetAllSettings),router.get("/avatar/:file_name",ctrl.getAvatar),exports.default=router},3156:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.SettingsService=void 0;const env_1=__webpack_require__(6138),FileService_1=__importDefault(__webpack_require__(5946)),crypto_1=__webpack_require__(9095),file_1=__importDefault(__webpack_require__(5560)),settings_repository_1=__webpack_require__(8231),FILE_AVATAR_PATH=env_1.ENV.FILE_AVATAR_PATH;exports.SettingsService=class{constructor(){this.repository=new settings_repository_1.SettingsRepository}async updatePhotoAvatar(data){try{const{rows}=await this.repository.updateAvatar(data),result_message=rows[0].sms||"NO_RESPONSE";return"INSERT"===result_message||"UPDATE"===result_message}catch(error){return console.error("❌ SettingsService.updatePhotoAvatar error:",error.message),!1}}async getAvatarByIdAndRole(authState){const{rows}=await this.repository.findAvatarByIdAndRole({id:authState.id,id_role:authState.role});return rows[0]?.photo??null}async updateUserPassword(authState,data){try{const old_hash_password=(0,crypto_1.md5)(data.old_password),new_hash_password=(0,crypto_1.md5)(data.new_password),{rows}=await this.repository.setNewPassword({id_users:authState.id,id_role:authState.role,old_hash_password,new_hash_password});return rows[0]?.sms||"NO_RESPONSE"}catch(error){throw console.error("❌ SettingsService.updateUserPassword error:",error.message),error}}async saveUploadAvatar(fileName,fileData){const filePath=`${FILE_AVATAR_PATH}/${fileName}`;return await FileService_1.default.saveImage(filePath,fileData)}async deleteUploadAvatar(fileName){const filePath=`${FILE_AVATAR_PATH}/${fileName}`;return await FileService_1.default.removeFile(filePath)}async savePhotoAvatar(authState,avatar){try{const{id,role}=authState,oldFileName=await this.getAvatarByIdAndRole(authState),ext="png",fileName=`${id}_${(0,crypto_1.md5)(avatar.name)}_${Date.now()}.${ext}`;if(await this.saveUploadAvatar(fileName,avatar.data)){const isSaveDB=await this.updatePhotoAvatar({id,id_role:role,fileName});return setImmediate(async()=>{isSaveDB?oldFileName&&await this.deleteUploadAvatar(oldFileName):await this.deleteUploadAvatar(fileName)}),isSaveDB}return!1}catch(error){return console.error("❌ SettingsService.savePhotoAvatar error:",error.message),!1}}async getAvatarStream(fileName){const filePath=`${FILE_AVATAR_PATH}/${fileName}`;return await file_1.default.exists(filePath)?filePath:null}async updateAbiturientEmail(data){const{command}=await this.repository.updateAbiturientEmail(data);return"UPDATE"===command}async getAllSettings(){const{rows}=await this.repository.findAllSettings();return rows}}},3245:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.TourController=void 0;const response_1=__webpack_require__(8369),service=new(__webpack_require__(1546).TourService);exports.TourController=class{constructor(){this.checkTour=async(req,res)=>{try{const result=await service.checkTour();return result?(0,response_1.sendSuccess)(res,req.t("success"),result):(0,response_1.sendError)(res,req.t("notFound"),!1,404)}catch(error){return console.error("❌ TourController.checkTour error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}}}}},3346:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateUniversitySchema=exports.createUniversitySchema=void 0;const zod_1=__webpack_require__(1569);exports.createUniversitySchema=zod_1.z.object({university_name:zod_1.z.string().min(1),university_name_en:zod_1.z.string().min(1),id_region:zod_1.z.number().int(),winter_visible:zod_1.z.boolean()}),exports.updateUniversitySchema=zod_1.z.object({university_name:zod_1.z.string().min(1),university_name_en:zod_1.z.string().min(1),id_region:zod_1.z.number().int(),winter_visible:zod_1.z.boolean()})},3359:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.EmailRepository=void 0;const db_1=__webpack_require__(6067);exports.EmailRepository=class{constructor(){this.findEmailVerification=async data=>{try{const{email,code,minutes}=data,sql="SELECT es.id_email_verification FROM email_verification es WHERE es.email = $1 AND es.active = TRUE AND es.code = $2 AND es.create_date >= CURRENT_TIMESTAMP - INTERVAL '1 minutes' * $3 LIMIT 1;",values=[email,code,minutes],{rows,rowCount}=await(0,db_1.dbQuery)(sql,values);if(rowCount){const{id_email_verification}=rows[0];return{id_email_verification}}return null}catch(error){throw console.error("❌ error EmailRepository findEmailVerification: ",error.message),error}},this.updateEmailVerification=async id_email_verification=>{const values=[id_email_verification];return await(0,db_1.dbQuery)("UPDATE email_verification SET active = FALSE, update_date = CURRENT_TIMESTAMP WHERE id_email_verification = $1 RETURNING id_email_verification;",values)},this.insertEmailVerification=async data=>{const values=[data.email,data.id_status,data.code];return await(0,db_1.dbQuery)("INSERT INTO email_verification (email, id_status, code) VALUES ($1, $2, $3) RETURNING email, id_status;",values)},this.existEmailVerification=async data=>{const values=[data.email,data.minutes];return await(0,db_1.dbQuery)("SELECT EXISTS(SELECT 1 FROM email_verification es WHERE es.email = $1 AND es.active = TRUE AND es.create_date >= CURRENT_TIMESTAMP - INTERVAL '1 minutes' * $2);",values)},this.insertRecoverPasswordEmail=async email=>{try{const query="INSERT INTO recover_password_email (email) VALUES($1) RETURNING id_recover_password_email;",{rows}=await(0,db_1.dbQuery)(query,[email]),{id_recover_password_email}=rows[0];return{id_recover_password_email}}catch(error){throw console.error("❌ error EmailRepository insertRecoverPasswordEmail: ",error.message),error}},this.existRecoverPasswordEmail=async data=>{const values=[data.email,data.minutes],{rows}=await(0,db_1.dbQuery)("SELECT EXISTS(SELECT 1 FROM recover_password_email rpe WHERE rpe.email = $1 AND rpe.active = TRUE AND rpe.create_date >= timezone('Asia/Bishkek'::text, now()) - INTERVAL '1 minutes' * $2);",values);if(rows.length>0){const{exists}=rows[0];return exists}return!1},this.existRecoverPassEmailById=async data=>{const{rows}=await(0,db_1.dbQuery)("SELECT EXISTS(SELECT 1 FROM recover_password_email rpe WHERE rpe.id_recover_password_email = $1 AND rpe.email = $2 AND rpe.active = TRUE);",[data.id,data.email]);if(rows.length>0){const{exists}=rows[0];return exists}return!1},this.updateRecoverPasswordEmail=async data=>{const fields=[],values=[],{id_recover_password_email,active,id_status}=data;if(void 0!==id_status&&(fields.push("id_status = $"+(values.length+1)),values.push(id_status)),void 0!==active&&(fields.push("active = $"+(values.length+1)),values.push(active)),0===fields.length)return!1;fields.push("update_date = timezone('Asia/Bishkek'::text, now())"),values.push(id_recover_password_email);const query=`UPDATE recover_password_email SET ${fields.join(", ")} WHERE id_recover_password_email = $${values.length};`,{command}=await(0,db_1.dbQuery)(query,values);return"UPDATE"===command}}}},3428:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.getEmailSubject=exports.getRegistrationCredentialsEmailContent=exports.getPasswordResetEmailContent=exports.getVerificationEmailContent=void 0;const getEmailLayout=(content,lang=2)=>{const isRussian=1===lang;return`\n<!DOCTYPE html>\n<html lang="${isRussian?"ru":3===lang?"ky":"en"}">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <title>EduGate</title>\n</head>\n<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fa;">\n  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f7fa; padding: 30px 15px;">\n    <tr>\n      <td align="center">\n        \x3c!-- Main Container --\x3e\n        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">\n\n          \x3c!-- Header with gradient --\x3e\n          <tr>\n            <td style="background: linear-gradient(135deg, #0066cc 0%, #0099ff 100%); padding: 30px 25px; text-align: center;">\n              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">\n                EduGate\n              </h1>\n              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">\n                ${isRussian?"Портал абитуриентов Кыргызстана":3===lang?"Кыргызстандын абитуриенттер порталы":"Kyrgyzstan Applicant Portal"}\n              </p>\n            </td>\n          </tr>\n\n          \x3c!-- Content --\x3e\n          <tr>\n            <td style="padding: 30px 25px;">\n              ${content}\n            </td>\n          </tr>\n\n          \x3c!-- Footer --\x3e\n          <tr>\n            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">\n              <p style="margin: 0 0 8px 0; font-size: 12px; color: #6c757d; line-height: 1.5;">\n                ${isRussian?"Министерство науки, высшего образования и инноваций Кыргызской Республики":3===lang?"Кыргыз Республикасынын Илим, жогорку билим берүү жана инновациялар министрлиги":"Ministry of Science, Higher Education and Innovations of the Kyrgyz Republic"}\n              </p>\n              <p style="margin: 0; font-size: 11px; color: #adb5bd;">\n                © ${(new Date).getFullYear()} EduGate. ${isRussian?"Все права защищены.":3===lang?"Бардык укуктар корголгон.":"All rights reserved."}\n              </p>\n            </td>\n          </tr>\n\n        </table>\n      </td>\n    </tr>\n  </table>\n</body>\n</html>\n  `.trim()};exports.getVerificationEmailContent=(code,lang=2)=>{const t={1:{greeting:"Здравствуйте!",welcome:"Добро пожаловать на портал абитуриентов!",intro:"На ваш адрес электронной почты был запрошен код подтверждения для регистрации на портале.",codeLabel:"Ваш код подтверждения:",instruction:"Введите этот код. Код действителен в течение 30 минут.",note:"Если вы не запрашивали этот код, просто проигнорируйте это письмо.",autoMessage:"Это автоматическое письмо, пожалуйста, не отвечайте на него.",goodLuck:"Желаем вам успехов в поступлении!"},3:{greeting:"Саламатсызбы!",welcome:"Абитуриенттер порталына кош келдиңиз!",intro:"Сиздин электрондук почтаңызга порталда катталуу үчүн тастыктоо коду суралды.",codeLabel:"Сиздин тастыктоо кодуңуз:",instruction:"Бул кодду киргизиңиз. Код 30 мүнөткө жарактуу.",note:"Эгер сиз бул кодду сураган эмессиз, бул катты четке кагыңыз.",autoMessage:"Бул автоматтык кат, аны жооп бербеңиз.",goodLuck:"Окууга кабыл алууда ийгилик каалайбыз!"},default:{greeting:"Hello!",welcome:"Welcome to the Applicant Portal!",intro:"A verification code has been requested for your email address to register on the portal.",codeLabel:"Your verification code:",instruction:"Enter this code. The code is valid for 30 minutes.",note:"If you didn't request this code, please ignore this email.",autoMessage:"This is an automated email, please do not reply.",goodLuck:"We wish you success with your application!"}}[1===lang?"1":3===lang?"3":"default"],content=`\n    <div style="color: #212529; font-size: 15px; line-height: 1.6;">\n      <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600; color: #495057;">\n        ${t.greeting}\n      </p>\n\n      <p style="margin: 0 0 8px 0;">\n        ${t.welcome}\n      </p>\n\n      <p style="margin: 0 0 12px 0; color: #6c757d;">\n        ${t.intro}\n      </p>\n\n      <p style="margin: 0 0 6px 0; font-weight: 600; color: #495057;">\n        ${t.codeLabel}\n      </p>\n\n      \x3c!-- Code Box --\x3e\n      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">\n        <tr>\n          <td align="center" style="padding: 10px 0;">\n            <div style="\n              display: inline-block;\n              background: linear-gradient(135deg, #0066cc 0%, #0099ff 100%);\n              padding: 15px 30px;\n              border-radius: 10px;\n              box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);\n            ">\n              <span style="\n                font-size: 32px;\n                font-weight: 700;\n                color: #ffffff;\n                letter-spacing: 8px;\n                font-family: 'Courier New', monospace;\n              ">${code}</span>\n            </div>\n          </td>\n        </tr>\n      </table>\n\n      <p style="margin: 0 0 12px 0; color: #6c757d; font-size: 14px;">\n        ${t.instruction}\n      </p>\n\n      \x3c!-- Info Box --\x3e\n      <div style="\n        background-color: #fff3cd;\n        border-left: 4px solid #ffc107;\n        padding: 12px;\n        margin: 15px 0;\n        border-radius: 4px;\n      ">\n        <p style="margin: 0; color: #856404; font-size: 14px;">\n          <strong>⚠️ ${1===lang?"Важно":3===lang?"Маанилүү":"Important"}:</strong> ${t.note}\n        </p>\n      </div>\n\n      <p style="margin: 0 0 8px 0; color: #6c757d; font-size: 13px;">\n        ${t.autoMessage}\n      </p>\n\n      <p style="margin: 0; color: #495057; font-size: 15px; font-weight: 500;">\n        ${t.goodLuck}\n      </p>\n    </div>\n  `;return getEmailLayout(content,lang)};exports.getPasswordResetEmailContent=(resetLink,lang=2)=>{const t={1:{greeting:"Здравствуйте!",title:"Запрос на восстановление пароля",intro:"Вы получили это письмо, потому что был запрос на сброс пароля для вашей учетной записи.",instruction:"Для сброса пароля нажмите на кнопку ниже:",buttonText:"Сбросить пароль",alternative:"Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:",expiryNote:"Эта ссылка действительна в течение 1 часа.",securityNote:"Если вы не запрашивали сброс пароля, проигнорируйте это письмо, и ваш пароль останется неизменным.",tip:"Для безопасности вашей учетной записи никогда не делитесь этой ссылкой с другими людьми."},3:{greeting:"Саламатсызбы!",title:"Сырсөздү калыбына келтирүү суранычы",intro:"Сиз бул катты алдыңыз, анткени сиздин аккаунтуңуз үчүн сырсөздү калыбына келтирүү суранычы болгон.",instruction:"Сырсөздү калыбына келтирүү үчүн төмөнкү баскычты басыңыз:",buttonText:"Сырсөздү калыбына келтирүү",alternative:"Эгер баскыч иштебесе, бул шилтемени көчүрүп, браузерге чаптаңыз:",expiryNote:"Бул шилтеме 1 саат бою жарактуу.",securityNote:"Эгер сиз сырсөздү калыбына келтирүүнү суранган жоксуз, бул катты этибарга албаңыз, сиздин сырсөзүңүз өзгөрүлбөйт.",tip:"Аккаунтуңуздун коопсуздугу үчүн бул шилтемени эч кимге бербеңиз."},default:{greeting:"Hello!",title:"Password Reset Request",intro:"You received this email because a password reset was requested for your account.",instruction:"To reset your password, click the button below:",buttonText:"Reset Password",alternative:"If the button doesn't work, copy and paste this link into your browser:",expiryNote:"This link is valid for 1 hour.",securityNote:"If you didn't request a password reset, please ignore this email and your password will remain unchanged.",tip:"For the security of your account, never share this link with others."}}[1===lang?"1":3===lang?"3":"default"],content=`\n    <div style="color: #212529; font-size: 15px; line-height: 1.6;">\n      <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600; color: #495057;">\n        ${t.greeting}\n      </p>\n\n      <h2 style="margin: 0 0 10px 0; font-size: 22px; font-weight: 700; color: #212529;">\n        🔐 ${t.title}\n      </h2>\n\n      <p style="margin: 0 0 12px 0; color: #6c757d;">\n        ${t.intro}\n      </p>\n\n      <p style="margin: 0 0 10px 0; color: #495057;">\n        ${t.instruction}\n      </p>\n\n      \x3c!-- Button --\x3e\n      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">\n        <tr>\n          <td align="center" style="padding: 10px 0;">\n            <a href="${resetLink}" style="\n              display: inline-block;\n              background: linear-gradient(135deg, #0066cc 0%, #0099ff 100%);\n              color: #ffffff;\n              text-decoration: none;\n              padding: 12px 32px;\n              border-radius: 8px;\n              font-weight: 600;\n              font-size: 16px;\n              box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);\n              transition: transform 0.2s;\n            ">${t.buttonText}</a>\n          </td>\n        </tr>\n      </table>\n\n      <p style="margin: 10px 0 6px 0; color: #6c757d; font-size: 13px;">\n        ${t.alternative}\n      </p>\n\n      \x3c!-- Link Box --\x3e\n      <div style="\n        background-color: #f8f9fa;\n        padding: 12px;\n        border-radius: 6px;\n        border: 1px solid #dee2e6;\n        margin: 6px 0 12px 0;\n        word-break: break-all;\n      ">\n        <a href="${resetLink}" style="color: #0066cc; text-decoration: none; font-size: 13px;">${resetLink}</a>\n      </div>\n\n      <p style="margin: 0 0 12px 0; color: #dc3545; font-size: 14px;">\n        ⏰ ${t.expiryNote}\n      </p>\n\n      \x3c!-- Security Warning --\x3e\n      <div style="\n        background-color: #f8d7da;\n        border-left: 4px solid #dc3545;\n        padding: 12px;\n        margin: 15px 0;\n        border-radius: 4px;\n      ">\n        <p style="margin: 0 0 6px 0; color: #721c24; font-size: 14px; font-weight: 600;">\n          🔒 ${1===lang?"Безопасность":3===lang?"Коопсуздук":"Security"}\n        </p>\n        <p style="margin: 0; color: #721c24; font-size: 13px;">\n          ${t.securityNote}\n        </p>\n      </div>\n\n      <p style="margin: 0; color: #6c757d; font-size: 13px; font-style: italic;">\n        💡 ${t.tip}\n      </p>\n    </div>\n  `;return getEmailLayout(content,lang)};exports.getRegistrationCredentialsEmailContent=(email,password,lang=2)=>{const t={1:{greeting:"Здравствуйте!",title:"Регистрация успешно завершена",intro:"Вы успешно зарегистрировались на портале абитуриентов EduGate.",credentialsLabel:"Ваши учетные данные для входа:",loginLabel:"Логин (Email):",passwordLabel:"Пароль:",instruction:"Используйте эти данные для входа в систему.",changePasswordNote:"Рекомендуем сменить пароль после первого входа в личный кабинет.",securityNote:"Не передавайте свои учетные данные третьим лицам. Храните их в надежном месте.",goodLuck:"Желаем вам успехов в поступлении!"},3:{greeting:"Саламатсызбы!",title:"Каттоо ийгиликтүү аяктады",intro:"Сиз EduGate абитуриенттер порталына ийгиликтүү катталдыңыз.",credentialsLabel:"Кирүү үчүн маалыматтарыңыз:",loginLabel:"Логин (Email):",passwordLabel:"Сырсөз:",instruction:"Системага кирүү үчүн бул маалыматтарды колдонуңуз.",changePasswordNote:"Жеке кабинетке биринчи киргенден кийин сырсөздү алмаштырууну сунуштайбыз.",securityNote:"Өз маалыматтарыңызды башка адамдарга бербеңиз. Аларды коопсуз жерде сактаңыз.",goodLuck:"Окууга кабыл алууда ийгилик каалайбыз!"},default:{greeting:"Hello!",title:"Registration Completed Successfully",intro:"You have successfully registered on the EduGate applicant portal.",credentialsLabel:"Your login credentials:",loginLabel:"Login (Email):",passwordLabel:"Password:",instruction:"Use these credentials to log in to the system.",changePasswordNote:"We recommend changing your password after your first login.",securityNote:"Do not share your credentials with others. Keep them in a safe place.",goodLuck:"We wish you success with your application!"}}[1===lang?"1":3===lang?"3":"default"],content=`\n    <div style="color: #212529; font-size: 15px; line-height: 1.6;">\n      <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600; color: #495057;">\n        ${t.greeting}\n      </p>\n\n      <h2 style="margin: 0 0 10px 0; font-size: 22px; font-weight: 700; color: #28a745;">\n        ✅ ${t.title}\n      </h2>\n\n      <p style="margin: 0 0 12px 0; color: #6c757d;">\n        ${t.intro}\n      </p>\n\n      <p style="margin: 0 0 6px 0; font-weight: 600; color: #495057;">\n        ${t.credentialsLabel}\n      </p>\n\n      \x3c!-- Credentials Box --\x3e\n      <div style="\n        background-color: #f8f9fa;\n        padding: 20px;\n        border-radius: 8px;\n        border: 1px solid #dee2e6;\n        margin: 10px 0 15px 0;\n      ">\n        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">\n          <tr>\n            <td style="padding: 8px 0;">\n              <span style="color: #6c757d; font-size: 14px;">${t.loginLabel}</span><br>\n              <span style="font-size: 16px; font-weight: 600; color: #212529;">${email}</span>\n            </td>\n          </tr>\n          <tr>\n            <td style="padding: 8px 0; border-top: 1px solid #dee2e6;">\n              <span style="color: #6c757d; font-size: 14px;">${t.passwordLabel}</span><br>\n              <span style="\n                font-size: 18px;\n                font-weight: 700;\n                color: #0066cc;\n                font-family: 'Courier New', monospace;\n                letter-spacing: 2px;\n              ">${password}</span>\n            </td>\n          </tr>\n        </table>\n      </div>\n\n      <p style="margin: 0 0 12px 0; color: #495057;">\n        ${t.instruction}\n      </p>\n\n      \x3c!-- Warning Box --\x3e\n      <div style="\n        background-color: #fff3cd;\n        border-left: 4px solid #ffc107;\n        padding: 12px;\n        margin: 15px 0;\n        border-radius: 4px;\n      ">\n        <p style="margin: 0; color: #856404; font-size: 14px;">\n          <strong>⚠️ ${1===lang?"Важно":3===lang?"Маанилүү":"Important"}:</strong> ${t.changePasswordNote}\n        </p>\n      </div>\n\n      \x3c!-- Security Box --\x3e\n      <div style="\n        background-color: #f8d7da;\n        border-left: 4px solid #dc3545;\n        padding: 12px;\n        margin: 15px 0;\n        border-radius: 4px;\n      ">\n        <p style="margin: 0; color: #721c24; font-size: 14px;">\n          <strong>🔒 ${1===lang?"Безопасность":3===lang?"Коопсуздук":"Security"}:</strong> ${t.securityNote}\n        </p>\n      </div>\n\n      <p style="margin: 0; color: #495057; font-size: 15px; font-weight: 500;">\n        ${t.goodLuck}\n      </p>\n    </div>\n  `;return getEmailLayout(content,lang)};exports.getEmailSubject=(type,lang=2)=>({verification:{1:"Подтверждение адреса электронной почты - EduGate",3:"Электрондук почта дарегин ырастоо - EduGate",default:"Email Address Verification - EduGate"},"password-reset":{1:"Восстановление пароля - EduGate",3:"Сырсөздү калыбына келтирүү - EduGate",default:"Password Reset - EduGate"},"registration-credentials":{1:"Ваши учетные данные - EduGate",3:"Сиздин маалыматтарыңыз - EduGate",default:"Your Login Credentials - EduGate"}}[type][1===lang?"1":3===lang?"3":"default"])},3481:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.verifyToken=exports.signToken=void 0;const jsonwebtoken_1=__importDefault(__webpack_require__(829)),env_1=__webpack_require__(6138),crypto_1=__importDefault(__webpack_require__(9095));exports.signToken=data=>{const payload={data:crypto_1.default.encrypt(JSON.stringify(data))},options={expiresIn:env_1.ENV.JWT.EXPIRES_IN};return jsonwebtoken_1.default.sign(payload,env_1.ENV.JWT.SECRET,options)};exports.verifyToken=token=>{const decoded=jsonwebtoken_1.default.verify(token,env_1.ENV.JWT.SECRET);if(!decoded.data)throw new Error("Invalid token payload");return JSON.parse(crypto_1.default.decrypt(decoded.data))}},3501:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.AuthController=void 0;const email_service_1=__webpack_require__(1948),lang_1=__webpack_require__(7590),recaptcha_1=__webpack_require__(7141),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),auth_schema_1=__webpack_require__(4374),authService=new(__webpack_require__(6058).AuthService),emailService=new email_service_1.EmailService;exports.AuthController=class{constructor(){this.login=async(req,res,next)=>{try{const{isValid,data,issues}=(0,validation_1.validate)(auth_schema_1.loginSchema,req.body);if(!isValid){const msgKey=issues[0].message;return(0,response_1.sendError)(res,req.t(`auth.${msgKey}`||"inValidFormat"))}const authState=await authService.getUserByPinPassword(data);if(!authState)return(0,response_1.sendError)(res,req.t("auth.invalid_credentials"),!1,401);const result=await authService.userLogin(req,res,data.login,authState);return result?(0,response_1.sendSuccess)(res,req.t("success"),result):(0,response_1.sendError)(res,req.t("auth.loginFailed"))}catch(error){return console.error("❌ error AuthController login: ",error.message),next(error)}},this.checkToken=async(req,res)=>{try{const result=await authService.userCheck(req);return result?(0,response_1.sendSuccess)(res,req.t("success"),result):(0,response_1.sendError)(res,req.t("token.expired"),!1,401)}catch(error){return console.error("❌ error AuthController checkToken: ",error.message),(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401)}},this.authInfo=async(req,res)=>{try{const authState=req.user;if(!authState)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const baseUrl=`${req.protocol}://${req.get("host")}`,result=await authService.authInfo(authState,baseUrl);return result?(0,response_1.sendSuccess)(res,req.t("success"),result):(0,response_1.sendError)(res,req.t("token.expired"),!1,401)}catch(error){return console.error("❌ error AuthController checkToken: ",error.message),(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401)}},this.logout=async(req,res)=>{try{return await authService.userLogout(req,res)?(0,response_1.sendSuccess)(res,req.t("logout.success")):(0,response_1.sendError)(res,req.t("logout.failed"))}catch(error){return console.error("❌ error AuthController checkToken: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,401)}},this.register=async(req,res)=>{try{const{isValid,data,issues}=(0,validation_1.validate)(auth_schema_1.registerSchema,req.body);if(!isValid){const msgKey=issues[0].message;return(0,response_1.sendError)(res,req.t(`register.${msgKey}`))}let{code,email,consent,token}=data;if(email=email.toLocaleLowerCase(),!consent)return(0,response_1.sendError)(res,req.t("register.consent_required"));if(!await(0,recaptcha_1.verifyRecaptcha)(token))return(0,response_1.sendError)(res,req.t("register.token_captcha_invalid"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),emailVerifyData=await emailService.getEmailVerifyId(email,code);if(!emailVerifyData||!emailVerifyData.id_email_verification)return(0,response_1.sendError)(res,req.t("invalidEmailCode"));const{id_email_verification}=emailVerifyData,result=await authService.registerAbiturient({...data,email,id_lang});return"INSERT"===result.sms?(setImmediate(async()=>{try{await emailService.updateEmailVerification(id_email_verification),result.password&&await emailService.sendRegistrationCredentials(email,result.password,id_lang)}catch(error){console.error("❌ error setImmediate AuthController register: ",error.message)}}),(0,response_1.sendSuccess)(res,`${req.t("register.success")}. ${req.t("register.password_sent")}`)):"Дубликат паспорт"===result.sms?(0,response_1.sendError)(res,req.t("register.passport_duplicate")):"Дубликат email"===result.sms?(0,response_1.sendError)(res,req.t("register.email_duplicate")):"UNIQUE violation"===result.sms?(0,response_1.sendError)(res,req.t("register.already_registered")):(0,response_1.sendError)(res,req.t("register.save_error"))}catch(error){return console.error("❌ error AuthController register: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}}}}},3524:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.isCyrillic=isCyrillic,exports.isLatin=function(text){return!isCyrillic(text)},exports.cyrillicToLatin=cyrillicToLatin,exports.latinToCyrillic=latinToCyrillic,exports.transliterateName=transliterateName,exports.transliterateFullName=function(data){const surnameResult=transliterateName(data.surname),namesResult=transliterateName(data.names),patronymicResult=transliterateName(data.patronymic);return{surname:surnameResult.cyrillic,names:namesResult.cyrillic,patronymic:patronymicResult.cyrillic,surname_en:surnameResult.latin,names_en:namesResult.latin,patronymic_en:patronymicResult.latin}};const cyrToLatMap={а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",ө:"o",ү:"u",ң:"n"},latToCyrMap={a:"а",b:"б",c:"к",d:"д",e:"е",f:"ф",g:"г",h:"х",i:"и",j:"дж",k:"к",l:"л",m:"м",n:"н",o:"о",p:"п",q:"к",r:"р",s:"с",t:"т",u:"у",v:"в",w:"в",x:"кс",y:"й",z:"з"},latToCyrDigraphs=[["shch","щ"],["zh","ж"],["kh","х"],["ts","ц"],["ch","ч"],["sh","ш"],["yu","ю"],["ya","я"],["yo","ё"],["ye","е"]];function isCyrillic(text){const cyrCount=(text.match(/[а-яёөүң]/gi)||[]).length,latCount=(text.match(/[a-z]/gi)||[]).length;return!!(/[а-яёөүң]/i.test(text)&&cyrCount>=latCount)||(!/[a-z]/i.test(text)||0!==cyrCount)}function cyrillicToLatin(text){if(!text)return"";let result="";for(let i=0;i<text.length;i++){const char=text[i],lowerChar=char.toLowerCase(),isUpperCase=char!==lowerChar;if(void 0!==cyrToLatMap[lowerChar]){const transliterated=cyrToLatMap[lowerChar];isUpperCase&&transliterated.length>0?result+=transliterated.charAt(0).toUpperCase()+transliterated.slice(1):result+=transliterated}else result+=char}return result}function latinToCyrillic(text){if(!text)return"";let result="",i=0;for(;i<text.length;){let found=!1;for(const[digraph,cyrillic]of latToCyrDigraphs){if(text.slice(i,i+digraph.length).toLowerCase()===digraph){result+=text[i]!==text[i].toLowerCase()?cyrillic.charAt(0).toUpperCase()+cyrillic.slice(1):cyrillic,i+=digraph.length,found=!0;break}}if(!found){const char=text[i],lowerChar=char.toLowerCase(),isUpperCase=char!==lowerChar;if(void 0!==latToCyrMap[lowerChar]){const transliterated=latToCyrMap[lowerChar];isUpperCase&&transliterated.length>0?result+=transliterated.charAt(0).toUpperCase()+transliterated.slice(1):result+=transliterated}else result+=char;i++}}return result}function transliterateName(name){if(!name||""===name.trim())return{cyrillic:"",latin:""};const trimmedName=name.trim();return isCyrillic(trimmedName)?{cyrillic:trimmedName,latin:cyrillicToLatin(trimmedName)}:{cyrillic:latinToCyrillic(trimmedName),latin:trimmedName}}},3570:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__importDefault(__webpack_require__(7252)),email_controller_1=__webpack_require__(1067),router=express_1.default.Router(),emailController=new email_controller_1.EmailController;
/**
 * @swagger
 * /api/email/verification:
 *   post:
 *     tags:
 *       - Email
 *     summary: Отправка кода подтверждения на email
 *     description: Проверяет email, генерирует 6-значный код и отправляет его пользователю для подтверждения.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Код подтверждения успешно отправлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "email.success_send"
 *                 data:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Ошибка валидации или код уже был отправлен
 *       500:
 *         description: Ошибка при отправке письма
 */
router.post("/verification",emailController.verificationEmail),exports.default=router},3674:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),abiturient_controller_1=__webpack_require__(8739),router=(0,express_1.Router)(),ctrl=new abiturient_controller_1.AbiturientController;
/**
 * @swagger
 * /api/abiturient/personal/info:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить личную информацию абитуриента
 *     description: Возвращает профиль абитуриента (ФИО, фото, дата рождения и т.д.) по текущему токену.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Информация об абитуриенте успешно получена
 *       401:
 *         description: Токен отсутствует или просрочен
 *       404:
 *         description: Данные не найдены
 */
router.get("/personal/info",authorize_1.isAbitToken,ctrl.personalInfo),
/**
 * @swagger
 * /api/abiturient/personal/info:
 *   put:
 *     tags:
 *       - Abiturient
 *     summary: Обновить личную информацию абитуриента
 *     description: Обновляет профиль абитуриента (ФИО, фото, дата рождения и т.д.) по текущему токену.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surname:
 *                 type: string
 *                 example: "Иванов"
 *               surname_en:
 *                 type: string
 *                 example: "Ivanov"
 *               names:
 *                 type: string
 *                 example: "Иван"
 *               names_en:
 *                 type: string
 *                 example: "Ivan"
 *               patronymic:
 *                 type: string
 *                 example: "Иванович"
 *               patronymic_en:
 *                 type: string
 *                 example: "Ivanovich"
 *               id_gender:
 *                 type: integer
 *                 example: 1
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               passport:
 *                 type: string
 *                 example: "AC1234567"
 *               passport_date:
 *                 type: string
 *                 format: date
 *                 example: "2020-01-01"
 *               id_country:
 *                 type: integer
 *                 example: 1
 *               telephone:
 *                 type: string
 *                 example: "+996555123456"
 *               id_education_doc:
 *                 type: integer
 *                 example: 1
 *               serial_number:
 *                 type: string
 *                 example: "123456"
 *               date_document:
 *                 type: string
 *                 format: date
 *                 example: "2020-01-01"
 *               name_org:
 *                 type: string
 *                 example: "Средняя школа №1"
 *     responses:
 *       200:
 *         description: Информация об абитуриенте успешно обновлена
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Токен отсутствует или просрочен
 */
router.put("/personal/info",authorize_1.isAbitToken,ctrl.updatePersonal),
/**
 * @swagger
 * /api/abiturient/documents:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить документы абитуриента
 *     description: Возвращает документы абитуриента по текущему токену.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Информация успешно получена
 *       401:
 *         description: Токен отсутствует или просрочен
 */
router.get("/documents",authorize_1.isAbitToken,ctrl.abitDocumentsList),
/**
 * @swagger
 * /api/abiturient/documents/{id_abiturient}:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить документы абитуриента
 *     description: Возвращает документы абитуриента по текущему токену.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_abiturient
 *         in: path
 *         required: true
 *         description: ID абитуриента
 *         schema:
 *           type: integer
 *           example: 17617
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Информация успешно получена
 *       401:
 *         description: Токен отсутствует или просрочен
 */
router.get("/documents/:id_abiturient",authorize_1.isResponsibleToken,ctrl.abitDocumentsListResponsible),router.get("/documents/file/:file_name",ctrl.getAbitDocument),
/**
 * @swagger
 * /api/abiturient/documents:
 *   post:
 *     tags:
 *       - Abiturient
 *     summary: Загрузить документ абитуриента
 *     description: Загружает документ абитуриента по id_document. Требуется файл в поле 'file'.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id_document
 *               - file
 *             properties:
 *               id_document:
 *                 type: integer
 *                 description: ID типа документа
 *                 example: 1
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Файл документа для загрузки
 *     responses:
 *       200:
 *         description: Документ успешно загружен
 *       400:
 *         description: Неверный формат данных или файл не загружен
 *       401:
 *         description: Токен отсутствует или просрочен
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post("/documents",authorize_1.isAbitToken,ctrl.uploadAbitDocument),
/**
 * @swagger
 * /api/abiturient/documents/{id_abiturient}:
 *   post:
 *     tags:
 *       - Abiturient
 *     summary: Загрузить документ абитуриента
 *     description: Загружает документ абитуриента по id_document. Требуется файл в поле 'file'.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_abiturient
 *         in: path
 *         required: true
 *         description: ID абитуриента
 *         schema:
 *           type: integer
 *           example: 17617
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id_document
 *               - file
 *             properties:
 *               id_document:
 *                 type: integer
 *                 description: ID типа документа
 *                 example: 1
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Файл документа для загрузки
 *     responses:
 *       200:
 *         description: Документ успешно загружен
 *       400:
 *         description: Неверный формат данных или файл не загружен
 *       401:
 *         description: Токен отсутствует или просрочен
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post("/documents/:id_abiturient",authorize_1.isResponsibleToken,ctrl.uploadAbitDocumentResponsible),
/**
 * @swagger
 * /api/abiturient/applications:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить список заявок текущего абитуриента по токену
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список заявок
 *       401:
 *         description: Токен недействителен или истёк
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get("/applications",authorize_1.isAbitToken,ctrl.apllicationList),
/**
 * @swagger
 * /api/abiturient/applications:
 *   post:
 *     tags:
 *       - Abiturient
 *     summary: Подача заявки абитуриентом
 *     description: |
 *       Создает новую заявку абитуриента на поступление в выбранный вуз.
 *       Система автоматически находит план приема на основе специальности, формы оплаты и текущих настроек года/сезона.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_specialty
 *               - id_bk
 *             properties:
 *               id_specialty:
 *                 type: integer
 *                 example: 45
 *                 description: Идентификатор специальности
 *               id_bk:
 *                 type: integer
 *                 example: 1
 *                 description: Идентификатор формы оплаты (бюджет/контракт)
 *     responses:
 *       200:
 *         description: Заявка успешно подана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заявка успешно подана"
 *       400:
 *         description: Неверный формат данных, настройки не найдены или план приема не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     - "Неверный формат данных"
 *                     - "Настройки системы не найдены или не сконфигурированы"
 *                     - "План приема не найден для выбранной специальности"
 *       401:
 *         description: Неавторизован (токен недействителен или истек)
 *       409:
 *         description: Абитуриент уже зарегистрирован на эту специальность
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post("/applications",authorize_1.isAbitToken,ctrl.applyAbiturient),
/**
 * @swagger
 * /api/abiturient/applications/{id_movement}:
 *   delete:
 *     tags:
 *       - Abiturient
 *     summary: Отмена поданной заявки абитуриентом
 *     description: Отменяет заявку (устанавливает статус = 0) по id_movement. Доступ только авторизованным абитуриентам.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: path
 *         name: id_movement
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID записи движения (movement.id_movement)
 *     responses:
 *       200:
 *         description: Заявка успешно отменена
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Неавторизован (требуется токен)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete("/applications/:id_movement",authorize_1.isAbitToken,ctrl.cancelAbiturient),
/**
 * @swagger
 * /api/abiturient/education-direction:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить список направлений образования для абитуриента
 *     description: Возвращает все доступные направления образования
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список языков обучение
 */
router.get("/education-direction",authorize_1.isAbitToken,ctrl.educationDirectionList),
/**
 * @swagger
 * /api/abiturient/education-language:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить список языков обучение для абитуриента
 *     description: Возвращает список языков обучение
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список языков обучение
 */
router.get("/education-language",authorize_1.isAbitToken,ctrl.educationLanguageList),
/**
 * @swagger
 * /api/abiturient/regions:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить список регионов по выбранному языку обучения
 *     description: Возвращает список регионов, где есть активные университеты для данного языка обучения.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: query
 *         name: id_education_lang
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID языка обучения
 *     responses:
 *       200:
 *         description: Список регионов успешно получен
 *       400:
 *         description: Неверный формат данных
 */
router.get("/regions",authorize_1.isAbitToken,ctrl.regionList),
/**
 * @swagger
 * /api/abiturient/universities:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить список университетов по языку обучения, региону и типу
 *     description: Фильтрует университеты. Параметры со значением 0 означают "все". type_univer - 0=все, 1=медицинские, 2=технические, 4=гуманитарные
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: query
 *         name: id_education_lang
 *         required: false
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID языка обучения
 *       - in: query
 *         name: id_region
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID региона
 *       - in: query
 *         name: id_education_direction
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID типа университета
 *     responses:
 *       200:
 *         description: Список университетов
 *       400:
 *         description: Неверный формат данных
 */
router.get("/universities",authorize_1.isAbitToken,ctrl.universityList),
/**
 * @swagger
 * /api/abiturient/faculties:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить список факультетов по выбранному вузу и языку обучения
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: query
 *         name: id_education_lang
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: id_university
 *         required: true
 *         schema:
 *           type: integer
 *           example: 14
 *       - in: query
 *         name: id_education_direction
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Список факультетов
 *       400:
 *         description: Неверный формат данных
 */
router.get("/faculties",authorize_1.isAbitToken,ctrl.facultyList),
/**
 * @swagger
 * /api/abiturient/directions:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить список направлений по выбранному факультету и языку обучения
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: query
 *         name: id_education_lang
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID языка обучения
 *       - in: query
 *         name: id_faculty
 *         required: true
 *         schema:
 *           type: integer
 *           example: 669
 *         description: ID факультета
 *       - in: query
 *         name: id_education_direction
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Список направлений
 *       400:
 *         description: Неверный формат данных
 */
router.get("/directions",authorize_1.isAbitToken,ctrl.directionList),
/**
 * @swagger
 * /api/abiturient/bk:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить форму оплаты по направлению и языку обучения
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: query
 *         name: id_education_lang
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: id_direction
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1858
 *     responses:
 *       200:
 *         description: Успешно
 *       400:
 *         description: Неверный формат данных
 */
router.get("/bk",authorize_1.isAbitToken,ctrl.bkList),
/**
 * @swagger
 * /api/abiturient/specialties:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить список специальностей по направлению и форму оплаты
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: query
 *         name: id_education_lang
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: id_direction
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1858
 *       - in: query
 *         name: id_bk
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Список специальностей
 *       400:
 *         description: Неверный формат данных
 */
router.get("/specialties",authorize_1.isAbitToken,ctrl.specialtyList),
/**
 * @swagger
 * /api/abiturient/form-educations:
 *   get:
 *     tags:
 *       - Abiturient
 *     summary: Получить формы обучения (по направлению, формы оплаты и специальности)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - in: query
 *         name: id_education_lang
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: id_direction
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1858
 *       - in: query
 *         name: id_bk
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: id_speciality
 *         required: true
 *         schema:
 *           type: integer
 *           example: 6129
 *     responses:
 *       200:
 *         description: Список форм обучения
 *       400:
 *         description: Неверный формат запроса
 */
router.get("/form-educations",authorize_1.isAbitToken,ctrl.formEducationList),exports.default=router},3807:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.CODE_FORMAT_REGEX=exports.EMAIL_FORMAT_REGEX=exports.DATE_DB_FORMAT_REGEX=void 0,exports.DATE_DB_FORMAT_REGEX=/^\d{4}-\d{2}-\d{2}$/,exports.EMAIL_FORMAT_REGEX=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,exports.CODE_FORMAT_REGEX=/^\d{6}$/},3852:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.SharedService=void 0;const shared_repository_1=__webpack_require__(3903);exports.SharedService=class{constructor(){this.repository=new shared_repository_1.SharedRepository}async getAllGender(id_lang){const{rows}=await this.repository.findAllGender(id_lang);return rows}async getAllCountries(id_lang){const{rows}=await this.repository.findAllCountries(id_lang);return rows}async getRegionIsVisible(id_lang){const{rows}=await this.repository.findRegionIsVisible(id_lang);return rows}async getContactByIdFaculty(data){const{rows}=await this.repository.findContactByIdFaculty(data);return rows}async getAllUniversities(id_lang){const{rows}=await this.repository.findAllUniversities(id_lang);return rows}async getFacultyDirectionByIdUniversity(data){const{rows}=await this.repository.findFacultyDirectionByIdUniversity(data);return rows}async getEducationDocument(){const{rows}=await this.repository.findEducationDocument();return rows}async getAllLearning(){const{rows}=await this.repository.findAllLearning();return rows}async getAllProfession(){const{rows}=await this.repository.findAllProfession();return rows}async getAllEducationLanguages(){const{rows}=await this.repository.findAllEducationLanguages();return rows}async getAllControlTypes(){const{rows}=await this.repository.findAllControlTypes();return rows}async getAllCommissionPositions(){const{rows}=await this.repository.findAllCommissionPositions();return rows}async getAllWs(){const{rows}=await this.repository.findAllWs();return rows}async getAllBk(){const{rows}=await this.repository.findAllBk();return rows}async getAllYears(){const{rows}=await this.repository.findAllYears();return rows}async getAllStatusMon(){const{rows}=await this.repository.findAllStatusMon();return rows}async getAllEducationDirection(isAll=!1){const{rows}=await this.repository.findEducationDirection();return isAll?[{id_education_direction:0,education_direction_ru:"Все направления",education_direction_en:"All directions",sort:0,name:"all"},...rows]:rows}}},3892:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.DirectionService=void 0;const iud_1=__webpack_require__(1442),direction_repository_1=__webpack_require__(2087);exports.DirectionService=class{constructor(){this.repository=new direction_repository_1.DirectionRepository}async getDirectionsByFaculty(id_users,id_faculty){const{rows}=await this.repository.getDirectionsByFaculty(id_users,id_faculty);return rows}async getDirectionsSelector(id_users,id_role,id_lang,id_faculty){const{rows}=await this.repository.getDirectionsSelector(id_users,id_role,id_lang,id_faculty);return rows}async getLearningSelector(id_users,id_role,language,id_direction){const{rows}=await this.repository.getLearningSelector(id_users,id_role,language,id_direction);return rows}async getEducationLanguageSelector(id_users,id_role,language,id_direction,id_learning){const{rows}=await this.repository.getEducationLanguageSelector(id_users,id_role,language,id_direction,id_learning);return rows}async getSpecialtySelector(id_users,id_role,language,id_direction,id_learning,id_education_language){const{rows}=await this.repository.getSpecialtySelector(id_users,id_role,language,id_direction,id_learning,id_education_language);return rows}async createDirection(id_users,data){const{rows}=await this.repository.manageDirection(id_users,iud_1.IUDOperation.INSERT,0,data.id_faculty,data.direction_cipher,data.direction,data.direction_en);return rows[0]?.sms||""}async updateDirection(id_users,id_direction,data){const{rows}=await this.repository.manageDirection(id_users,iud_1.IUDOperation.UPDATE,id_direction,0,data.direction_cipher,data.direction,data.direction_en);return rows[0]?.sms||""}async deleteDirection(id_users,id_direction){const{rows}=await this.repository.manageDirection(id_users,iud_1.IUDOperation.DELETE,id_direction,0,"","","");return rows[0]?.sms||""}}},3901:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const tour_route_1=__importDefault(__webpack_require__(8411));exports.default=tour_route_1.default},3903:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.SharedRepository=void 0;const db_1=__webpack_require__(6067);exports.SharedRepository=class{constructor(){this.findAllCountries=async id_lang=>await(0,db_1.dbQuery)("SELECT * FROM fn_sel_country($1);",[id_lang]),this.findAllGender=async id_lang=>await(0,db_1.dbQuery)("SELECT * FROM fn_sel_gender($1);",[id_lang]),this.findRegionIsVisible=async id_lang=>await(0,db_1.dbQuery)("SELECT * FROM fn_web_region($1);",[id_lang]),this.findContactByIdFaculty=async data=>await(0,db_1.dbQuery)("SELECT * FROM fn_web_users($1, $2);",[data.id_lang,data.id_faculty]),this.findAllUniversities=async id_lang=>await(0,db_1.dbQuery)("SELECT * FROM fn_web_university($1);",[id_lang]),this.findFacultyDirectionByIdUniversity=async data=>await(0,db_1.dbQuery)("SELECT * FROM fn_web_direction($1, $2);",[data.id_lang,data.id_university]),this.findAllLearning=async()=>await(0,db_1.dbQuery)("SELECT * FROM fn_learning_grid_sel();"),this.findAllProfession=async()=>await(0,db_1.dbQuery)("SELECT * FROM fn_profession_grid_sel();"),this.findEducationDocument=async()=>await(0,db_1.dbQuery)("SELECT * FROM v_education_doc;",[]),this.findAllEducationLanguages=async()=>await(0,db_1.dbQuery)("SELECT * FROM fn_education_language_grid_sel();"),this.findAllControlTypes=async()=>await(0,db_1.dbQuery)('SELECT * FROM "V_control_type" ORDER BY id_control_type;'),this.findAllCommissionPositions=async()=>await(0,db_1.dbQuery)("SELECT * FROM v_commission_position;"),this.findAllWs=async()=>await(0,db_1.dbQuery)("SELECT * FROM v_ws_active;"),this.findAllBk=async()=>await(0,db_1.dbQuery)("SELECT * FROM v_bk;"),this.findAllYears=async()=>await(0,db_1.dbQuery)("SELECT * FROM v_year_active;"),this.findAllStatusMon=async()=>await(0,db_1.dbQuery)("SELECT * FROM v_status_mon;",[]),this.findEducationDirection=async()=>await(0,db_1.dbQuery)("SELECT * FROM fn_education_direction_sel();")}}},3915:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.FacultyController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),faculty_schema_1=__webpack_require__(6836),faculty_service_1=__webpack_require__(4812);exports.FacultyController=class{constructor(){this.service=new faculty_service_1.FacultyService,this.getMyFaculties=async(req,res,next)=>{try{const id_users=req.user.id,result=await this.service.getMyFaculties(id_users);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.getFacultiesSelector=async(req,res,next)=>{try{const id_users=req.user.id,id_role=req.user.role,id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getFacultiesSelector(id_users,id_role,id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.createFaculty=async(req,res,next)=>{try{const{isValid,data}=(0,validation_1.validate)(faculty_schema_1.createFacultySchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.createFaculty(id_users,data);return"INSERT"===result?(0,response_1.sendSuccess)(res,req.t("createSuccess")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorCreate"))}catch(error){next(error)}},this.updateFaculty=async(req,res,next)=>{try{const id_faculty=(0,helpers_1.toNumber)(req.params.id_faculty);if(!id_faculty)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(faculty_schema_1.updateFacultySchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.updateFaculty(id_users,id_faculty,data);return"UPDATE"===result?(0,response_1.sendSuccess)(res,req.t("updateSuccess")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){next(error)}},this.deleteFaculty=async(req,res,next)=>{try{const id_faculty=(0,helpers_1.toNumber)(req.params.id_faculty);if(!id_faculty)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.deleteFaculty(id_users,id_faculty);return"DELETE"===result?(0,response_1.sendSuccess)(res,req.t("deleteSuccess")):result.includes("There is a connection to another table")?(0,response_1.sendError)(res,req.t("hasRelations"),!1,409):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){next(error)}}}}},3929:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.universityUserDocumentUpdateSchema=exports.universityUserDocumentCreateSchema=exports.universityUserAccessSchema=exports.universityUserUpdateSchema=exports.universityUserCreateSchema=exports.myUniversityUpdateSchema=void 0;const zod_1=__webpack_require__(1569);exports.myUniversityUpdateSchema=zod_1.z.object({id_university:zod_1.z.number().int().positive(),s_university:zod_1.z.string().max(50),s_university_en:zod_1.z.string().max(50),university_name:zod_1.z.string().max(400),university_name_en:zod_1.z.string().max(400),supervisor_position:zod_1.z.string().max(50),supervisor_position_en:zod_1.z.string().max(50),university_supervisor:zod_1.z.string().max(50),university_supervisor_en:zod_1.z.string().max(50),university_url:zod_1.z.string().max(50),university_address:zod_1.z.string().max(255),university_address_en:zod_1.z.string().max(255)}),exports.universityUserCreateSchema=zod_1.z.object({fio:zod_1.z.string().min(1).max(255),fio_en:zod_1.z.string().min(1).max(255),login:zod_1.z.string().min(1).max(100),password:zod_1.z.string().min(1).max(100),id_role:zod_1.z.number().int().positive(),mobile:zod_1.z.string().max(50).default(""),whatsapp:zod_1.z.string().max(50).default(""),telegram:zod_1.z.string().max(50).default(""),email:zod_1.z.string().max(100).default(""),instagram:zod_1.z.string().max(100).default(""),facebook:zod_1.z.string().max(100).default("")}),exports.universityUserUpdateSchema=zod_1.z.object({fio:zod_1.z.string().min(1).max(255),fio_en:zod_1.z.string().min(1).max(255),login:zod_1.z.string().min(1).max(100),password:zod_1.z.string().min(1).max(100),id_role:zod_1.z.number().int().positive(),mobile:zod_1.z.string().max(50).default(""),whatsapp:zod_1.z.string().max(50).default(""),telegram:zod_1.z.string().max(50).default(""),email:zod_1.z.string().max(100).default(""),instagram:zod_1.z.string().max(100).default(""),facebook:zod_1.z.string().max(100).default(""),photo:zod_1.z.string().optional()}),exports.universityUserAccessSchema=zod_1.z.object({access:zod_1.z.array(zod_1.z.object({id_user:zod_1.z.number().int().positive(),id_faculty:zod_1.z.number().int().positive(),id_bk:zod_1.z.number().int().positive()})).min(1)}),exports.universityUserDocumentCreateSchema=zod_1.z.object({id_users_university:zod_1.z.number().int().positive(),url_document:zod_1.z.string().min(1).max(500)}),exports.universityUserDocumentUpdateSchema=zod_1.z.object({id_users_university:zod_1.z.number().int().positive(),url_document:zod_1.z.string().min(1).max(500)})},3970:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),plan_controller_1=__webpack_require__(7915),router=(0,express_1.Router)(),ctrl=new plan_controller_1.PlanController;
/**
 * @swagger
 * /api/plan/list:
 *   get:
 *     tags:
 *       - Plan
 *     summary: Получить список плана набора
 *     description: Возвращает список плана набора для университета с возможностью фильтрации
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_direction
 *         in: query
 *         required: false
 *         description: ID направления (0 для всех)
 *         schema:
 *           type: integer
 *           default: 0
 *       - name: id_year
 *         in: query
 *         required: false
 *         description: ID года (0 для всех)
 *         schema:
 *           type: integer
 *           default: 0
 *       - name: id_ws
 *         in: query
 *         required: false
 *         description: ID зима/лето (1 по умолчанию)
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Список плана набора успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Требуется авторизация
 */
router.get("/list",authorize_1.isUniversityToken,ctrl.getPlanGrid),
/**
 * @swagger
 * /api/plan:
 *   post:
 *     tags:
 *       - Plan
 *     summary: Создать план набора
 *     description: Создает новый план набора для специальности
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_specialty
 *               - id_bk
 *               - kol_plan
 *               - smeta_doc
 *               - smeta_education
 *             properties:
 *               id_specialty:
 *                 type: integer
 *                 example: 1
 *               id_bk:
 *                 type: integer
 *                 example: 1
 *               kol_plan:
 *                 type: integer
 *                 example: 50
 *               smeta_doc:
 *                 type: integer
 *                 example: 10
 *               smeta_education:
 *                 type: integer
 *                 example: 40
 *               comments:
 *                 type: string
 *                 example: "Комментарий"
 *               comments_en:
 *                 type: string
 *                 example: "Comment"
 *               individual:
 *                 type: boolean
 *                 example: false
 *               id_control_type:
 *                 type: integer
 *                 example: 1
 *               smeta_near_abroad:
 *                 type: integer
 *                 example: 0
 *               smeta_far_abroad:
 *                 type: integer
 *                 example: 0
 *               id_year:
 *                 type: integer
 *                 example: 0
 *               id_ws:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: План набора успешно создан
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 *       409:
 *         description: Дубликат записи
 */
router.post("/",authorize_1.isUniversityToken,ctrl.createPlan),
/**
 * @swagger
 * /api/plan/{id_plan}:
 *   put:
 *     tags:
 *       - Plan
 *     summary: Обновить план набора
 *     description: Обновляет существующий план набора
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_plan
 *         in: path
 *         required: true
 *         description: ID плана набора
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_specialty
 *               - id_bk
 *               - kol_plan
 *               - smeta_doc
 *               - smeta_education
 *             properties:
 *               id_specialty:
 *                 type: integer
 *                 example: 1
 *               id_bk:
 *                 type: integer
 *                 example: 1
 *               kol_plan:
 *                 type: integer
 *                 example: 50
 *               smeta_doc:
 *                 type: integer
 *                 example: 10
 *               smeta_education:
 *                 type: integer
 *                 example: 40
 *               comments:
 *                 type: string
 *                 example: "Комментарий"
 *               comments_en:
 *                 type: string
 *                 example: "Comment"
 *               individual:
 *                 type: boolean
 *                 example: false
 *               id_control_type:
 *                 type: integer
 *                 example: 1
 *               smeta_near_abroad:
 *                 type: integer
 *                 example: 0
 *               smeta_far_abroad:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: План набора успешно обновлен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.put("/:id_plan",authorize_1.isUniversityToken,ctrl.updatePlan),
/**
 * @swagger
 * /api/plan/{id_plan}:
 *   delete:
 *     tags:
 *       - Plan
 *     summary: Удалить план набора
 *     description: Удаляет план набора из системы
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_plan
 *         in: path
 *         required: true
 *         description: ID плана набора
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: План набора успешно удален
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 *       409:
 *         description: План набора имеет связанные записи и не может быть удален
 */
router.delete("/:id_plan",authorize_1.isUniversityToken,ctrl.deletePlan),
/**
 * @swagger
 * /api/plan/specialty/{id_specialty}/bk/{id_bk}/year/{id_years}/ws/{id_ws}:
 *   get:
 *     tags:
 *       - Plan
 *     summary: Получить план по специальности, бюджту, году и форме обучения
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_specialty
 *         in: path
 *         required: true
 *         description: ID специальности
 *         schema:
 *           type: integer
 *       - name: id_bk
 *         in: path
 *         required: true
 *         description: ID бюджета/платной формы
 *         schema:
 *           type: integer
 *       - name: id_years
 *         in: path
 *         required: true
 *         description: ID года
 *         schema:
 *           type: integer
 *       - name: id_ws
 *         in: path
 *         required: true
 *         description: ID формы обучения
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешное получение плана по критериям
 */
router.get("/specialty/:id_specialty/bk/:id_bk/year/:id_years/ws/:id_ws",ctrl.getPlanBySpecialtyAndBkAndYearAndWs),exports.default=router},4104:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateNotificationSchema=exports.createNotificationSchema=void 0;const zod_1=__webpack_require__(1569);exports.createNotificationSchema=zod_1.z.object({id_learning:zod_1.z.number().int().positive(),id_education_language:zod_1.z.number().int().positive(),id_faculty:zod_1.z.number().int().positive(),title_ru:zod_1.z.string().min(1).max(255),title_en:zod_1.z.string().max(255).optional().default(""),notification_ru:zod_1.z.string().min(1),notification_en:zod_1.z.string().optional().default("")}),exports.updateNotificationSchema=zod_1.z.object({id_learning:zod_1.z.number().int().positive(),id_education_language:zod_1.z.number().int().positive(),id_faculty:zod_1.z.number().int().positive(),title_ru:zod_1.z.string().min(1).max(255),title_en:zod_1.z.string().max(255).optional().default(""),notification_ru:zod_1.z.string().min(1),notification_en:zod_1.z.string().optional().default("")})},4374:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.registerSchema=exports.loginSchema=void 0;const zod_1=__webpack_require__(1569),regex_1=__webpack_require__(3807);exports.loginSchema=zod_1.z.object({login:zod_1.z.string({required_error:"login_required",invalid_type_error:"login_required"}).min(1,{message:"login_required"}),password:zod_1.z.string({required_error:"password_required",invalid_type_error:"password_required"}).min(1,{message:"password_required"}),role:zod_1.z.number({required_error:"role_required",invalid_type_error:"role_invalid"}).refine(val=>2===val||3===val||5===val||1===val,{message:"role_invalid"})}),exports.registerSchema=zod_1.z.object({surname:zod_1.z.string({required_error:"surname_required",invalid_type_error:"surname_required"}).min(1,{message:"surname_required"}),names:zod_1.z.string({required_error:"names_required",invalid_type_error:"names_required"}).min(1,{message:"names_required"}),patronymic:zod_1.z.string({invalid_type_error:"patronymic_invalid"}).nullable().optional(),birth_date:zod_1.z.string({required_error:"birth_date_required",invalid_type_error:"birth_date_invalid"}).regex(regex_1.DATE_DB_FORMAT_REGEX,{message:"birth_date_format"}),id_gender:zod_1.z.coerce.number({required_error:"id_gender_required",invalid_type_error:"id_gender_invalid"}),passport:zod_1.z.string({required_error:"passport_required",invalid_type_error:"passport_invalid"}).min(1,{message:"passport_required"}),passport_date:zod_1.z.string({required_error:"passport_date_required",invalid_type_error:"passport_date_invalid"}).regex(regex_1.DATE_DB_FORMAT_REGEX,{message:"passport_date_format"}),id_country:zod_1.z.coerce.number({required_error:"id_country_required",invalid_type_error:"id_country_invalid"}),telephone:zod_1.z.string({required_error:"telephone_required",invalid_type_error:"telephone_invalid"}),email:zod_1.z.string({required_error:"email_required",invalid_type_error:"email_invalid"}).email({message:"email_invalid"}).regex(regex_1.EMAIL_FORMAT_REGEX,{message:"email_invalid"}),code:zod_1.z.string({required_error:"code_required",invalid_type_error:"code_invalid"}).regex(regex_1.CODE_FORMAT_REGEX,{message:"code_length"}),consent:zod_1.z.preprocess(val=>"true"===val||"false"!==val&&val,zod_1.z.boolean({required_error:"consent_required",invalid_type_error:"consent_invalid"})),token:zod_1.z.string({invalid_type_error:"token_invalid"}).nullable().optional()})},4649:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),my_controller_1=__webpack_require__(2826),router=(0,express_1.Router)(),ctrl=new my_controller_1.MyUniversityController;
/**
 * @swagger
 * /api/university/my:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить информацию о моем университете
 *     description: Возвращает информацию о университете текущего пользователя (только для ролей 3, 4, 6)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Информация о университете успешно получена
 */
router.get("/",authorize_1.isUniversityToken,ctrl.getMyUniversity),
/**
 * @swagger
 * /api/university/my:
 *   put:
 *     tags:
 *       - University
 *     summary: Обновить информацию о моем университете
 *     description: Обновляет информацию о университете текущего пользователя (только для ролей 3, 4, 6)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_university
 *               - s_university
 *               - s_university_en
 *               - university_name
 *               - university_name_en
 *               - supervisor_position
 *               - supervisor_position_en
 *               - university_supervisor
 *               - university_supervisor_en
 *               - university_url
 *               - university_address
 *               - university_address_en
 *             properties:
 *               id_university:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *               s_university:
 *                 type: string
 *                 maxLength: 50
 *                 example: "КНУ"
 *               s_university_en:
 *                 type: string
 *                 maxLength: 50
 *                 example: "KNU"
 *               university_name:
 *                 type: string
 *                 maxLength: 400
 *                 example: "Кыргызский национальный университет"
 *               university_name_en:
 *                 type: string
 *                 maxLength: 400
 *                 example: "Kyrgyz National University"
 *               supervisor_position:
 *                 type: string
 *                 maxLength: 50
 *                 example: "Ректор"
 *               supervisor_position_en:
 *                 type: string
 *                 maxLength: 50
 *                 example: "Rector"
 *               university_supervisor:
 *                 type: string
 *                 maxLength: 50
 *                 example: "Иванов И.И."
 *               university_supervisor_en:
 *                 type: string
 *                 maxLength: 50
 *                 example: "Ivanov I.I."
 *               university_url:
 *                 type: string
 *                 maxLength: 50
 *                 example: "https://knu.kg"
 *               university_address:
 *                 type: string
 *                 maxLength: 255
 *                 example: "г. Бишкек, ул. Фрунзе 547"
 *               university_address_en:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Bishkek, Frunze str. 547"
 *     responses:
 *       200:
 *         description: Информация о университете успешно обновлена
 *       400:
 *         description: Неверный формат данных или ошибка обновления
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put("/",authorize_1.isUniversityToken,ctrl.updateMyUniversity),
/**
 * @swagger
 * /api/university/my/users:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список пользователей университета
 *     description: Возвращает список пользователей (членов приемной комиссии) для университета (только для ролей 3, 4, 6)
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей успешно получен
 */
router.get("/users",authorize_1.isUniversityToken,ctrl.getUniversityUsers),
/**
 * @swagger
 * /api/university/my/users:
 *   post:
 *     tags:
 *       - University
 *     summary: Создать нового пользователя университета
 *     description: Добавляет нового пользователя в приемную комиссию университета (только для ролей 3, 4, 6)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fio
 *               - fio_en
 *               - login
 *               - password
 *               - id_role
 *             properties:
 *               fio:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: ФИО на русском
 *                 example: "Иванов Иван Иванович"
 *               fio_en:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: ФИО на английском
 *                 example: "Ivanov Ivan Ivanovich"
 *               login:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: Логин пользователя
 *                 example: "ivanov"
 *               password:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: Пароль
 *                 example: "password123"
 *               id_role:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID роли
 *                 example: 4
 *               mobile:
 *                 type: string
 *                 maxLength: 50
 *                 description: Мобильный телефон
 *                 example: "+996555123456"
 *               whatsapp:
 *                 type: string
 *                 maxLength: 50
 *                 description: WhatsApp
 *               telegram:
 *                 type: string
 *                 maxLength: 50
 *                 description: Telegram
 *               email:
 *                 type: string
 *                 maxLength: 100
 *                 description: Email
 *                 example: "ivanov@university.kg"
 *               instagram:
 *                 type: string
 *                 maxLength: 100
 *                 description: Instagram
 *               facebook:
 *                 type: string
 *                 maxLength: 100
 *                 description: Facebook
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Фото пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно создан
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 *       409:
 *         description: Дубликат (пользователь уже существует)
 */
router.post("/users",authorize_1.isUniversityToken,ctrl.createUniversityUser),
/**
 * @swagger
 * /api/university/my/users/{id_users_university}:
 *   put:
 *     tags:
 *       - University
 *     summary: Обновить пользователя университета
 *     description: Обновляет информацию о пользователе приемной комиссии (только для ролей 3, 4, 6)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_users_university
 *         in: path
 *         required: true
 *         description: ID пользователя университета
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fio
 *               - fio_en
 *               - login
 *               - password
 *               - id_role
 *             properties:
 *               fio:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: ФИО на русском
 *               fio_en:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: ФИО на английском
 *               login:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: Логин
 *               password:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: Пароль
 *               id_role:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID роли
 *               mobile:
 *                 type: string
 *                 maxLength: 50
 *               whatsapp:
 *                 type: string
 *                 maxLength: 50
 *               telegram:
 *                 type: string
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 maxLength: 100
 *               instagram:
 *                 type: string
 *                 maxLength: 100
 *               facebook:
 *                 type: string
 *                 maxLength: 100
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Новое фото
 *     responses:
 *       200:
 *         description: Пользователь успешно обновлен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.put("/users/:id_users_university",authorize_1.isUniversityToken,ctrl.updateUniversityUser),
/**
 * @swagger
 * /api/university/my/users/{id_users_university}:
 *   delete:
 *     tags:
 *       - University
 *     summary: Удалить пользователя университета
 *     description: Удаляет пользователя из приемной комиссии (только для ролей 3, 4, 6)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_users_university
 *         in: path
 *         required: true
 *         description: ID пользователя университета
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.delete("/users/:id_users_university",authorize_1.isUniversityToken,ctrl.deleteUniversityUser),
/**
 * @swagger
 * /api/university/my/users/access:
 *   post:
 *     tags:
 *       - University
 *     summary: Обновить доступы пользователей университета
 *     description: Массово обновляет доступы пользователей к факультетам (только для ролей 3, 4, 6)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - access
 *             properties:
 *               access:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - id_user
 *                     - id_faculty
 *                     - id_bk
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                       minimum: 1
 *                       example: 1
 *                     id_faculty:
 *                       type: integer
 *                       minimum: 1
 *                       example: 1
 *                     id_bk:
 *                       type: integer
 *                       minimum: 1
 *                       example: 1
 *     responses:
 *       200:
 *         description: Доступы успешно обновлены
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.post("/users/access",authorize_1.isUniversityToken,ctrl.updateUniversityUserAccess),
/**
 * @swagger
 * /api/university/my/users/document:
 *   post:
 *     tags:
 *       - University
 *     summary: Создать документ пользователя университета
 *     description: Добавляет документ для пользователя университета (только для ролей 3, 4, 6)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_users_university
 *               - url_document
 *             properties:
 *               id_users_university:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID пользователя университета
 *                 example: 1
 *               url_document:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *                 description: URL документа
 *                 example: "https://example.com/document.pdf"
 *     responses:
 *       200:
 *         description: Документ успешно создан
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.post("/users/document",authorize_1.isUniversityToken,ctrl.createUniversityUserDocument),
/**
 * @swagger
 * /api/university/my/users/document:
 *   put:
 *     tags:
 *       - University
 *     summary: Обновить документ пользователя университета
 *     description: Обновляет документ пользователя университета (только для ролей 3, 4, 6)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_users_university
 *               - url_document
 *             properties:
 *               id_users_university:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID пользователя университета
 *                 example: 1
 *               url_document:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *                 description: URL документа
 *                 example: "https://example.com/document.pdf"
 *     responses:
 *       200:
 *         description: Документ успешно обновлен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.put("/users/document",authorize_1.isUniversityToken,ctrl.updateUniversityUserDocument),exports.default=router},4682:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.statusUpdateSchema=exports.monitoringGridSchema=void 0;const zod_1=__webpack_require__(1569);exports.monitoringGridSchema=zod_1.z.object({id_university:zod_1.z.number().int().positive("ID университета должен быть положительным числом"),id_year:zod_1.z.number().int().positive("ID года должен быть положительным числом"),id_ws:zod_1.z.number().int().positive("ID приемной кампании должен быть положительным числом"),page:zod_1.z.number().int().positive().default(1),size:zod_1.z.number().int().positive().max(100).default(50),search:zod_1.z.string().nullish()}),exports.statusUpdateSchema=zod_1.z.object({id_movement:zod_1.z.number().int().positive(),id_level_education:zod_1.z.number().int(),id_status_mon:zod_1.z.number().int().positive(),refusing:zod_1.z.string().nullish(),shifr:zod_1.z.number().nullish()})},4792:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const plan_route_1=__importDefault(__webpack_require__(3970));exports.default=plan_route_1.default},4808:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbiturientController=void 0;const my_service_1=__webpack_require__(8643),helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),abiturient_schema_1=__webpack_require__(6391),abiturient_service_1=__webpack_require__(9309);exports.AbiturientController=class{constructor(){this.service=new abiturient_service_1.AbiturientService,this.myUniversityService=new my_service_1.MyUniversityService,this.getAbiturientGrid=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_specialty:(0,helpers_1.toNumber)(req.query?.id_specialty)||0,id_bk:(0,helpers_1.toNumber)(req.query?.id_bk)||0,id_years:(0,helpers_1.toNumber)(req.query?.id_years)||0,id_ws:(0,helpers_1.toNumber)(req.query?.id_ws)||0,page:(0,helpers_1.toNumber)(req.query?.page)||1,size:(0,helpers_1.toNumber)(req.query?.size)||20,find:String(req.query?.find||""),filter_type:String(req.query?.filter_type??"")},{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientGridSchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAbitGrid(id_user,id_role,id_lang,data);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.getLearningTypes=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_years:(0,helpers_1.toNumber)(req.query.id_years),id_ws:(0,helpers_1.toNumber)(req.query.id_ws)},{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientLearningSchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),id_university=(await this.myUniversityService.getMyUniversity(id_user)).id_university,result=await this.service.getLearningTypes({id_user,id_role,id_lang,id_university,id_years:data.id_years,id_ws:data.id_ws});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.getEducationLanguages=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_learning:(0,helpers_1.toNumber)(req.query.id_learning),id_years:(0,helpers_1.toNumber)(req.query.id_years),id_ws:(0,helpers_1.toNumber)(req.query.id_ws)},{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientEducationLanguageSchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),id_university=(await this.myUniversityService.getMyUniversity(id_user)).id_university,result=await this.service.getEducationLanguages({id_user,id_role,id_lang,id_university,id_learning:data.id_learning,id_years:data.id_years,id_ws:data.id_ws});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.getFaculties=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_el:(0,helpers_1.toNumber)(req.query.id_el),id_learning:(0,helpers_1.toNumber)(req.query.id_learning),id_years:(0,helpers_1.toNumber)(req.query.id_years),id_ws:(0,helpers_1.toNumber)(req.query.id_ws)},{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientFacultySchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),id_university=(await this.myUniversityService.getMyUniversity(id_user)).id_university,result=await this.service.getFaculties({id_user,id_role,id_lang,id_university,id_el:data.id_el,id_learning:data.id_learning,id_years:data.id_years,id_ws:data.id_ws});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.getSpecialties=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_el:(0,helpers_1.toNumber)(req.query.id_el),id_faculty:(0,helpers_1.toNumber)(req.query.id_faculty),id_learning:(0,helpers_1.toNumber)(req.query.id_learning),id_years:(0,helpers_1.toNumber)(req.query.id_years),id_ws:(0,helpers_1.toNumber)(req.query.id_ws)},{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientSpecialtySchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getSpecialties({id_user,id_role,id_lang,id_el:data.id_el,id_faculty:data.id_faculty,id_learning:data.id_learning,id_years:data.id_years,id_ws:data.id_ws});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.getBudgetContractTypes=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_specialty:(0,helpers_1.toNumber)(req.query.id_specialty),id_years:(0,helpers_1.toNumber)(req.query.id_years),id_ws:(0,helpers_1.toNumber)(req.query.id_ws)},{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientBkSchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getBudgetContractTypes({id_user,id_role,id_lang,id_specialty:data.id_specialty,id_years:data.id_years,id_ws:data.id_ws});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.updateMovement=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_movement=(0,helpers_1.toNumber)(req.params.id_movement);if(!id_movement)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientMovementUpdateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return await this.service.updateMovement(id_user,id_role,id_movement,data)?(0,response_1.sendSuccess)(res,req.t("successUpdate")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}},this.getAbiturientDetails=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_abiturient:(0,helpers_1.toNumber)(req.params.id_abiturient),id_movement:(0,helpers_1.toNumber)(req.params.id_movement)},{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientDetailsSchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAbiturientDetails({id_lang,id_abiturient:data.id_abiturient,id_movement:data.id_movement});return result?(0,response_1.sendSuccess)(res,req.t("success"),result):(0,response_1.sendError)(res,req.t("notFound"),!1,404)}catch(error){return next(error)}},this.getStats=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const queryData={id_specialty:(0,helpers_1.toNumber)(req.query?.id_specialty)||0,id_bk:(0,helpers_1.toNumber)(req.query?.id_bk)||0,id_years:(0,helpers_1.toNumber)(req.query?.id_years)||0,id_ws:(0,helpers_1.toNumber)(req.query?.id_ws)||0},{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientStatsSchema,queryData);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getStats({id_specialty:data.id_specialty,id_bk:data.id_bk,id_years:data.id_years,id_ws:data.id_ws,id_lang});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.createAbiturient=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientCreateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await this.service.createAbiturient(id_user,id_role,data);return"INSERT"===result.sms?(0,response_1.sendSuccess)(res,req.t("success"),{id_abiturient:result.id}):"DUPLICATE"===result.sms?(0,response_1.sendError)(res,req.t("abiturient.duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}},this.updateAbiturient=async(req,res,next)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_abiturient=(0,helpers_1.toNumber)(req.params.id_abiturient);if(!id_abiturient)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(abiturient_schema_1.abiturientUpdateSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"UPDATE"===(await this.service.updateAbiturient(id_user,id_role,id_abiturient,data)).sms?(0,response_1.sendSuccess)(res,req.t("successUpdate")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}}}}},4812:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.FacultyService=void 0;const iud_1=__webpack_require__(1442),faculty_repository_1=__webpack_require__(6335);exports.FacultyService=class{constructor(){this.repository=new faculty_repository_1.FacultyRepository}async getMyFaculties(id_users){const{rows}=await this.repository.findFacultiesByUserId(id_users);return rows}async getFacultiesSelector(id_users,id_role,id_lang){const{rows}=await this.repository.findFacultiesSelector(id_users,id_role,id_lang,0);return rows}async createFaculty(id_users,data){const{rows}=await this.repository.manageFaculty(id_users,iud_1.IUDOperation.INSERT,0,data);return rows[0]?.sms||"NO_RESPONSE"}async updateFaculty(id_users,id_faculty,data){const{rows}=await this.repository.manageFaculty(id_users,iud_1.IUDOperation.UPDATE,id_faculty,data);return rows[0]?.sms||"NO_RESPONSE"}async deleteFaculty(id_users,id_faculty){const{rows}=await this.repository.manageFaculty(id_users,iud_1.IUDOperation.DELETE,id_faculty,{});return rows[0]?.sms||"NO_RESPONSE"}}},4835:module=>{module.exports=require("redis")},5032:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.SpecialtyService=void 0;const specialty_repository_1=__webpack_require__(6731);exports.SpecialtyService=class{constructor(){this.repository=new specialty_repository_1.SpecialtyRepository}async getSpecialtiesByDirection(id_users,id_direction,id_lang){const{rows}=await this.repository.getSpecialtiesByDirection(id_users,id_direction,id_lang);return rows}async createSpecialty(id_users,data){const{rows}=await this.repository.manageSpecialty(id_users,0,{id_specialty:0,...data});return rows[0]?.sms||"NO_RESPONSE"}async updateSpecialty(id_users,id_specialty,data){const{rows}=await this.repository.manageSpecialty(id_users,1,{id_specialty,id_direction:0,...data});return rows[0]?.sms||"NO_RESPONSE"}async deleteSpecialty(id_users,id_specialty){const{rows}=await this.repository.manageSpecialty(id_users,2,{id_specialty,id_direction:0,specialty_cipher:"",specialty:"",specialty_en:"",id_learning:0,id_education_language:0,id_profession:0});return rows[0]?.sms||"NO_RESPONSE"}}},5152:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.UsersService=void 0;const iud_1=__webpack_require__(1442),crypto_1=__webpack_require__(9095),users_repository_1=__webpack_require__(1187);exports.UsersService=class{constructor(){this.repository=new users_repository_1.UsersRepository}async getAllUsers(id_lang){return await this.repository.findAllUsers(id_lang)}async createUsers(id_users,data){const hash_passwords=(0,crypto_1.md5)(data.passwords),{rows}=await this.repository.usersIUD({id_users,iud:iud_1.IUDOperation.INSERT,id_university:data.id_university,users_fio:data.users_fio,pin:data.pin,logins:data.logins,passwords:hash_passwords,telefon:data.telefon,email:data.email});return rows[0]?.sms||"NO_RESPONSE"}async updateUsers(id_users_auth,data){const hash_passwords=data.new_passwords&&data.new_passwords.length>0?(0,crypto_1.md5)(data.new_passwords):data.old_passwords,{rows}=await this.repository.usersIUD({id_users:id_users_auth,iud:iud_1.IUDOperation.UPDATE,id_users_edit:data.id_users,id_university:data.id_university,users_fio:data.users_fio,pin:data.pin,logins:data.logins,passwords:hash_passwords,telefon:data.telefon,email:data.email});return rows[0]?.sms||"NO_RESPONSE"}async deleteUsers(id_users_auth,id_users){const{rows}=await this.repository.usersIUD({id_users:id_users_auth,iud:iud_1.IUDOperation.DELETE,id_users_edit:id_users});return rows[0]?.sms||"NO_RESPONSE"}}},5169:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.MonitoringRepository=void 0;const db_1=__webpack_require__(6067);exports.MonitoringRepository=class{constructor(){this.statusIUD=async(id_user,id_lang,data)=>{const{rows}=await(0,db_1.dbQuery)("CALL p_mon_status_iud($1, $2, $3, $4, $5, $6, $7, $8);",[id_user,id_lang,data.id_movement,data.id_level_education,data.id_status_mon,data.refusing??null,data.shifr??null,null]);return rows[0]?.sms||"NO_RESPONSE"},this.findSpravka=async id_abiturient=>{const{rows}=await(0,db_1.dbQuery)("SELECT * FROM fn_spravka($1);",[id_abiturient]);return rows[0]??null},this.findAbitRefusing=async(id_lang,id_abiturient,id_movement)=>{const{rows}=await(0,db_1.dbQuery)("SELECT * FROM fn_mon_abit_refusing($1, $2, $3);",[id_lang,id_abiturient,id_movement]);return rows[0]?.abiturient_refusing??null},this.findAbitGrid=async(id_user,id_role,id_lang,data)=>await(0,db_1.dbQuery)("SELECT * FROM fn_mon_abit_grid($1, $2, $3, $4, $5, $6, $7, $8, $9);",[id_user,id_role,id_lang,data.id_university,data.id_year,data.id_ws,data.page,data.size,data.search??null])}}},5196:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),abiturient_1=__importDefault(__webpack_require__(9425)),commission_1=__importDefault(__webpack_require__(9925)),my_1=__importDefault(__webpack_require__(2850)),university_controller_1=__webpack_require__(865),router=(0,express_1.Router)(),ctrl=new university_controller_1.UniversityController;router.use("/abiturient",abiturient_1.default),router.use("/commission",commission_1.default),router.use("/my",my_1.default),
/**
 * @swagger
 * /api/university/list:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список университетов
 *     description: Возвращает все университеты
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список университетов успешно получен
 */
router.get("/list",authorize_1.isMinistryToken,ctrl.universityList),
/**
 * @swagger
 * /api/university/selector:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список университетов для селектора (министерство)
 *     description: |
 *       Возвращает список университетов с количеством заявок для министерского селектора.
 *       Фильтрует университеты по документу об образовании пользователя, году и приемной кампании.
 *       Показывает только университеты с заявками от абитуриентов из стран, требующих справку.
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_year
 *         in: query
 *         required: false
 *         description: ID учебного года (0 для всех)
 *         schema:
 *           type: integer
 *           default: 0
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: false
 *         description: ID приемной кампании (0 для всех)
 *         schema:
 *           type: integer
 *           default: 0
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список университетов успешно получен
 */
router.get("/selector",authorize_1.isMinistryToken,ctrl.universitySelectorList),
/**
 * @swagger
 * /api/university/level-education:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список уровней образования для селектора
 *     description: |
 *       Возвращает список уровней образования в зависимости от документа об образовании пользователя.
 *       Для id_education_doc = 1: уровни [0, 1, 4]
 *       Для остальных: уровни [0, 2, 3, 4]
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список уровней образования успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_level_education:
 *                         type: integer
 *                         example: 1
 *                       level_education:
 *                         type: string
 *                         example: "Бакалавриат"
 *       401:
 *         description: Нет доступа
 */
router.get("/level-education",authorize_1.isMinistryToken,ctrl.levelEducationSelectorList),
/**
 * @swagger
 * /api/university/create:
 *   post:
 *     tags:
 *       - University
 *     summary: Добавить новый университет
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - university_name
 *               - university_name_en
 *               - id_region
 *               - winter_visible
 *             properties:
 *               university_name:
 *                 type: string
 *                 description: Название университета (рус)
 *               university_name_en:
 *                 type: string
 *                 description: Название университета (англ)
 *               id_region:
 *                 type: integer
 *                 description: ID региона
 *               winter_visible:
 *                 type: boolean
 *                 description: Видимость зимнего набора
 *     responses:
 *       200:
 *         description: Университет успешно добавлен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Нет доступа
 *       403:
 *         description: Нет прав
 *       409:
 *         description: Дубликат
 *       500:
 *         description: Ошибка сервера
 */
router.post("/create",authorize_1.isMinistryToken,ctrl.createUniversity),
/**
 * @swagger
 * /api/university/update/{id_university}:
 *   put:
 *     tags:
 *       - University
 *     summary: Обновить информацию университета
 *     parameters:
 *       - name: id_university
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - university_name
 *               - university_name_en
 *               - id_region
 *               - winter_visible
 *             properties:
 *               university_name:
 *                 type: string
 *                 description: Название университета (рус)
 *               university_name_en:
 *                 type: string
 *                 description: Название университета (англ)
 *               id_region:
 *                 type: integer
 *                 description: ID региона
 *               winter_visible:
 *                 type: boolean
 *                 description: Видимость зимнего набора
 *     responses:
 *       200:
 *         description: Успешное обновление
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Нет доступа
 *       403:
 *         description: Нет прав
 *       500:
 *         description: Ошибка сервера
 */
router.put("/update/:id_university",authorize_1.isMinistryToken,ctrl.updateUniversity),
/**
 * @swagger
 * /api/university/unchecked-count:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить количество не проверенных абитуриентов
 *     description: Возвращает количество абитуриентов, которые ещё не проверены министерством
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Количество успешно получено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     kol:
 *                       type: integer
 *                       description: Количество не проверенных абитуриентов
 *                       example: 42
 */
router.get("/unchecked-count",authorize_1.isMinistryToken,ctrl.uncheckedCount),
/**
 * @swagger
 * /api/university/applicants-report:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить полный отчет по абитуриентам
 *     description: Возвращает подробный отчет со всей информацией об абитуриентах университета, включая личные данные, выбранные специальности, статусы и документы об образовании
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_year
 *         in: query
 *         required: false
 *         description: ID учебного года (0 для всех)
 *         schema:
 *           type: integer
 *           default: 0
 *       - name: id_ws
 *         in: query
 *         required: false
 *         description: ID семестра (зима/лето, 0 для всех)
 *         schema:
 *           type: integer
 *           default: 0
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Отчет успешно получен
 */
router.get("/applicants-report",authorize_1.isUniversityToken,ctrl.getApplicantsReport),exports.default=router},5264:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NotificationService=void 0;const notification_repository_1=__webpack_require__(963);exports.NotificationService=class{constructor(){this.repository=new notification_repository_1.NotificationRepository}async getAbiturientNotifications(id_lang,id_abiturient){const{rows}=await this.repository.findAbiturientNotifications(id_lang,id_abiturient);return rows}async getUniversityNotifications(id_users){const{rows}=await this.repository.findUniversityNotifications(id_users);return rows}async createNotification(id_users,data){const{rows}=await this.repository.notificationIUD(id_users,{iud:0,id_notification:0,...data});return rows[0]||{out_id_notification:null,sms:"NO_RESPONSE"}}async updateNotification(id_users,id_notification,data){const{rows}=await this.repository.notificationIUD(id_users,{iud:1,id_notification,...data});return rows[0]||{out_id_notification:null,sms:"NO_RESPONSE"}}async deleteNotification(id_users,id_notification){const{rows}=await this.repository.notificationIUD(id_users,{iud:2,id_notification,id_learning:0,id_education_language:0,id_faculty:0,title_ru:"",title_en:"",notification_ru:"",notification_en:""});return rows[0]||{out_id_notification:null,sms:"NO_RESPONSE"}}}},5490:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const shared_route_1=__importDefault(__webpack_require__(2210));exports.default=shared_route_1.default},5560:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.validatePath=void 0;const fs_1=__importDefault(__webpack_require__(9896)),path_1=__importDefault(__webpack_require__(6928)),isDevelopment="development"===__webpack_require__(6138).ENV.NODE_ENV;exports.validatePath=(filePath,baseDir)=>{if(!filePath||"string"!=typeof filePath)throw new Error("Invalid file path: path must be a non-empty string");const normalizedPath=path_1.default.normalize(filePath),absolutePath=path_1.default.isAbsolute(normalizedPath)?normalizedPath:path_1.default.resolve(process.cwd(),normalizedPath);if(baseDir){const normalizedBase=path_1.default.resolve(baseDir);if(!absolutePath.startsWith(normalizedBase+path_1.default.sep)&&absolutePath!==normalizedBase)throw new Error(`Path traversal detected: ${filePath} is outside allowed directory ${baseDir}`)}if(normalizedPath.includes("..")||/\0/.test(filePath))throw new Error(`Suspicious path pattern detected: ${filePath}`);return absolutePath};const exists=async(filePath,baseDir)=>{try{const validPath=(0,exports.validatePath)(filePath,baseDir);return await fs_1.default.promises.access(validPath,fs_1.default.constants.F_OK),!0}catch(error){const err=error;return"ENOENT"===err.code||isDevelopment&&console.debug(`File.exists error for ${filePath}:`,err.message),!1}},File={exists,deleteFile:async(filePath,baseDir)=>{try{const validPath=(0,exports.validatePath)(filePath,baseDir);return await exists(validPath)?(await fs_1.default.promises.unlink(validPath),isDevelopment&&console.log(`✅ File deleted: ${filePath}`),!0):(isDevelopment&&console.debug(`File.deleteFile: file does not exist: ${filePath}`),!1)}catch(error){const err=error;return console.error(`❌ File.deleteFile error for ${filePath}:`,err.message),isDevelopment&&console.debug(err.stack),!1}},validatePath:exports.validatePath};exports.default=File},5631:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),commission_controller_1=__webpack_require__(572),router=(0,express_1.Router)(),ctrl=new commission_controller_1.CommissionController;
/**
 * @swagger
 * /api/university/commission/list:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список членов комиссии университета
 *     description: Возвращает список членов приемной комиссии для университета администратора (только для роли 3 - администратор университета)
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список членов комиссии успешно получен
 */
router.get("/list",authorize_1.isUniversityToken,ctrl.getCommissionMembers),
/**
 * @swagger
 * /api/university/commission:
 *   post:
 *     tags:
 *       - University
 *     summary: Создать члена комиссии
 *     description: Добавляет нового члена приемной комиссии университета (только для роли 3 - администратор университета)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_commission_position
 *               - fio
 *               - fio_en
 *             properties:
 *               id_commission_position:
 *                 type: integer
 *                 description: ID должности в комиссии
 *                 example: 1
 *               fio:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: ФИО на русском
 *                 example: "Иванов Иван Иванович"
 *               fio_en:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: ФИО на английском
 *                 example: "Ivanov Ivan Ivanovich"
 *     responses:
 *       200:
 *         description: Член комиссии успешно создан
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.post("/",authorize_1.isUniversityToken,ctrl.createCommission),
/**
 * @swagger
 * /api/university/commission/{id_commission}:
 *   put:
 *     tags:
 *       - University
 *     summary: Обновить члена комиссии
 *     description: Обновляет информацию о члене приемной комиссии (только для роли 3 - администратор университета)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_commission
 *         in: path
 *         required: true
 *         description: ID члена комиссии
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_commission_position
 *               - fio
 *               - fio_en
 *             properties:
 *               id_commission_position:
 *                 type: integer
 *                 description: ID должности в комиссии
 *                 example: 1
 *               fio:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: ФИО на русском
 *                 example: "Иванов Иван Иванович"
 *               fio_en:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: ФИО на английском
 *                 example: "Ivanov Ivan Ivanovich"
 *     responses:
 *       200:
 *         description: Член комиссии успешно обновлен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.put("/:id_commission",authorize_1.isUniversityToken,ctrl.updateCommission),
/**
 * @swagger
 * /api/university/commission/{id_commission}:
 *   delete:
 *     tags:
 *       - University
 *     summary: Удалить члена комиссии
 *     description: Удаляет члена приемной комиссии из системы (только для роли 3 - администратор университета)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_commission
 *         in: path
 *         required: true
 *         description: ID члена комиссии
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Член комиссии успешно удален
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.delete("/:id_commission",authorize_1.isUniversityToken,ctrl.deleteCommission),exports.default=router},5662:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),notification_controller_1=__webpack_require__(6727),router=(0,express_1.Router)(),ctrl=new notification_controller_1.NotificationController;
/**
 * @swagger
 * /api/notification/abiturient:
 *   get:
 *     tags:
 *       - Notification
 *     summary: Получить уведомления абитуриента
 *     description: Возвращает список уведомлений для абитуриента на основе его заявок
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список уведомлений успешно получен
 *       401:
 *         description: Требуется авторизация
 */
router.get("/abiturient",authorize_1.isAbitToken,ctrl.getAbiturientNotifications),
/**
 * @swagger
 * /api/notification/university:
 *   get:
 *     tags:
 *       - Notification
 *     summary: Получить уведомления университета
 *     description: Возвращает список всех уведомлений университета для ответственного
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список уведомлений успешно получен
 *       401:
 *         description: Требуется авторизация
 */
router.get("/university",authorize_1.isUniversityToken,ctrl.getUniversityNotifications),
/**
 * @swagger
 * /api/notification:
 *   post:
 *     tags:
 *       - Notification
 *     summary: Создать уведомление
 *     description: Создает новое уведомление. Требуется роль университета (role 3).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_learning
 *               - id_education_language
 *               - id_faculty
 *               - title_ru
 *               - notification_ru
 *             properties:
 *               id_learning:
 *                 type: integer
 *                 description: ID формы обучения
 *                 example: 1
 *               id_education_language:
 *                 type: integer
 *                 description: ID языка обучения
 *                 example: 2
 *               id_faculty:
 *                 type: integer
 *                 description: ID факультета
 *                 example: 669
 *               title_ru:
 *                 type: string
 *                 description: Заголовок на русском
 *                 example: "Важное объявление"
 *               title_en:
 *                 type: string
 *                 description: Заголовок на английском
 *                 example: "Important announcement"
 *               notification_ru:
 *                 type: string
 *                 description: Текст уведомления на русском
 *                 example: "Текст уведомления..."
 *               notification_en:
 *                 type: string
 *                 description: Текст уведомления на английском
 *                 example: "Notification text..."
 *     responses:
 *       200:
 *         description: Уведомление успешно создано
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.post("/",authorize_1.isUniversityToken,ctrl.createNotification),
/**
 * @swagger
 * /api/notification/{id_notification}:
 *   put:
 *     tags:
 *       - Notification
 *     summary: Обновить уведомление
 *     description: Обновляет существующее уведомление. Требуется роль университета (role 3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_notification
 *         in: path
 *         required: true
 *         description: ID уведомления
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_learning
 *               - id_education_language
 *               - id_faculty
 *               - title_ru
 *               - notification_ru
 *             properties:
 *               id_learning:
 *                 type: integer
 *                 example: 1
 *               id_education_language:
 *                 type: integer
 *                 example: 2
 *               id_faculty:
 *                 type: integer
 *                 example: 669
 *               title_ru:
 *                 type: string
 *                 example: "Обновленный заголовок"
 *               title_en:
 *                 type: string
 *                 example: "Updated title"
 *               notification_ru:
 *                 type: string
 *                 example: "Обновленный текст..."
 *               notification_en:
 *                 type: string
 *                 example: "Updated text..."
 *     responses:
 *       200:
 *         description: Уведомление успешно обновлено
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.put("/:id_notification",authorize_1.isUniversityToken,ctrl.updateNotification),
/**
 * @swagger
 * /api/notification/{id_notification}:
 *   delete:
 *     tags:
 *       - Notification
 *     summary: Удалить уведомление
 *     description: Удаляет уведомление. Требуется роль университета (role 3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_notification
 *         in: path
 *         required: true
 *         description: ID уведомления
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Уведомление успешно удалено
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.delete("/:id_notification",authorize_1.isUniversityToken,ctrl.deleteNotification),exports.default=router},5800:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getShutdownStatus=function(){return isShuttingDown},exports.setShutdownStatus=function(status){isShuttingDown=status},exports.gracefulShutdown=async function(server,signal){if(isShuttingDown)return void console.log("⚠️  Shutdown already in progress...");isShuttingDown=!0,console.log(`\n⚠️  Shutting down (${signal})...`);const forceExitTimer=setTimeout(()=>{console.error("❌ Shutdown timeout - forcing exit"),process.exit(1)},5e3);try{await Promise.race([new Promise((resolve,reject)=>{server.close(err=>{err?reject(err):resolve()})}),new Promise((_,reject)=>setTimeout(()=>reject(new Error("Server close timeout")),3e3))]),console.log("✅ HTTP server closed"),await Promise.race([db_1.default.end(),new Promise((_,reject)=>setTimeout(()=>reject(new Error("Database close timeout")),2e3))]),console.log("✅ Database connections closed");const redisClient=(0,cache_1.getRedisClient)();redisClient&&(await Promise.race([redisClient.quit(),new Promise((_,reject)=>setTimeout(()=>reject(new Error("Redis close timeout")),1e3))]),console.log("✅ Redis connection closed")),console.log("✅ Graceful shutdown complete"),clearTimeout(forceExitTimer),process.exit(0)}catch(error){console.error("❌ Shutdown error:",error),clearTimeout(forceExitTimer),process.exit(1)}};const db_1=__importDefault(__webpack_require__(6067)),cache_1=__webpack_require__(9982);let isShuttingDown=!1},5946:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const file_1=__importDefault(__webpack_require__(5560)),image_1=__webpack_require__(1653);const FileService={saveFile:async function(filePath,sampleFile){try{return await sampleFile.mv(filePath),!0}catch(error){return console.error("❌ error FileService.saveFile: ",error.message),!1}},saveImage:async function(filePath,fileData,width=300){return await(0,image_1.resizeImage)({input:fileData,outputPath:filePath,width})},removeFile:async function(filePath){file_1.default.deleteFile(filePath)}};exports.default=FileService},5967:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.SpecialtyController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),specialty_schema_1=__webpack_require__(288),specialty_service_1=__webpack_require__(5032);exports.SpecialtyController=class{constructor(){this.service=new specialty_service_1.SpecialtyService,this.getSpecialtiesByDirection=async(req,res,next)=>{try{const id_direction=(0,helpers_1.toNumber)(req.params.id_direction);if(!id_direction)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getSpecialtiesByDirection(id_users,id_direction,id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.createSpecialty=async(req,res,next)=>{try{const{isValid,data}=(0,validation_1.validate)(specialty_schema_1.createSpecialtySchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.createSpecialty(id_users,data);return"INSERT"===result?(0,response_1.sendSuccess)(res,req.t("createSuccess")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorCreate"))}catch(error){next(error)}},this.updateSpecialty=async(req,res,next)=>{try{const id_specialty=(0,helpers_1.toNumber)(req.params.id_specialty);if(!id_specialty)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(specialty_schema_1.updateSpecialtySchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.updateSpecialty(id_users,id_specialty,data);return"UPDATE"===result?(0,response_1.sendSuccess)(res,req.t("updateSuccess")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){next(error)}},this.deleteSpecialty=async(req,res,next)=>{try{const id_specialty=(0,helpers_1.toNumber)(req.params.id_specialty);if(!id_specialty)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await this.service.deleteSpecialty(id_users,id_specialty);return"DELETE"===result?(0,response_1.sendSuccess)(res,req.t("deleteSuccess")):"There is a connection to another table"===result?(0,response_1.sendError)(res,req.t("hasRelations"),!1,409):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){next(error)}}}}},6058:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.AuthService=void 0;const crypto_1=__importDefault(__webpack_require__(8749)),jsonwebtoken_1=__webpack_require__(829),crypto_2=__webpack_require__(9095),httpError_1=__webpack_require__(7178),jwt_1=__webpack_require__(3481),session_1=__webpack_require__(7372),transliterate_1=__webpack_require__(3524),auth_repository_1=__webpack_require__(1949);exports.AuthService=class{constructor(){this.authRepository=new auth_repository_1.AuthRepository}async generateAuthToken(user){return{authState:user,token:(0,jwt_1.signToken)({...user}),tokenType:"Bearer"}}async getUserByPinPassword(data){const{login,password,role}=data,hashPassword=(0,crypto_2.md5)(password);return await this.authRepository.findUserByPinPasswordAuth({login,hashPassword,id_role:role})}async userLogin(req,res,login,authState){try{const result=await this.generateAuthToken(authState);return await(0,session_1.Login)(req,res,authState.role,login,result.authState.id,result.token)?result:null}catch(error){throw console.error("❌ AuthService.userLogin error:",error.message),error}}async userCheck(req){const authHeader=req.headers.authorization;if(!authHeader||!authHeader.startsWith("Bearer "))throw new httpError_1.HttpError("token.token_required",401);const token=authHeader.split(" ")[1];try{const authState=(0,jwt_1.verifyToken)(token);return await(0,session_1.Check)(token,authState.role)?{authState,token,tokenType:"Bearer"}:null}catch(error){if(error instanceof jsonwebtoken_1.TokenExpiredError)throw new httpError_1.HttpError("token.expired",401);throw console.error("❌ AuthService.userLogin error:",error.message),error}}async authInfo(authState,baseUrl){try{const authInfo=await this.authRepository.findUserAuthInfo(authState);if(authInfo){const{file_name}=authInfo;return authInfo.file_name=file_name?baseUrl+`/api/settings/avatar/${authInfo.file_name}`:null,authInfo}return null}catch(error){throw console.error("❌ AuthService.authInfo error:",error.message),error}}async userLogout(req,res){try{const authHeader=req.headers.authorization;if(!authHeader||!authHeader.startsWith("Bearer "))return!1;const token=authHeader.split(" ")[1];return(0,session_1.Delete)(res,token)}catch(error){throw console.error("❌ AuthService.userLogout error:",error.message),error}}async registerAbiturient(data){try{const password=crypto_1.default.randomBytes(4).toString("hex"),hashPassword=(0,crypto_2.md5)(password),transliteratedNames=(0,transliterate_1.transliterateFullName)({surname:data.surname,names:data.names,patronymic:data.patronymic}),{rows}=await this.authRepository.registerAbiturient({id_lang:data.id_lang,surname:transliteratedNames.surname,names:transliteratedNames.names,patronymic:transliteratedNames.patronymic,surname_en:transliteratedNames.surname_en,names_en:transliteratedNames.names_en,patronymic_en:transliteratedNames.patronymic_en,birth_date:data.birth_date,id_gender:data.id_gender,passport:data.passport,passport_date:data.passport_date,id_country:data.id_country,email:data.email,hashPassword,telephone:data.telephone}),sms=rows[0]?.sms||"NO_RESULT";return{sms,password:"INSERT"===sms?password:void 0}}catch(error){throw console.error("❌ AuthService.registerAbiturient error:",error.message),error}}}},6067:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.connectToDB=exports.dbQuery=void 0;const pg_1=__webpack_require__(2449),crypto_1=__webpack_require__(9095),env_1=__webpack_require__(6138),pool=new pg_1.Pool({connectionString:(()=>{try{const encrypted=env_1.ENV.DB.CONNECTION_STRING;if(!encrypted)throw new Error("DB_CONNECTION_STRING is not set in environment variables");const decrypted=(0,crypto_1.decrypt)(encrypted);if(!decrypted||"string"!=typeof decrypted)throw new Error("Decrypted connection string is invalid");return decrypted.startsWith("postgres://")||decrypted.startsWith("postgresql://")||console.warn("⚠️  Warning: DB connection string doesn't start with postgres:// or postgresql://"),decrypted}catch(error){throw console.error("❌ Failed to decrypt DB_CONNECTION_STRING"),console.error("This usually means:"),console.error("1. DB_CONNECTION_STRING in .env is not encrypted"),console.error("2. ENC_KEY_BASE64 or ENC_IV_BASE64 are incorrect"),console.error("3. DB_CONNECTION_STRING was encrypted with different keys"),console.error("\nError details:",error instanceof Error?error.message:error),error}})()});exports.dbQuery=async(text,params)=>{try{return"development"===env_1.ENV.NODE_ENV&&console.log("PG query:",{text,params}),await pool.query(text,params)}catch(error){throw console.error("❌ PG ERROR =>",error),console.log("PG query:",{text,params}),error}};exports.connectToDB=async()=>{try{await pool.query("SELECT 1"),console.log("✅ Connected to database")}catch(err){console.error("❌ DB connection failed:",err),process.exit(1)}},exports.default=pool},6102:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.UniversityService=void 0;const iud_1=__webpack_require__(1442),university_repository_1=__webpack_require__(6233);exports.UniversityService=class{constructor(){this.repository=new university_repository_1.UniversityRepository}async getAllUniversity(id_lang){return await this.repository.findUniversityForMinistry(id_lang)}async getUniversitiesForMinistrySelector(data){return await this.repository.findUniversitiesForMinistrySelector(data)}async getLevelEducationSelector(id_users,id_lang){return await this.repository.findLevelEducationSelector(id_users,id_lang)}async createUniversity(id_users,data){const{rows}=await this.repository.universityIUD({id_users,iud:iud_1.IUDOperation.INSERT,university_name:data.university_name,university_name_en:data.university_name_en,id_region:data.id_region,winter_visible:data.winter_visible});return rows[0]?.sms||"NO_RESPONSE"}async updateUniversity(id_users,id_university,data){const{rows}=await this.repository.universityIUD({id_users,iud:iud_1.IUDOperation.UPDATE,id_university,university_name:data.university_name,university_name_en:data.university_name_en,id_region:data.id_region,winter_visible:data.winter_visible});return rows[0]?.sms||"NO_RESPONSE"}async getUncheckedCount(id_users,id_lang){return await this.repository.findUncheckedCount(id_users,id_lang)}async getApplicantsReport(id_user,id_role,language,id_university,id_year,id_ws){const{rows}=await this.repository.getApplicantsReport(id_user,id_role,language,id_university,id_year,id_ws);return rows}}},6115:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const country_route_1=__importDefault(__webpack_require__(9530));exports.default=country_route_1.default},6138:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.ENV=void 0;const dotenv_1=__importDefault(__webpack_require__(818)),env_1=__webpack_require__(6547);dotenv_1.default.config(),exports.ENV={NODE_ENV:"production",PORT:parseInt(process.env.PORT||"3000",10),ALLOWED_ORIGINS:process.env.ALLOWED_ORIGINS||"",ENC_KEY_BASE64:(0,env_1.getEnv)("ENC_KEY_BASE64"),ENC_IV_BASE64:(0,env_1.getEnv)("ENC_IV_BASE64"),DB:{CONNECTION_STRING:(0,env_1.getEnv)("DB_CONNECTION_STRING")},JWT:{SECRET:(0,env_1.getEnv)("JWT_SECRET"),EXPIRES_IN:process.env.JWT_EXPIRES_IN||"10h"},CACHE:{CHECK:"true"===process.env.CACHE_CHECK,CONNECTION_STRING:process.env.CACHE_CONNECTION_STRING||""},EMAIL:{SECUIRITY_URL:(0,env_1.getEnv)("EMAIL_SECUIRITY_URL"),TYPE_CONFIRM:(0,env_1.getEnv)("EMAIL_TYPE_CONFIRM"),TYPE_RECOVER:(0,env_1.getEnv)("EMAIL_TYPE_RECOVER"),TYPE_INFO:(0,env_1.getEnv)("EMAIL_TYPE_INFO")},RECAPTCHA_CHECK:"true"===(0,env_1.getEnv)("RECAPTCHA_CHECK"),RECAPTCHA_SECRET:(0,env_1.getEnv)("RECAPTCHA_SECRET"),FILE_AVATAR_PATH:(0,env_1.getEnv)("FILE_AVATAR_PATH"),FILE_DOCUMENT_PATH:(0,env_1.getEnv)("FILE_DOCUMENT_PATH")}},6233:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.UniversityRepository=void 0;const db_1=__webpack_require__(6067);exports.UniversityRepository=class{async findUniversityForMinistry(id_lang){const values=[id_lang],{rows}=await(0,db_1.dbQuery)("SELECT * FROM fn_university_grid_for_ministry($1);",values);return rows}async findUniversitiesForMinistrySelector(data){const values=[data.id_users,data.id_lang,data.id_year,data.id_ws],{rows}=await(0,db_1.dbQuery)("SELECT * FROM fn_mon_universities_sel_mon($1, $2, $3, $4);",values);return rows}async findLevelEducationSelector(id_users,id_lang){const{rows}=await(0,db_1.dbQuery)("SELECT * FROM fn_mon_universities_level_education($1, $2);",[id_users,id_lang]);return rows}async universityIUD(params){const values=[params.id_users,params.iud,params.id_university??null,params.university_name??null,params.university_name_en??null,params.id_region??null,params.winter_visible??null,null];return await(0,db_1.dbQuery)("CALL p_mon_universities_iud($1, $2, $3, $4, $5, $6, $7, $8);",values)}async findUncheckedCount(id_users,id_lang){const{rows}=await(0,db_1.dbQuery)("SELECT * FROM fn_mon_universities_sel_count($1, $2);",[id_users,id_lang]);return rows[0]?.kol??0}async getApplicantsReport(id_user,id_role,language,id_university,id_year=0,id_ws=0){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_full($1, $2, $3, $4, $5, $6);",[id_user,id_role,language,id_university,id_year,id_ws])}async findFacultiesByUserId(id_users){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_faculty_grid($1);",[id_users])}async findFacultiesSelector(id_users,id_role,id_lang,id_university=0){return await(0,db_1.dbQuery)("SELECT * FROM fn_sel_faculty($1, $2, $3, $4);",[id_users,id_role,id_lang,id_university])}async manageFaculty(id_users,iud,id_faculty,data){const values=[id_users,iud,id_faculty,data.faculty||null,data.faculty_en||null,data.s_faculty||null,data.s_faculty_en||null,data.faculty_url||null,data.id_faculty_export||0];return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_faculty_grid_iud($1, $2, $3, $4, $5, $6, $7, $8, $9);",values)}}},6296:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),abiturient_controller_1=__webpack_require__(4808),router=(0,express_1.Router)(),ctrl=new abiturient_controller_1.AbiturientController;
/**
 * @swagger
 * /api/university/abiturient/list:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список абитуриентов
 *     description: Возвращает список абитуриентов с пагинацией и фильтрацией по специальности, типу финансирования, году и приемной кампании. Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_specialty
 *         in: query
 *         required: true
 *         description: ID специальности
 *         schema:
 *           type: integer
 *           example: 6129
 *       - name: id_bk
 *         in: query
 *         required: true
 *         description: ID типа финансирования (бюджет/контракт)
 *         schema:
 *           type: integer
 *           example: 2
 *       - name: id_years
 *         in: query
 *         required: true
 *         description: ID учебного года
 *         schema:
 *           type: integer
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: true
 *         description: ID приемной кампании (сезон приема)
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: page
 *         in: query
 *         required: false
 *         description: Номер страницы (по умолчанию 1)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *       - name: size
 *         in: query
 *         required: false
 *         description: Размер страницы
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *           example: 10
 *       - name: find
 *         in: query
 *         required: false
 *         description: Строка поиска по ФИО абитуриента
 *         schema:
 *           type: string
 *           example: ""
 *       - name: filter_type
 *         in: query
 *         required: false
 *         description: Тип фильтрации (пусто - все, rejected - отклоненные, selected - отобранные, revision - на доработку)
 *         schema:
 *           type: string
 *           enum: ["", "rejected", "selected", "revision"]
 *           default: ""
 *           example: ""
 *     responses:
 *       200:
 *         description: Список абитуриентов успешно получен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.get("/list",authorize_1.isUniversityToken,ctrl.getAbiturientGrid),
/**
 * @swagger
 * /api/university/abiturient/learning:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список типов обучения
 *     description: Возвращает доступные типы обучения для университета по году и приемной кампании. Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_years
 *         in: query
 *         required: true
 *         description: ID учебного года
 *         schema:
 *           type: integer
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: true
 *         description: ID приемной кампании (сезон приема)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Список типов обучения успешно получен
 */
router.get("/learning",authorize_1.isUniversityToken,ctrl.getLearningTypes),
/**
 * @swagger
 * /api/university/abiturient/education-language:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список языков обучения
 *     description: Возвращает доступные языки обучения для университета по типу обучения, году и приемной кампании. Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_learning
 *         in: query
 *         required: true
 *         description: ID типа обучения
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: id_years
 *         in: query
 *         required: true
 *         description: ID учебного года
 *         schema:
 *           type: integer
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: true
 *         description: ID приемной кампании (сезон приема)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Список языков обучения успешно получен
 */
router.get("/education-language",authorize_1.isUniversityToken,ctrl.getEducationLanguages),
/**
 * @swagger
 * /api/university/abiturient/faculty:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список факультетов
 *     description: Возвращает доступные факультеты для университета по языку обучения, типу обучения, году и приемной кампании. Для ролей 4 и 6 возвращает только те факультеты, к которым есть доступ. Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_el
 *         in: query
 *         required: true
 *         description: ID языка обучения
 *         schema:
 *           type: integer
 *           example: 2
 *       - name: id_learning
 *         in: query
 *         required: true
 *         description: ID типа обучения
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: id_years
 *         in: query
 *         required: true
 *         description: ID учебного года
 *         schema:
 *           type: integer
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: true
 *         description: ID приемной кампании (сезон приема)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Список факультетов успешно получен
 */
router.get("/faculty",authorize_1.isUniversityToken,ctrl.getFaculties),
/**
 * @swagger
 * /api/university/abiturient/specialty:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список специальностей
 *     description: Возвращает доступные специальности по языку обучения, факультету, типу обучения, году и приемной кампании. Специальности возвращаются с кодом специальности в формате "[код] название". Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_el
 *         in: query
 *         required: true
 *         description: ID языка обучения
 *         schema:
 *           type: integer
 *           example: 2
 *       - name: id_faculty
 *         in: query
 *         required: true
 *         description: ID факультета
 *         schema:
 *           type: integer
 *           example: 669
 *       - name: id_learning
 *         in: query
 *         required: true
 *         description: ID типа обучения
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: id_years
 *         in: query
 *         required: true
 *         description: ID учебного года
 *         schema:
 *           type: integer
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: true
 *         description: ID приемной кампании (сезон приема)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Список специальностей успешно получен
 */
router.get("/specialty",authorize_1.isUniversityToken,ctrl.getSpecialties),
/**
 * @swagger
 * /api/university/abiturient/bk:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить список типов финансирования (бюджет/контракт)
 *     description: Возвращает доступные типы финансирования (бюджет/контракт) по специальности, году и приемной кампании. Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_specialty
 *         in: query
 *         required: true
 *         description: ID специальности
 *         schema:
 *           type: integer
 *           example: 6129
 *       - name: id_years
 *         in: query
 *         required: true
 *         description: ID учебного года
 *         schema:
 *           type: integer
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: true
 *         description: ID приемной кампании (сезон приема)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Список типов финансирования успешно получен
 */
router.get("/bk",authorize_1.isUniversityToken,ctrl.getBudgetContractTypes),
/**
 * @swagger
 * /api/university/abiturient/stats:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить статистику абитуриентов
 *     description: Возвращает статистику по абитуриентам (всего, отклоненные, отобранные, на доработку) для указанной специальности и типа финансирования. Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_specialty
 *         in: query
 *         required: true
 *         description: ID специальности
 *         schema:
 *           type: integer
 *           example: 6129
 *       - name: id_bk
 *         in: query
 *         required: true
 *         description: ID типа финансирования (бюджет/контракт)
 *         schema:
 *           type: integer
 *           example: 2
 *       - name: id_years
 *         in: query
 *         required: true
 *         description: ID учебного года
 *         schema:
 *           type: integer
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: true
 *         description: ID приемной кампании (сезон приема)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Статистика успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_count:
 *                       type: integer
 *                       description: Всего заявлений
 *                       example: 50
 *                     rejected_count:
 *                       type: integer
 *                       description: Отклоненные заявления (id_status = 0)
 *                       example: 0
 *                     selected_count:
 *                       type: integer
 *                       description: Отобранные на учебу (otobran = true)
 *                       example: 0
 *                     revision_count:
 *                       type: integer
 *                       description: На доработку (id_status_mon = 5)
 *                       example: 0
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.get("/stats",authorize_1.isUniversityToken,ctrl.getStats),
/**
 * @swagger
 * /api/university/abiturient/details/{id_abiturient}/{id_movement}:
 *   get:
 *     tags:
 *       - University
 *     summary: Получить детальную информацию об абитуриенте
 *     description: Возвращает полную информацию об абитуриенте включая персональные данные, документы об образовании, статусы. Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_abiturient
 *         in: path
 *         required: true
 *         description: ID абитуриента
 *         schema:
 *           type: integer
 *           example: 17617
 *       - name: id_movement
 *         in: path
 *         required: true
 *         description: ID движения
 *         schema:
 *           type: integer
 *           example: 16734
 *     responses:
 *       200:
 *         description: Детальная информация об абитуриенте успешно получена
 */
router.get("/details/:id_abiturient/:id_movement",authorize_1.isUniversityToken,ctrl.getAbiturientDetails),
/**
 * @swagger
 * /api/university/abiturient/movement/{id_movement}:
 *   put:
 *     tags:
 *       - University
 *     summary: Обновить статус абитуриента
 *     description: Обновляет статус абитуриента в движении (рекомендация, баллы экзамена, отбор, статус). Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_movement
 *         in: path
 *         required: true
 *         description: ID движения абитуриента
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_plan
 *               - id_abiturient
 *               - recom
 *               - exam
 *               - otobran
 *               - id_status
 *             properties:
 *               recom:
 *                 type: boolean
 *                 description: Рекомендован
 *                 example: true
 *               exam:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 300
 *                 description: Баллы экзамена (0-300)
 *                 example: 250
 *               otobran:
 *                 type: boolean
 *                 description: Отобран
 *                 example: true
 *               id_status:
 *                 type: integer
 *                 description: ID статуса
 *                 example: 4
 *     responses:
 *       200:
 *         description: Статус абитуриента успешно обновлен
 *       400:
 *         description: Неверный формат данных или запись не найдена
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.put("/movement/:id_movement",authorize_1.isUniversityToken,ctrl.updateMovement),
/**
 * @swagger
 * /api/university/abiturient:
 *   post:
 *     tags:
 *       - University
 *     summary: Создать нового абитуриента
 *     description: |
 *       Создание нового абитуриента с персональными данными, документом об образовании и заявкой на план.
 *       Проверяет дубликаты по паспорту и email.
 *
 *       Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surname
 *               - names
 *               - id_gender
 *               - birth_date
 *               - passport
 *               - passport_date
 *               - id_country
 *               - email
 *               - password
 *               - telephone
 *               - id_education_doc
 *               - serial_number
 *               - date_document
 *               - name_org
 *               - id_plan
 *             properties:
 *               surname:
 *                 type: string
 *                 description: Фамилия
 *                 example: "Иванов"
 *               surname_en:
 *                 type: string
 *                 nullable: true
 *                 description: Фамилия (англ.)
 *                 example: "Ivanov"
 *               names:
 *                 type: string
 *                 description: Имя
 *                 example: "Иван"
 *               names_en:
 *                 type: string
 *                 nullable: true
 *                 description: Имя (англ.)
 *                 example: "Ivan"
 *               patronymic:
 *                 type: string
 *                 nullable: true
 *                 description: Отчество
 *                 example: "Иванович"
 *               patronymic_en:
 *                 type: string
 *                 nullable: true
 *                 description: Отчество (англ.)
 *                 example: null
 *               id_gender:
 *                 type: integer
 *                 description: ID пола
 *                 example: 1
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: Дата рождения
 *                 example: "2000-01-15"
 *               passport:
 *                 type: string
 *                 description: Номер паспорта
 *                 example: "AN1234567"
 *               passport_date:
 *                 type: string
 *                 format: date
 *                 description: Дата выдачи паспорта
 *                 example: "2018-05-20"
 *               id_country:
 *                 type: integer
 *                 description: ID страны
 *                 example: 1
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email
 *                 example: "ivanov@example.com"
 *               password:
 *                 type: string
 *                 description: Пароль
 *                 example: "password123"
 *               telephone:
 *                 type: string
 *                 description: Телефон
 *                 example: "+996555123456"
 *               id_education_doc:
 *                 type: integer
 *                 description: ID типа документа об образовании
 *                 example: 1
 *               serial_number:
 *                 type: string
 *                 description: Серийный номер документа
 *                 example: "АБ-123456"
 *               date_document:
 *                 type: string
 *                 format: date
 *                 description: Дата выдачи документа
 *                 example: "2020-06-25"
 *               name_org:
 *                 type: string
 *                 description: Название образовательной организации
 *                 example: "СШ №1 г. Бишкек"
 *               id_plan:
 *                 type: integer
 *                 description: ID плана приема
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Абитуриент успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_abiturient:
 *                       type: integer
 *                       example: 12345
 *       400:
 *         description: Неверный формат данных
 *       409:
 *         description: Дубликат (паспорт или email уже существует)
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.post("/",authorize_1.isUniversityToken,ctrl.createAbiturient),
/**
 * @swagger
 * /api/university/abiturient/{id_abiturient}:
 *   put:
 *     tags:
 *       - University
 *     summary: Обновить данные абитуриента
 *     description: |
 *       Обновление персональных данных и документа об образовании абитуриента.
 *
 *       Требуется роль университета (roles 3, 4, 6).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_abiturient
 *         in: path
 *         required: true
 *         description: ID абитуриента
 *         schema:
 *           type: integer
 *           example: 17617
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surname
 *               - names
 *               - id_gender
 *               - birth_date
 *               - passport
 *               - passport_date
 *               - id_country
 *               - email
 *               - password
 *               - telephone
 *               - id_education_doc
 *               - serial_number
 *               - date_document
 *               - name_org
 *             properties:
 *               surname:
 *                 type: string
 *                 description: Фамилия
 *               surname_en:
 *                 type: string
 *                 nullable: true
 *                 description: Фамилия (англ.)
 *               names:
 *                 type: string
 *                 description: Имя
 *               names_en:
 *                 type: string
 *                 nullable: true
 *                 description: Имя (англ.)
 *               patronymic:
 *                 type: string
 *                 nullable: true
 *                 description: Отчество
 *               patronymic_en:
 *                 type: string
 *                 nullable: true
 *                 description: Отчество (англ.)
 *               id_gender:
 *                 type: integer
 *                 description: ID пола
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: Дата рождения
 *               passport:
 *                 type: string
 *                 description: Номер паспорта
 *               passport_date:
 *                 type: string
 *                 format: date
 *                 description: Дата выдачи паспорта
 *               id_country:
 *                 type: integer
 *                 description: ID страны
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email
 *               password:
 *                 type: string
 *                 description: Пароль
 *               telephone:
 *                 type: string
 *                 description: Телефон
 *               id_education_doc:
 *                 type: integer
 *                 description: ID типа документа об образовании
 *               serial_number:
 *                 type: string
 *                 description: Серийный номер документа
 *               date_document:
 *                 type: string
 *                 format: date
 *                 description: Дата выдачи документа
 *               name_org:
 *                 type: string
 *                 description: Название образовательной организации
 *     responses:
 *       200:
 *         description: Данные абитуриента успешно обновлены
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       403:
 *         description: Доступ запрещен
 */
router.put("/:id_abiturient",authorize_1.isUniversityToken,ctrl.updateAbiturient),exports.default=router},6335:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.FacultyRepository=void 0;const db_1=__webpack_require__(6067);exports.FacultyRepository=class{async findFacultiesByUserId(id_users){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_faculty_grid($1);",[id_users])}async findFacultiesSelector(id_users,id_role,id_lang,id_university=0){return await(0,db_1.dbQuery)("SELECT * FROM fn_sel_faculty($1, $2, $3, $4);",[id_users,id_role,id_lang,id_university])}async manageFaculty(id_users,iud,id_faculty,data){const values=[id_users,iud,id_faculty,data.faculty||null,data.faculty_en||null,data.s_faculty||null,data.s_faculty_en||null,data.faculty_url??null,null];return await(0,db_1.dbQuery)("CALL p_vuz_faculty_grid_iud($1, $2, $3, $4, $5, $6, $7, $8, $9);",values)}}},6376:module=>{module.exports=require("express-fileupload")},6391:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.abiturientUpdateSchema=exports.abiturientCreateSchema=exports.abiturientStatsSchema=exports.abiturientDetailsSchema=exports.abiturientMovementUpdateSchema=exports.abiturientBkSchema=exports.abiturientSpecialtySchema=exports.abiturientFacultySchema=exports.abiturientEducationLanguageSchema=exports.abiturientLearningSchema=exports.abiturientGridSchema=exports.AbiturientFilterType=void 0;const zod_1=__webpack_require__(1569);exports.AbiturientFilterType={ALL:"",REJECTED:"rejected",SELECTED:"selected",REVISION:"revision"},exports.abiturientGridSchema=zod_1.z.object({id_specialty:zod_1.z.number().int().positive("ID специальности должен быть положительным числом"),id_bk:zod_1.z.number().int().positive("ID типа обучения должен быть положительным числом"),id_years:zod_1.z.number().int().positive("ID года должен быть положительным числом"),id_ws:zod_1.z.number().int().positive("ID приемной кампании должен быть положительным числом"),page:zod_1.z.number().int().min(1,"Номер страницы должен быть >= 1"),size:zod_1.z.number().int().min(1,"Размер страницы должен быть >= 1").max(100,"Размер страницы должен быть <= 100"),find:zod_1.z.string().default(""),filter_type:zod_1.z.enum(["","rejected","selected","revision"]).default("")}),exports.abiturientLearningSchema=zod_1.z.object({id_years:zod_1.z.number().int().positive("ID года должен быть положительным числом"),id_ws:zod_1.z.number().int().positive("ID приемной кампании должен быть положительным числом")}),exports.abiturientEducationLanguageSchema=zod_1.z.object({id_learning:zod_1.z.number().int().positive("ID типа обучения должен быть положительным числом"),id_years:zod_1.z.number().int().positive("ID года должен быть положительным числом"),id_ws:zod_1.z.number().int().positive("ID приемной кампании должен быть положительным числом")}),exports.abiturientFacultySchema=zod_1.z.object({id_el:zod_1.z.number().int().positive("ID языка обучения должен быть положительным числом"),id_learning:zod_1.z.number().int().positive("ID типа обучения должен быть положительным числом"),id_years:zod_1.z.number().int().positive("ID года должен быть положительным числом"),id_ws:zod_1.z.number().int().positive("ID приемной кампании должен быть положительным числом")}),exports.abiturientSpecialtySchema=zod_1.z.object({id_el:zod_1.z.number().int().positive("ID языка обучения должен быть положительным числом"),id_faculty:zod_1.z.number().int().positive("ID факультета должен быть положительным числом"),id_learning:zod_1.z.number().int().positive("ID типа обучения должен быть положительным числом"),id_years:zod_1.z.number().int().positive("ID года должен быть положительным числом"),id_ws:zod_1.z.number().int().positive("ID приемной кампании должен быть положительным числом")}),exports.abiturientBkSchema=zod_1.z.object({id_specialty:zod_1.z.number().int().positive("ID специальности должен быть положительным числом"),id_years:zod_1.z.number().int().positive("ID года должен быть положительным числом"),id_ws:zod_1.z.number().int().positive("ID приемной кампании должен быть положительным числом")}),exports.abiturientMovementUpdateSchema=zod_1.z.object({recom:zod_1.z.boolean(),exam:zod_1.z.number().int().min(0,"Баллы должны быть >= 0").max(300,"Баллы должны быть <= 300"),otobran:zod_1.z.boolean(),id_status:zod_1.z.number().int().positive("ID статуса должен быть положительным числом")}),exports.abiturientDetailsSchema=zod_1.z.object({id_abiturient:zod_1.z.number().int().positive("ID абитуриента должен быть положительным числом"),id_movement:zod_1.z.number().int().positive("ID движения должен быть положительным числом")}),exports.abiturientStatsSchema=zod_1.z.object({id_specialty:zod_1.z.number().int().positive("ID специальности должен быть положительным числом"),id_bk:zod_1.z.number().int().positive("ID типа обучения должен быть положительным числом"),id_years:zod_1.z.number().int().positive("ID года должен быть положительным числом"),id_ws:zod_1.z.number().int().positive("ID приемной кампании должен быть положительным числом")});const abiturientBaseSchema=zod_1.z.object({surname:zod_1.z.string().min(1,"Фамилия обязательна"),surname_en:zod_1.z.string().nullable().default(null),names:zod_1.z.string().min(1,"Имя обязательно"),names_en:zod_1.z.string().nullable().default(null),patronymic:zod_1.z.string().nullable().default(null),patronymic_en:zod_1.z.string().nullable().default(null),id_gender:zod_1.z.number().int().positive("ID пола должен быть положительным"),birth_date:zod_1.z.string().min(1,"Дата рождения обязательна"),passport:zod_1.z.string().min(1,"Паспорт обязателен"),passport_date:zod_1.z.string().min(1,"Дата выдачи паспорта обязательна"),id_country:zod_1.z.number().int().positive("ID страны должен быть положительным"),email:zod_1.z.string().email("Неверный формат email"),password:zod_1.z.string().min(1,"Пароль обязателен"),telephone:zod_1.z.string().min(1,"Телефон обязателен"),id_education_doc:zod_1.z.number().int().positive("ID документа об образовании обязателен"),serial_number:zod_1.z.string().min(1,"Серийный номер обязателен"),date_document:zod_1.z.string().min(1,"Дата документа обязательна"),name_org:zod_1.z.string().min(1,"Название организации обязательно")});exports.abiturientCreateSchema=abiturientBaseSchema.extend({id_plan:zod_1.z.number().int().positive("ID плана должен быть положительным")}),exports.abiturientUpdateSchema=abiturientBaseSchema},6427:module=>{module.exports=require("i18next")},6547:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.getEnv=void 0;exports.getEnv=key=>{const value=process.env[key];if(!value)throw new Error(`Missing env variable: ${key}`);return value}},6727:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NotificationController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),notification_schema_1=__webpack_require__(4104),notification_service_1=__webpack_require__(5264);exports.NotificationController=class{constructor(){this.service=new notification_service_1.NotificationService,this.getAbiturientNotifications=async(req,res,next)=>{try{const id_abiturient=req.user?.id;if(!id_abiturient)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await this.service.getAbiturientNotifications(id_lang,id_abiturient);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.getUniversityNotifications=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const result=await this.service.getUniversityNotifications(id_users);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return next(error)}},this.createNotification=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const{isValid,data}=(0,validation_1.validate)(notification_schema_1.createNotificationSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await this.service.createNotification(id_users,data);return"INSERT"===result.sms?(0,response_1.sendSuccess)(res,req.t("successAdd"),{id_notification:result.out_id_notification}):"ACCESS_DENIED"===result.sms?(0,response_1.sendError)(res,req.t("accessDenied"),!1,403):(0,response_1.sendError)(res,req.t("errorAdd"))}catch(error){return next(error)}},this.updateNotification=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_notification=(0,helpers_1.toNumber)(req.params.id_notification);if(!id_notification)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(notification_schema_1.updateNotificationSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await this.service.updateNotification(id_users,id_notification,data);return"UPDATE"===result.sms?(0,response_1.sendSuccess)(res,req.t("successUpdate")):"ACCESS_DENIED"===result.sms?(0,response_1.sendError)(res,req.t("accessDenied"),!1,403):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return next(error)}},this.deleteNotification=async(req,res,next)=>{try{const id_users=req.user?.id;if(!id_users)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_notification=(0,helpers_1.toNumber)(req.params.id_notification);if(!id_notification)return(0,response_1.sendError)(res,req.t("inValidFormat"));const result=await this.service.deleteNotification(id_users,id_notification);return"DELETE"===result.sms?(0,response_1.sendSuccess)(res,req.t("successDelete")):"ACCESS_DENIED"===result.sms?(0,response_1.sendError)(res,req.t("accessDenied"),!1,403):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){return next(error)}}}}},6731:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.SpecialtyRepository=void 0;const db_1=__webpack_require__(6067);exports.SpecialtyRepository=class{async getSpecialtiesByDirection(id_users,id_direction,id_lang){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_specialty_grid($1, $2, $3)",[id_users,id_direction,id_lang])}async manageSpecialty(id_users,iud,data){const values=[id_users,iud,data.id_specialty,data.id_direction,data.specialty_cipher,data.specialty,data.specialty_en,data.id_learning,data.id_education_language,data.id_profession,""];return await(0,db_1.dbQuery)("CALL p_vuz_specialty_grid_iud($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",values)}}},6796:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlanService=void 0;const iud_1=__webpack_require__(1442),plan_repository_1=__webpack_require__(335);exports.PlanService=class{constructor(){this.repository=new plan_repository_1.PlanRepository}async getPlanBySpecialtyAndBkAndYearAndWs(id_specialty,id_bk,id_years,id_ws){const{rows}=await this.repository.findBySpecialtyAndBkAndYearAndWs(id_specialty,id_bk,id_years,id_ws);return rows}async getPlanGrid(id_users,id_role,language,id_direction,id_year,id_ws){const{rows}=await this.repository.findPlanGrid(id_users,id_role,language,id_direction||0,id_year||0,id_ws||1);return rows}async createPlan(id_users,data){const{rows}=await this.repository.managePlan(id_users,iud_1.IUDOperation.INSERT,0,data.id_specialty,data.id_bk,data.kol_plan,data.smeta_doc,data.smeta_education,data.comments||"",data.comments_en||"",data.individual,data.id_control_type,data.smeta_near_abroad,data.smeta_far_abroad,data.id_year,data.id_ws);return rows[0]?.sms||""}async updatePlan(id_users,id_plan,data){const{rows}=await this.repository.managePlan(id_users,iud_1.IUDOperation.UPDATE,id_plan,data.id_specialty,data.id_bk,data.kol_plan,data.smeta_doc,data.smeta_education,data.comments||"",data.comments_en||"",data.individual,data.id_control_type,data.smeta_near_abroad,data.smeta_far_abroad,0,1);return rows[0]?.sms||""}async deletePlan(id_users,id_plan){const{rows}=await this.repository.managePlan(id_users,iud_1.IUDOperation.DELETE,id_plan,0,0,0,0,0,"","",!1,1,0,0,0,1);return rows[0]?.sms||""}}},6836:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateFacultySchema=exports.createFacultySchema=void 0;const zod_1=__webpack_require__(1569);exports.createFacultySchema=zod_1.z.object({faculty:zod_1.z.string().min(1).max(255),faculty_en:zod_1.z.string().min(1).max(255),s_faculty:zod_1.z.string().min(1).max(50),s_faculty_en:zod_1.z.string().min(1).max(50),faculty_url:zod_1.z.string().url().nullish()}),exports.updateFacultySchema=zod_1.z.object({faculty:zod_1.z.string().min(1).max(255),faculty_en:zod_1.z.string().min(1).max(255),s_faculty:zod_1.z.string().min(1).max(50),s_faculty_en:zod_1.z.string().min(1).max(50),faculty_url:zod_1.z.string().url().nullish()})},6843:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const direction_route_1=__importDefault(__webpack_require__(7306));exports.default=direction_route_1.default},6855:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.flushAll=exports.deletePattern=exports.deleteKey=exports.getCacheValue=exports.getKeys=exports.getStats=void 0;const cache_1=__importDefault(__webpack_require__(9982)),response_1=__webpack_require__(8369);exports.getStats=async(req,res)=>{try{const stats=await cache_1.default.getStats();(0,response_1.sendSuccess)(res,req.t("success"),stats)}catch(error){(0,response_1.sendError)(res,req.t("error"),!1,500)}};exports.getKeys=async(req,res)=>{try{const pattern=req.query.pattern||"*",keys=await cache_1.default.keys(pattern);(0,response_1.sendSuccess)(res,req.t("success"),{keys,count:keys.length})}catch(error){(0,response_1.sendError)(res,req.t("error"),!1,500)}};exports.getCacheValue=async(req,res)=>{try{const{key}=req.params;if(!await cache_1.default.exists(key))return(0,response_1.sendError)(res,req.t("cache.key_not_found"),!1,404);const value=await cache_1.default.get(key),ttl=await cache_1.default.ttl(key);(0,response_1.sendSuccess)(res,req.t("success"),{key,value,ttl,expiresIn:ttl>0?`${ttl} seconds`:-1===ttl?"never":"expired"})}catch(error){(0,response_1.sendError)(res,req.t("error"),!1,500)}};exports.deleteKey=async(req,res)=>{try{const{key}=req.params;if(!await cache_1.default.exists(key))return(0,response_1.sendError)(res,req.t("cache.key_not_found"),!1,404);await cache_1.default.del(key),(0,response_1.sendSuccess)(res,req.t("cache.deleted"),{key})}catch(error){(0,response_1.sendError)(res,req.t("error"),!1,500)}};exports.deletePattern=async(req,res)=>{try{const{pattern}=req.params,deleted=await cache_1.default.deletePattern(pattern);(0,response_1.sendSuccess)(res,req.t("cache.pattern_deleted"),{pattern,deleted})}catch(error){(0,response_1.sendError)(res,req.t("error"),!1,500)}};exports.flushAll=async(req,res)=>{try{await cache_1.default.flushAll(),(0,response_1.sendSuccess)(res,req.t("cache.flushed"))}catch(error){(0,response_1.sendError)(res,req.t("error"),!1,500)}}},6898:module=>{module.exports=require("cookie-parser")},6928:module=>{module.exports=require("path")},6966:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),specialty_controller_1=__webpack_require__(5967),router=(0,express_1.Router)(),ctrl=new specialty_controller_1.SpecialtyController;
/**
 * @swagger
 * /api/specialty/direction/{id_direction}:
 *   get:
 *     tags:
 *       - Specialty
 *     summary: Получить список специальностей по направлению
 *     description: Возвращает список специальностей для выбранного направления подготовки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_direction
 *         in: path
 *         required: true
 *         description: ID направления подготовки
 *         schema:
 *           type: integer
 *           example: 1858
 *     responses:
 *       200:
 *         description: Список специальностей успешно получен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.get("/direction/:id_direction",authorize_1.isUniversityToken,ctrl.getSpecialtiesByDirection),
/**
 * @swagger
 * /api/specialty:
 *   post:
 *     tags:
 *       - Specialty
 *     summary: Создать новую специальность
 *     description: Создает новую специальность в рамках направления подготовки
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_direction
 *               - specialty_cipher
 *               - specialty
 *               - specialty_en
 *               - id_learning
 *               - id_education_language
 *               - id_profession
 *             properties:
 *               id_direction:
 *                 type: integer
 *                 example: 1
 *               specialty_cipher:
 *                 type: string
 *                 example: "09.03.01"
 *               specialty:
 *                 type: string
 *                 example: "Информатика и вычислительная техника"
 *               specialty_en:
 *                 type: string
 *                 example: "Computer Science and Engineering"
 *               id_learning:
 *                 type: integer
 *                 example: 1
 *               id_education_language:
 *                 type: integer
 *                 example: 1
 *               id_profession:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Специальность успешно создана
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Дубликат записи
 */
router.post("/",authorize_1.isUniversityToken,ctrl.createSpecialty),
/**
 * @swagger
 * /api/specialty/{id_specialty}:
 *   put:
 *     tags:
 *       - Specialty
 *     summary: Обновить специальность
 *     description: Обновляет данные существующей специальности
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_specialty
 *         in: path
 *         required: true
 *         description: ID специальности
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialty_cipher
 *               - specialty
 *               - specialty_en
 *               - id_learning
 *               - id_education_language
 *               - id_profession
 *             properties:
 *               id_direction:
 *                 type: integer
 *                 example: 1
 *               specialty_cipher:
 *                 type: string
 *                 example: "09.03.01"
 *               specialty:
 *                 type: string
 *                 example: "Информатика и вычислительная техника"
 *               specialty_en:
 *                 type: string
 *                 example: "Computer Science and Engineering"
 *               id_learning:
 *                 type: integer
 *                 example: 1
 *               id_education_language:
 *                 type: integer
 *                 example: 1
 *               id_profession:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Специальность успешно обновлена
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Дубликат записи
 */
router.put("/:id_specialty",authorize_1.isUniversityToken,ctrl.updateSpecialty),
/**
 * @swagger
 * /api/specialty/{id_specialty}:
 *   delete:
 *     tags:
 *       - Specialty
 *     summary: Удалить специальность
 *     description: Удаляет специальность из системы
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_specialty
 *         in: path
 *         required: true
 *         description: ID специальности
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Специальность успешно удалена
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Специальность имеет связанные записи и не может быть удалена
 */
router.delete("/:id_specialty",authorize_1.isUniversityToken,ctrl.deleteSpecialty),exports.default=router},6967:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.CountryRepository=void 0;const db_1=__webpack_require__(6067);exports.CountryRepository=class{constructor(){this.findAllCountry=async()=>{try{const sql="SELECT * FROM country ORDER BY country.country;",{rows}=await(0,db_1.dbQuery)(sql);return rows}catch(error){const message=error instanceof Error?error.message:"Unknown error";throw console.error("❌ CountryRepository.findAllCountry error:",message),error}},this.countryIUD=async params=>{const values=[params.iud,params.id_country??null,params.country??null,params.country_en??null,params.agreement??null,params.agreement_year??null,params.spravka??null,params.id_country_type??null,params.ort??null,params.ort_max_ball??null,null,null];return await(0,db_1.dbQuery)("CALL p_mon_country_iud($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",values)}}}},7022:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.MyUniversityRepository=void 0;const db_1=__webpack_require__(6067);exports.MyUniversityRepository=class{async findUniversityByUserId(id_users){const{rows}=await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_university_sel($1);",[id_users]);return rows[0]||null}async updateMyUniversity(id_users,data){const values=[id_users,data.id_university,data.s_university,data.s_university_en,data.university_name,data.university_name_en,data.supervisor_position,data.supervisor_position_en,data.university_supervisor,data.university_supervisor_en,data.university_url,data.university_address,data.university_address_en,""],{rows}=await(0,db_1.dbQuery)("CALL p_vuz_university_upd($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);",values);return rows[0]}async findUniversityUsers(id_users,language){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_users_university_grid($1, $2);",[id_users,language])}async manageUniversityUser(id_users,iud,id_users_university,data){return await(0,db_1.dbQuery)("CALL p_vuz_users_university_iud($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);",[id_users,iud,id_users_university,data.fio,data.fio_en,data.login,data.hashPassword,data.id_role,data.mobile,data.whatsapp,data.telegram,data.email,data.instagram,data.facebook,data.photoName||null,null,""])}async updateUniversityUserAccess(accessData){const jsonParam=JSON.stringify(accessData);return await(0,db_1.dbQuery)("CALL p_vuz_users_university_access_ins($1, $2, $3);",[jsonParam,null,null])}async manageUniversityUserDocument(iud,id_users_university,url_document){return await(0,db_1.dbQuery)("CALL p_vuz_users_university_document_iud($1, $2, $3, $4);",[iud,id_users_university,url_document,""])}async findUniversityUserPhotos(id_users_university){return await(0,db_1.dbQuery)("SELECT * FROM users_university_photo WHERE id_users_university = $1;",[id_users_university])}}},7076:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbiturientService=void 0;const env_1=__webpack_require__(6138),FileService_1=__importDefault(__webpack_require__(5946)),file_1=__importDefault(__webpack_require__(5560)),abiturient_repository_1=__webpack_require__(9175),FILE_DOCUMENT_PATH=env_1.ENV.FILE_DOCUMENT_PATH;exports.AbiturientService=class{constructor(){this.repository=new abiturient_repository_1.AbiturientRepository}async getPersonalInfo(id_abiturient,id_lang){const{rows}=await this.repository.findPersonalInfo(id_abiturient,id_lang);return rows[0]||null}async updateAbitPersonalInfo(id_abiturient,data){const{rows}=await this.repository.updateAbitInfoById(id_abiturient,data);return rows[0]?.result_message??"NO_RESPONSE"}async getAbitDocuments(data,baseUrl){const{rows}=await this.repository.findAbitDocuments(data.id_abiturient,data.id_lang);if(rows.length>0)for(const row of rows){const urlFile=row?.abiturient_url_file;urlFile&&(row.abiturient_url_file=`${baseUrl}/api/abiturient/documents/file/${urlFile}`)}return rows}async getApplicationsByAbiturient(data){const{rows}=await this.repository.findApplicationsByAbiturient(data);return rows}async applyToUniversity(data){const{rows}=await this.repository.applicationsAbiturientIUD({iud:0,id_movement:0,...data});return rows[0]?.sms||"NO_RESPONSE"}async canselToUniversity(data){const{rows}=await this.repository.applicationsAbiturientIUD({id_abiturient:data.id_abiturient,id_plan:0,id_movement:data.id_movement,iud:2});return rows[0]?.sms||"NO_RESPONSE"}async getEducationLanguage(id_lang){const{rows}=await this.repository.findEducationLanguage(id_lang);return rows}async getRegionByIdEduLang(data){const{rows}=await this.repository.findRegionByIdEduLang(data);return rows}async getUniversityByRegion(data){const{rows}=await this.repository.findUniversityByRegion(data);return rows}async getFacultyByUniversity(data){const{rows}=await this.repository.findFacultyByUniversity(data);return rows}async getDirectionByFaculty(data){const{rows}=await this.repository.findDirectionByFaculty(data);return rows}async getBkByDirection(data){const{rows}=await this.repository.findBkByDirection(data);return rows}async getSpecialtyByDirectionAndBk(data){const{rows}=await this.repository.findSpecialtyByDirectionAndBk(data);return rows}async getFormEducation(data){const{rows}=await this.repository.findFormEducation(data);return rows}async checkExistEmail(email){const{rows}=await this.repository.existEmailAbit(email);return rows[0]?.exists??!1}async insUpdateDocumentAbiturient(authState,data){let result_message="NO_RESPONSE";const{rows}=await this.repository.abitDocumentIUD(authState.id,authState.role,data);return 0!==rows.length&&(result_message=rows[0]?.sms,console.log("📝 insUpdateDocumentAbiturient result_message:",result_message),"UPDATE"===result_message||"INSERT"===result_message)}async uploadDocumentImage(fileName,fileData){const filePath=`${FILE_DOCUMENT_PATH}/${fileName}`;return await FileService_1.default.saveImage(filePath,fileData,600)}async uploadDocumentFile(fileName,sampleFile){const filePath=`${FILE_DOCUMENT_PATH}/${fileName}`;return await FileService_1.default.saveFile(filePath,sampleFile)}async deleteUploadDocuments(fileName){const filePath=`${FILE_DOCUMENT_PATH}/${fileName}`;return await FileService_1.default.removeFile(filePath)}async getUploadAbsolutePath(fileName){const filePath=`${FILE_DOCUMENT_PATH}/${fileName}`;return await file_1.default.exists(filePath)?filePath:null}async getAbitDocument(data){const{rows}=await this.repository.findAbitDocument(data);return rows[0]?.abiturient_url_file??null}async saveAbitDocument(data,file,authState){try{const{id_abiturient,id_document}=data,oldFileName=await this.getAbitDocument(data);let ext=file.name.split(".").pop()?.toLowerCase()||"bin";const isImage=file.mimetype.startsWith("image/");ext=isImage?"png":ext;const fileName=`${id_abiturient}_${id_document}_${Date.now()}.${ext}`;if(!(isImage?await this.uploadDocumentImage(fileName,file.data):await this.uploadDocumentFile(fileName,file)))return!1;const result=await this.insUpdateDocumentAbiturient(authState,{...data,iud:0,fileName});return setImmediate(async()=>{result?oldFileName&&await this.deleteUploadDocuments(oldFileName):await this.deleteUploadDocuments(fileName)}),result}catch(error){return console.error("❌ AbiturientService.saveAbitDocument error:",error.message),!1}}async abitPhotoIUD(id_abiturient,photo){const{rows}=await this.repository.abiturientPhotoIUD(id_abiturient,photo),result_message=rows[0]?.sms||"NO_RESPONSE";return"INSERT"===result_message||"UPDATE"===result_message}}},7141:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.verifyRecaptcha=async function(responseToken,data){const isCheck=env_1.ENV.RECAPTCHA_CHECK;try{if(!isCheck)return!0;const secretKey=data?.key||env_1.ENV.RECAPTCHA_SECRET,url="https://www.google.com/recaptcha/api/siteverify",params=new URLSearchParams;params.append("secret",secretKey),params.append("response",responseToken),data?.ip&&params.append("remoteip",data.ip);const{data:result}=await axios_1.default.post(url,params);return!!result.success}catch(error){throw console.error("❌ verifyRecaptcha error:",error.message),new Error(error)}};const axios_1=__importDefault(__webpack_require__(8938)),env_1=__webpack_require__(6138)},7165:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),abiturient_1=__importDefault(__webpack_require__(9310)),auth_1=__importDefault(__webpack_require__(89)),cache_route_1=__importDefault(__webpack_require__(8414)),country_1=__importDefault(__webpack_require__(6115)),direction_1=__importDefault(__webpack_require__(6843)),email_1=__importDefault(__webpack_require__(9237)),faculty_1=__importDefault(__webpack_require__(2565)),monitoring_1=__importDefault(__webpack_require__(545)),notification_1=__importDefault(__webpack_require__(7515)),plan_1=__importDefault(__webpack_require__(4792)),settings_1=__importDefault(__webpack_require__(9822)),shared_1=__importDefault(__webpack_require__(5490)),specialty_1=__importDefault(__webpack_require__(8205)),tour_1=__importDefault(__webpack_require__(3901)),university_1=__importDefault(__webpack_require__(9647)),users_1=__importDefault(__webpack_require__(2077)),response_1=__webpack_require__(8369),router=(0,express_1.Router)(),API_METADATA=Object.freeze({name:"EduGate API",version:"1.0.0",documentation:"/swagger/api-docs"}),STATIC_HEALTH_DATA=Object.freeze({status:"healthy",environment:"production",version:"1.0.0"});router.get("/health",(_req,res)=>(0,response_1.sendSuccess)(res,"ok",{...STATIC_HEALTH_DATA,timestamp:(new Date).toISOString(),uptime:Math.floor(process.uptime())})),router.get("/info",(_req,res)=>(0,response_1.sendSuccess)(res,"ok",API_METADATA)),router.use("/auth",auth_1.default),router.use("/users",users_1.default),router.use("/abiturient",abiturient_1.default),router.use("/cache",cache_route_1.default),router.use("/country",country_1.default),router.use("/direction",direction_1.default),router.use("/email",email_1.default),router.use("/faculty",faculty_1.default),router.use("/monitoring",monitoring_1.default),router.use("/notification",notification_1.default),router.use("/plan",plan_1.default),router.use("/settings",settings_1.default),router.use("/shared",shared_1.default),router.use("/specialty",specialty_1.default),router.use("/tour",tour_1.default),router.use("/university",university_1.default),router.use((req,res)=>(0,response_1.sendError)(res,req.t("error.notFound"),!1,404)),exports.default=router},7174:module=>{module.exports=require("compression")},7178:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.HttpError=void 0;class HttpError extends Error{constructor(message,statusCode=500,data){super(message),this.statusCode=statusCode,this.data=data,Object.setPrototypeOf(this,HttpError.prototype)}}exports.HttpError=HttpError},7252:module=>{module.exports=require("express")},7306:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),direction_controller_1=__webpack_require__(1651),router=(0,express_1.Router)(),ctrl=new direction_controller_1.DirectionController;
/**
 * @swagger
 * /api/direction/faculty/{id_faculty}:
 *   get:
 *     tags:
 *       - Direction
 *     summary: Получить список направлений по факультету
 *     description: Возвращает список направлений подготовки для выбранного факультета
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_faculty
 *         in: path
 *         required: true
 *         description: ID факультета
 *         schema:
 *           type: integer
 *           example: 669
 *     responses:
 *       200:
 *         description: Список направлений успешно получен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.get("/faculty/:id_faculty",authorize_1.isUniversityToken,ctrl.getDirectionsByFaculty),
/**
 * @swagger
 * /api/direction/selector:
 *   get:
 *     tags:
 *       - Direction
 *     summary: Получить селектор направлений
 *     description: Возвращает список направлений для выпадающего списка
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_faculty
 *         in: query
 *         required: true
 *         description: ID факультета
 *         schema:
 *           type: integer
 *           example: 669
 *     responses:
 *       200:
 *         description: Список направлений для селектора
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.get("/selector",authorize_1.isUniversityToken,ctrl.getDirectionsSelector),
/**
 * @swagger
 * /api/direction/learning/selector:
 *   get:
 *     tags:
 *       - Direction
 *     summary: Получить селектор форм обучения по направлению
 *     description: Возвращает список форм обучения для выбранного направления
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_direction
 *         in: query
 *         required: true
 *         description: ID направления
 *         schema:
 *           type: integer
 *           example: 1858
 *     responses:
 *       200:
 *         description: Список форм обучения для селектора
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.get("/learning/selector",authorize_1.isUniversityToken,ctrl.getLearningSelector),
/**
 * @swagger
 * /api/direction/education-language/selector:
 *   get:
 *     tags:
 *       - Direction
 *     summary: Получить селектор языков обучения по направлению и форме обучения
 *     description: Возвращает список языков обучения для выбранного направления и формы обучения
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_direction
 *         in: query
 *         required: true
 *         description: ID направления
 *         schema:
 *           type: integer
 *           example: 1858
 *       - name: id_learning
 *         in: query
 *         required: true
 *         description: ID формы обучения
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Список языков обучения для селектора
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.get("/education-language/selector",authorize_1.isUniversityToken,ctrl.getEducationLanguageSelector),
/**
 * @swagger
 * /api/direction/specialty/selector:
 *   get:
 *     tags:
 *       - Direction
 *     summary: Получить селектор специальностей
 *     description: Возвращает список специальностей для выбранного направления, формы обучения и языка обучения
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_direction
 *         in: query
 *         required: true
 *         description: ID направления
 *         schema:
 *           type: integer
 *           example: 1858
 *       - name: id_learning
 *         in: query
 *         required: true
 *         description: ID формы обучения
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: id_education_language
 *         in: query
 *         required: true
 *         description: ID языка обучения
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Список специальностей для селектора
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.get("/specialty/selector",authorize_1.isUniversityToken,ctrl.getSpecialtySelector),
/**
 * @swagger
 * /api/direction:
 *   post:
 *     tags:
 *       - Direction
 *     summary: Создать новое направление подготовки
 *     description: Создает новое направление подготовки в рамках факультета
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_faculty
 *               - direction_cipher
 *               - direction
 *               - direction_en
 *             properties:
 *               id_faculty:
 *                 type: integer
 *                 example: 1
 *               direction_cipher:
 *                 type: string
 *                 example: "09.03.00"
 *               direction:
 *                 type: string
 *                 example: "Информатика и вычислительная техника"
 *               direction_en:
 *                 type: string
 *                 example: "Computer Science and Engineering"
 *     responses:
 *       200:
 *         description: Направление успешно создано
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Дубликат записи
 */
router.post("/",authorize_1.isUniversityToken,ctrl.createDirection),
/**
 * @swagger
 * /api/direction/{id_direction}:
 *   put:
 *     tags:
 *       - Direction
 *     summary: Обновить направление подготовки
 *     description: Обновляет данные существующего направления подготовки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_direction
 *         in: path
 *         required: true
 *         description: ID направления
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - direction_cipher
 *               - direction
 *               - direction_en
 *             properties:
 *               direction_cipher:
 *                 type: string
 *                 example: "09.03.00"
 *               direction:
 *                 type: string
 *                 example: "Информатика и вычислительная техника"
 *               direction_en:
 *                 type: string
 *                 example: "Computer Science and Engineering"
 *     responses:
 *       200:
 *         description: Направление успешно обновлено
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Дубликат записи
 */
router.put("/:id_direction",authorize_1.isUniversityToken,ctrl.updateDirection),
/**
 * @swagger
 * /api/direction/{id_direction}:
 *   delete:
 *     tags:
 *       - Direction
 *     summary: Удалить направление подготовки
 *     description: Удаляет направление подготовки из системы
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_direction
 *         in: path
 *         required: true
 *         description: ID направления
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Направление успешно удалено
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Направление имеет связанные записи и не может быть удалено
 */
router.delete("/:id_direction",authorize_1.isUniversityToken,ctrl.deleteDirection),exports.default=router},7360:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbiturientRepository=void 0;const db_1=__webpack_require__(6067);exports.AbiturientRepository=class{async findAbitGrid(id_user,id_role,id_lang,data){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_grid($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",[id_user,id_role,id_lang,data.id_specialty,data.id_bk,data.id_years,data.id_ws,data.page,data.size,data.find,data.filter_type])}async findLearningTypes(data){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_learning($1, $2, $3, $4, $5, $6);",[data.id_user,data.id_role,data.id_lang,data.id_university,data.id_years,data.id_ws])}async findEducationLanguages(data){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_el($1, $2, $3, $4, $5, $6, $7);",[data.id_user,data.id_role,data.id_lang,data.id_university,data.id_learning,data.id_years,data.id_ws])}async findFaculties(data){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_faculty($1, $2, $3, $4, $5, $6, $7, $8);",[data.id_user,data.id_role,data.id_lang,data.id_university,data.id_el,data.id_learning,data.id_years,data.id_ws])}async findSpecialties(data){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_specialty($1, $2, $3, $4, $5, $6, $7, $8);",[data.id_user,data.id_role,data.id_lang,data.id_el,data.id_faculty,data.id_learning,data.id_years,data.id_ws])}async findBudgetContractTypes(data){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_bk($1, $2, $3, $4, $5, $6);",[data.id_user,data.id_role,data.id_lang,data.id_specialty,data.id_years,data.id_ws])}async updateMovement(id_user,id_role,id_movement,data){const values=[id_movement,data.recom,data.exam,data.otobran,data.id_status,id_user,id_role,""];return await(0,db_1.dbQuery)("CALL p_movement_status_update($1, $2, $3, $4, $5, $6, $7, $8);",values)}async findAbiturientDetails(data){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_personal_info($1, $2, $3);",[data.id_abiturient,data.id_movement,data.id_lang])}async findStats(data){const values=[data.id_specialty,data.id_bk,data.id_years,data.id_ws,data.id_lang];return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_stats($1, $2, $3, $4, $5);",values)}async abiturientIud(id_user,id_role,iud,id_abiturient,data){const values=[iud,id_abiturient,data.surname,data.surname_en||"",data.names,data.names_en||"",data.patronymic||"",data.patronymic_en||"",data.id_gender,data.birth_date,data.passport,data.passport_date,data.id_country,data.email,data.password,data.telephone,data.id_education_doc,data.serial_number,data.date_document,data.name_org,data.id_plan,id_user,id_role,""];return await(0,db_1.dbQuery)("CALL p_vuz_abiturient_iud($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24);",values)}}},7372:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.Delete=async function(res,token){const cookieId=(0,crypto_1.md5)(token);res.clearCookie(COOKIE_NAME);const{command}=await(0,db_1.dbQuery)('UPDATE "Session" SET offline=true WHERE offline=false AND login IN (SELECT login FROM "Session" WHERE cookie=$1)',[cookieId]);return"UPDATE"===command},exports.GetUser=GetUser,exports.Check=async function(token,role){const user=await GetUser(token);return!(!user||user.role!==role)},exports.Login=async function(req,res,role,login,id,token){const isMobile="true"==String(req.cookies[COOKIE_MOBILE]),cookieId=(0,crypto_1.md5)(token);res.cookie(COOKIE_NAME,cookieId,{maxAge:6e7});const ip=req.headers["x-forwarded-for"]?String(req.headers["x-forwarded-for"]).split(",").shift():req.ip,{rows}=await(0,db_1.dbQuery)('SELECT EXISTS(SELECT 1 FROM "Session" WHERE login = $1);',[login]),isExists=rows[0]?.exists;if(isExists){const sql='UPDATE "Session" SET offline=false, last_action=current_timestamp, cookie=$2, id_role=$3, id_user=$4, is_mobile=$5 WHERE login=$1;',values=[login,cookieId,role,id,isMobile],{command}=await(0,db_1.dbQuery)(sql,values);return"UPDATE"===command&&await LoginLog(login,role,id,isMobile,ip)}{const sql='INSERT INTO "Session" (cookie, id_role, login, id_user, last_action, is_mobile) VALUES ($1, $2, $3, $4, current_timestamp, $5);',values=[cookieId,role,login,id,isMobile],{command}=await(0,db_1.dbQuery)(sql,values);return"INSERT"===command&&await LoginLog(login,role,id,isMobile,ip)}},exports.LoginLog=LoginLog;const db_1=__webpack_require__(6067),crypto_1=__webpack_require__(9095),COOKIE_NAME="EDUGATEPORTAL",COOKIE_MOBILE="isMobile";async function GetUser(token){const{rowCount,rows}=await(0,db_1.dbQuery)('SELECT * FROM "fn_Session_Get_User"($1);',[(0,crypto_1.md5)(token)]);if(rowCount){return{...rows[0]}}}async function LoginLog(login,role,id,isMobile,ip){const values=[login,role,id,isMobile,ip],{command}=await(0,db_1.dbQuery)('INSERT INTO "Session_log" (login, id_role, id_user, log_time, is_mobile, ip) VALUES ($1, $2, $3, current_timestamp, $4, $5);',values);return"INSERT"===command}},7515:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var notification_route_1=__webpack_require__(5662);Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return __importDefault(notification_route_1).default}})},7573:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.swaggerSpec=void 0;const swagger_jsdoc_1=__importDefault(__webpack_require__(8450)),options={definition:{openapi:"3.0.0",info:{title:"Edugate App API",version:"1.0.0",description:"\n        API documentation for Edugate Application\n        \n        ## Аутентификация\n        API поддерживает метод аутентификации:\n        **Bearer Token** - JWT токен в заголовке Authorization\n      "},components:{securitySchemes:{bearerAuth:{type:"http",scheme:"bearer",bearerFormat:"JWT"}},parameters:{langParam:{name:"lang",in:"query",required:!1,schema:{type:"string",enum:["ru","en","ky"],default:"en"}}}}},apis:["./src/**/*.ts","./src/*/*.ts","*./*/*.js","./*.js"]};exports.swaggerSpec=(0,swagger_jsdoc_1.default)(options)},7590:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEFAULT_LANGUAGE_ID=exports.DEFAULT_LANGUAGE_CODE=exports.SUPPORTED_LANGUAGES=void 0,exports.getLangId=function(resolvedLanguage){if(!resolvedLanguage)return exports.DEFAULT_LANGUAGE_ID;return LANG_TO_ID_MAP[resolvedLanguage]??exports.DEFAULT_LANGUAGE_ID},exports.getLangCode=function(langId){return ID_TO_LANG_MAP[langId]},exports.isLanguageCode=function(lang){return LANG_CODE_SET.has(lang)},exports.SUPPORTED_LANGUAGES=Object.freeze(["ru","en","ky"]);const LANG_TO_ID_MAP=Object.freeze({ru:1,en:2,ky:3}),ID_TO_LANG_MAP=Object.freeze({1:"ru",2:"en",3:"ky"});exports.DEFAULT_LANGUAGE_CODE="ru",exports.DEFAULT_LANGUAGE_ID=1;const LANG_CODE_SET=Object.freeze(new Set(exports.SUPPORTED_LANGUAGES))},7773:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.uploadLimiter=exports.authLimiter=exports.apiLimiter=void 0;const express_rate_limit_1=__importDefault(__webpack_require__(1763)),rate_limit_redis_1=__importDefault(__webpack_require__(2886)),env_1=__webpack_require__(6138),cache_1=__webpack_require__(9982),response_1=__webpack_require__(8369),redisClient=(0,cache_1.getRedisClient)(),useRedisStore=env_1.ENV.CACHE.CHECK&&redisClient,createLimiterStore=()=>{if(useRedisStore&&redisClient)return new rate_limit_redis_1.default({client:redisClient,prefix:"rate_limit:"})};exports.apiLimiter=(0,express_rate_limit_1.default)({windowMs:9e5,max:300,standardHeaders:!0,legacyHeaders:!1,store:createLimiterStore(),handler:(req,res)=>(0,response_1.sendError)(res,req.t("error.tooManyRequests"),!1,429)}),exports.authLimiter=(0,express_rate_limit_1.default)({windowMs:9e5,max:5,standardHeaders:!0,legacyHeaders:!1,skipSuccessfulRequests:!0,store:createLimiterStore(),handler:(req,res)=>(0,response_1.sendError)(res,req.t("error.tooManyLoginAttempts"),!1,429)}),exports.uploadLimiter=(0,express_rate_limit_1.default)({windowMs:9e5,max:10,standardHeaders:!0,legacyHeaders:!1,store:createLimiterStore(),handler:(req,res)=>(0,response_1.sendError)(res,req.t("error.tooManyUploads"),!1,429)}),useRedisStore?console.log("✅ Rate limiter: Using Redis store (distributed, production-ready)"):console.warn("⚠️  Rate limiter: Using memory store (single instance only, dev mode)")},7806:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.app=void 0;const compression_1=__importDefault(__webpack_require__(7174)),cookie_parser_1=__importDefault(__webpack_require__(6898)),express_1=__importDefault(__webpack_require__(7252)),express_fileupload_1=__importDefault(__webpack_require__(6376)),db_1=__webpack_require__(6067),env_1=__webpack_require__(6138),i18n_1=__importDefault(__webpack_require__(2137)),liveness_1=__webpack_require__(1136),readiness_1=__webpack_require__(689),errorHandler_1=__webpack_require__(2377),logger_1=__webpack_require__(9259),normalizeBody_1=__webpack_require__(9008),routes_1=__importDefault(__webpack_require__(7165)),cache_1=__webpack_require__(9982),corsMiddleware_1=__webpack_require__(2699),handleRedirectIndex_1=__importDefault(__webpack_require__(218)),noCacheMiddleware_1=__importDefault(__webpack_require__(9607)),shutdown_1=__webpack_require__(5800),swagger_1=__importDefault(__webpack_require__(3044)),timeout_1=__webpack_require__(1319),refreshMv_1=__webpack_require__(465),app=(0,express_1.default)();exports.app=app;const PORT=env_1.ENV.PORT;app.disable("x-powered-by"),app.set("trust proxy",1),app.get("/health",liveness_1.livenessHandler),app.get("/ready",readiness_1.readinessHandler),app.use((0,corsMiddleware_1.corsMiddleware)()),app.use((0,compression_1.default)()),app.use(express_1.default.json({limit:"10mb"})),app.use(express_1.default.urlencoded({extended:!0,limit:"10mb"})),app.use((0,express_fileupload_1.default)({limits:{fileSize:52428800}})),app.use((0,normalizeBody_1.normalizeBodyMiddleware)({emptyAsNull:!0})),app.use(noCacheMiddleware_1.default),app.use((0,cookie_parser_1.default)()),app.use(logger_1.loggerMiddleware),app.use(i18n_1.default),app.use("/api",routes_1.default),app.use("/swagger",swagger_1.default),app.use("/edugate",express_1.default.static("public")),app.use("/",handleRedirectIndex_1.default),app.use(errorHandler_1.errorHandler);let server=null;process.on("SIGINT",()=>{(async()=>{server?await(0,shutdown_1.gracefulShutdown)(server,"SIGINT"):(console.log("\n⚠️  Server not started yet, exiting..."),process.exit(0))})()}),process.on("SIGTERM",()=>{(async()=>{server?await(0,shutdown_1.gracefulShutdown)(server,"SIGTERM"):(console.log("\n⚠️  Server not started yet, exiting..."),process.exit(0))})()}),process.on("message",msg=>{("shutdown"===msg||"shutdown"===msg?.cmd)&&server&&(0,shutdown_1.gracefulShutdown)(server,"PM2")}),process.on("uncaughtException",async error=>{if(console.error("❌ Uncaught Exception:",error),console.error("   Application state may be inconsistent. Attempting graceful shutdown..."),!(0,shutdown_1.getShutdownStatus)()){(0,shutdown_1.setShutdownStatus)(!0);setTimeout(()=>{console.error("❌ Graceful shutdown timeout - forcing exit"),process.exit(1)},5e3).unref();try{server?await(0,shutdown_1.gracefulShutdown)(server,"uncaughtException"):process.exit(1)}catch(shutdownError){console.error("❌ Graceful shutdown failed:",shutdownError),process.exit(1)}}}),process.on("unhandledRejection",async error=>{if(console.error("❌ Unhandled Rejection:",error),console.error("   This should be handled with try/catch or .catch()"),!(0,shutdown_1.getShutdownStatus)()){(0,shutdown_1.setShutdownStatus)(!0);setTimeout(()=>{console.error("❌ Graceful shutdown timeout - forcing exit"),process.exit(1)},5e3).unref();try{server?await(0,shutdown_1.gracefulShutdown)(server,"unhandledRejection"):process.exit(1)}catch(shutdownError){console.error("❌ Graceful shutdown failed:",shutdownError),process.exit(1)}}}),async function(){try{await(0,timeout_1.withTimeout)((0,db_1.connectToDB)(),1e4,"Database connection timeout"),await(0,timeout_1.withTimeout)((0,cache_1.connectToRedis)(),1e4,"Redis connection timeout"),(0,refreshMv_1.refreshMv)(),server=app.listen(PORT,()=>{console.log(`🚀 Application listening on port: ${PORT}`),process.send&&process.send("ready")}),server.on("error",error=>{"EADDRINUSE"===error.code&&(console.error(`❌ Port ${PORT} is already in use`),console.error(`   Run: lsof -i :${PORT} to see which process is using it`),process.exit(1)),console.error("❌ Server error:",error),process.exit(1)})}catch(error){console.error("❌ Failed to start:",error),process.exit(1)}}()},7915:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlanController=void 0;const helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),plan_schema_1=__webpack_require__(2676),service=new(__webpack_require__(6796).PlanService);exports.PlanController=class{constructor(){this.getPlanBySpecialtyAndBkAndYearAndWs=async(req,res)=>{try{const{id_specialty,id_bk,id_years,id_ws}=req.params,plans=await service.getPlanBySpecialtyAndBkAndYearAndWs(Number(id_specialty),Number(id_bk),Number(id_years),Number(id_ws));return(0,response_1.sendSuccess)(res,req.t("success"),plans)}catch(error){return console.error("❌ PlanController.getPlanBySpecialtyAndBkAndYearAndWs error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.getPlanGrid=async(req,res,next)=>{try{const id_users=req.user.id,id_role=req.user.role,language=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),id_direction=(0,helpers_1.toNumber)(req.query.id_direction)??void 0,id_year=(0,helpers_1.toNumber)(req.query.id_year)??void 0,id_ws=(0,helpers_1.toNumber)(req.query.id_ws)??void 0,result=await service.getPlanGrid(id_users,id_role,language,id_direction,id_year,id_ws);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){next(error)}},this.createPlan=async(req,res,next)=>{try{const{isValid,data}=(0,validation_1.validate)(plan_schema_1.createPlanSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await service.createPlan(id_users,data);return"INSERT"===result?(0,response_1.sendSuccess)(res,req.t("createSuccess")):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):"Отказ"===result?(0,response_1.sendError)(res,req.t("accessDenied"),!1,403):(0,response_1.sendError)(res,req.t("errorCreate"))}catch(error){next(error)}},this.updatePlan=async(req,res,next)=>{try{const id_plan=(0,helpers_1.toNumber)(req.params.id_plan);if(!id_plan)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data}=(0,validation_1.validate)(plan_schema_1.updatePlanSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await service.updatePlan(id_users,id_plan,data);return"UPDATE"===result?(0,response_1.sendSuccess)(res,req.t("updateSuccess")):"Отказ"===result?(0,response_1.sendError)(res,req.t("accessDenied"),!1,403):"DUPLICATE"===result?(0,response_1.sendError)(res,req.t("duplicate"),!1,409):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){next(error)}},this.deletePlan=async(req,res,next)=>{try{const id_plan=(0,helpers_1.toNumber)(req.params.id_plan);if(!id_plan)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_users=req.user.id,result=await service.deletePlan(id_users,id_plan);return"DELETE"===result?(0,response_1.sendSuccess)(res,req.t("deleteSuccess")):"There is a connection to another table"===result?(0,response_1.sendError)(res,req.t("hasRelations"),!1,409):"Отказ"===result?(0,response_1.sendError)(res,req.t("accessDenied"),!1,403):(0,response_1.sendError)(res,req.t("errorDelete"))}catch(error){next(error)}}}}},8058:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.TourRepository=void 0;const db_1=__webpack_require__(6067);exports.TourRepository=class{async checkTour(){return await(0,db_1.dbQuery)("SELECT * FROM fn_registration_check();")}}},8205:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const specialty_route_1=__importDefault(__webpack_require__(6966));exports.default=specialty_route_1.default},8231:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.SettingsRepository=void 0;const db_1=__webpack_require__(6067);exports.SettingsRepository=class{async updateAvatar(data){const values=[data.id,data.id_role,data.fileName,null];return await(0,db_1.dbQuery)("CALL p_photo_upload($1,$2,$3,$4);",values)}async findAvatarByIdAndRole(data){const values=[data.id,data.id_role];return await(0,db_1.dbQuery)("SELECT * FROM fn_photo_avatar_grid($1,$2);",values)}async setNewPassword(data){const values=[data.id_users,1,data.id_role,data.old_hash_password,data.new_hash_password,null];return await(0,db_1.dbQuery)("CALL p_auth_iud($1,$2,$3,$4,$5,$6);",values)}async updateAbiturientEmail(data){const values=[data.id_abiturient,data.email];return await(0,db_1.dbQuery)("UPDATE abiturient SET email = $2 WHERE id_abiturient = $1;",values)}async findAllSettings(){return await(0,db_1.dbQuery)("SELECT * FROM settings;")}}},8366:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.MonitoringService=void 0;const monitoring_repository_1=__webpack_require__(5169);exports.MonitoringService=class{constructor(){this.repository=new monitoring_repository_1.MonitoringRepository}async updateStatus(id_user,id_lang,data){return await this.repository.statusIUD(id_user,id_lang,data)}async getSpravka(id_abiturient){return await this.repository.findSpravka(id_abiturient)}async getAbitRefusing(id_lang,id_abiturient,id_movement){return await this.repository.findAbitRefusing(id_lang,id_abiturient,id_movement)}async getAbitGrid(id_user,id_role,id_lang,data){const{rows}=await this.repository.findAbitGrid(id_user,id_role,id_lang,data);return{abiturients:rows,page:data.page,size:data.size,total_rows:rows[0]?.total_rows||0,total_pages:rows[0]?.total_pages||0,waiting:rows[0]?.waiting||0,confirmed:rows[0]?.confirmed||0,denied:rows[0]?.denied||0,agreement:rows[0]?.agreement||0,for_revision:rows[0]?.for_revision||0}}}},8369:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.sendSuccess=exports.sendError=exports.send=void 0;const isDevelopment="development"===__webpack_require__(6138).ENV.NODE_ENV,send=(res,data,message,error,statusCode,responseTime)=>{var code;res.headersSent?isDevelopment&&console.warn("⚠️  Cannot send response - headers already sent",{statusCode,message}):(code=statusCode,Number.isInteger(code)&&code>=100&&code<=599||(isDevelopment&&console.warn(`⚠️  Invalid status code: ${statusCode}, defaulting to ${error?500:200}`),statusCode=error?500:200),res.setHeader("X-Content-Type-Options","nosniff"),res.setHeader("Content-Type","application/json; charset=utf-8"),void 0!==responseTime&&res.setHeader("X-Response-Time",`${responseTime}ms`),res.status(statusCode).json({message,data,error}))};exports.send=send;exports.sendError=(res,message,data=!1,statusCode=400,responseTime)=>{send(res,data,message,!0,statusCode,responseTime)};exports.sendSuccess=(res,message,data=!0,statusCode=200,responseTime)=>{send(res,data,message,!1,statusCode,responseTime)}},8411:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),tour_controller_1=__webpack_require__(3245),router=(0,express_1.Router)(),ctrl=new tour_controller_1.TourController;
/**
 * @swagger
 * /api/tour/check:
 *   get:
 *     tags:
 *       - Tour
 *     summary: Проверка наличия тура
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Информация успешно получена
 */
router.get("/check",ctrl.checkTour),exports.default=router},8414:function(__unused_webpack_module,exports,__webpack_require__){var ownKeys,__createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||(ownKeys=function(o){return ownKeys=Object.getOwnPropertyNames||function(o){var ar=[];for(var k in o)Object.prototype.hasOwnProperty.call(o,k)&&(ar[ar.length]=k);return ar},ownKeys(o)},function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k=ownKeys(mod),i=0;i<k.length;i++)"default"!==k[i]&&__createBinding(result,mod,k[i]);return __setModuleDefault(result,mod),result});Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),cacheController=__importStar(__webpack_require__(6855)),router=(0,express_1.Router)();
/**
 * @swagger
 * /api/cache/stats:
 *   get:
 *     summary: Get cache statistics
 *     tags: [Cache Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cache statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalKeys:
 *                   type: number
 *                 memoryUsed:
 *                   type: string
 *                 uptime:
 *                   type: number
 *                 connected:
 *                   type: boolean
 */
router.get("/stats",authorize_1.isAdminToken,cacheController.getStats),
/**
 * @swagger
 * /api/cache/keys:
 *   get:
 *     summary: Get all cache keys matching pattern
 *     tags: [Cache Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pattern
 *         schema:
 *           type: string
 *           default: "*"
 *         description: Pattern to match keys (e.g., "user:*")
 *     responses:
 *       200:
 *         description: List of keys
 */
router.get("/keys",authorize_1.isAdminToken,cacheController.getKeys),
/**
 * @swagger
 * /api/cache/{key}:
 *   get:
 *     summary: Get cache value by key
 *     tags: [Cache Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cache value
 *       404:
 *         description: Key not found
 */
router.get("/:key",authorize_1.isAdminToken,cacheController.getCacheValue),
/**
 * @swagger
 * /api/cache/{key}:
 *   delete:
 *     summary: Delete cache key
 *     tags: [Cache Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Key deleted successfully
 */
router.delete("/:key",authorize_1.isAdminToken,cacheController.deleteKey),
/**
 * @swagger
 * /api/cache/pattern/{pattern}:
 *   delete:
 *     summary: Delete all keys matching pattern
 *     tags: [Cache Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pattern
 *         required: true
 *         schema:
 *           type: string
 *         description: Pattern to match (e.g., "user:*")
 *     responses:
 *       200:
 *         description: Number of keys deleted
 */
router.delete("/pattern/:pattern",authorize_1.isAdminToken,cacheController.deletePattern),
/**
 * @swagger
 * /api/cache/flush/all:
 *   delete:
 *     summary: Clear all cache (use with caution!)
 *     tags: [Cache Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All cache cleared
 */
router.delete("/flush/all",authorize_1.isAdminToken,cacheController.flushAll),exports.default=router},8450:module=>{module.exports=require("swagger-jsdoc")},8495:module=>{module.exports=require("i18next-node-fs-backend")},8549:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateCode=function(){return Math.floor(1e5+9e5*Math.random())},exports.toNumber=function(val){const num=Number(val);return isNaN(num)?null:num}},8572:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getMimeType=function(filePath){switch(path_1.default.extname(filePath).toLowerCase()){case".pdf":return"application/pdf";case".jpg":case".jpeg":return"image/jpeg";case".png":return"image/png";case".gif":return"image/gif";case".webp":return"image/webp";case".doc":return"application/msword";case".docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case".xls":return"application/vnd.ms-excel";case".xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case".txt":return"text/plain";default:return"application/octet-stream"}};const path_1=__importDefault(__webpack_require__(6928))},8577:module=>{module.exports=require("cors")},8643:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.MyUniversityService=void 0;const settings_service_1=__webpack_require__(3156),iud_1=__webpack_require__(1442),crypto_1=__webpack_require__(9095),httpError_1=__webpack_require__(7178),my_repository_1=__webpack_require__(7022),settingsService=new settings_service_1.SettingsService;exports.MyUniversityService=class{constructor(){this.repository=new my_repository_1.MyUniversityRepository}async getMyUniversity(id_users){const university=await this.repository.findUniversityByUserId(id_users);if(!university)throw new httpError_1.HttpError("university.not_found",404);return university}async updateMyUniversity(id_users,data){const result=await this.repository.updateMyUniversity(id_users,data);if(!result)throw new httpError_1.HttpError("errorUpdate",400);switch(result.result_message){case"updated":return!0;case"not_found":throw new httpError_1.HttpError("university.not_found",404);default:throw new httpError_1.HttpError("errorUpdate",400)}}async getUniversityUsers(id_users,language){const{rows}=await this.repository.findUniversityUsers(id_users,language);return rows}async createUniversityUser(id_users,data,photo){try{const hashPassword=(0,crypto_1.md5)(data.password.trim());let photoName=null;if(photo){const ext="png",fileName=`user_${id_users}_${Date.now()}.${ext}`;await settingsService.saveUploadAvatar(fileName,photo.data)&&(photoName=fileName)}const{rows}=await this.repository.manageUniversityUser(id_users,iud_1.IUDOperation.INSERT,0,{...data,hashPassword,photoName}),result=rows[0]?.sms||"";return"INSERT"!==result&&photoName&&setImmediate(async()=>{await settingsService.deleteUploadAvatar(photoName)}),result}catch(error){throw console.error("❌ MyUniversityService.createUniversityUser error:",error.message),error}}async updateUniversityUser(id_users,id_users_university,data,photo){try{const hashPassword=(0,crypto_1.md5)(data.password.trim());let photoName=null;if(photo){const ext="png",fileName=`user_${id_users}_${id_users_university}_${Date.now()}.${ext}`;await settingsService.saveUploadAvatar(fileName,photo.data)&&(photoName=fileName)}const{rows}=await this.repository.manageUniversityUser(id_users,iud_1.IUDOperation.UPDATE,id_users_university,{...data,hashPassword,photoName}),result=rows[0]?.sms||"";return"UPDATE"!==result&&photoName&&setImmediate(async()=>{await settingsService.deleteUploadAvatar(photoName)}),result}catch(error){throw console.error("❌ MyUniversityService.updateUniversityUser error:",error.message),error}}async deleteUniversityUser(id_users,id_users_university){try{const userPhoto=await this.getUniversityUserPhotosUrl(id_users_university),{rows}=await this.repository.manageUniversityUser(id_users,iud_1.IUDOperation.DELETE,id_users_university,{fio:"",fio_en:"",login:"",hashPassword:"",id_role:0,mobile:"",whatsapp:"",telegram:"",email:"",instagram:"",facebook:""}),result=rows[0]?.sms||"";if("DELETE"===result&&userPhoto?.users_university_photo){const photoName=userPhoto.users_university_photo;setImmediate(async()=>{await settingsService.deleteUploadAvatar(photoName)})}return result}catch(error){throw console.error("❌ MyUniversityService.deleteUniversityUser error:",error.message),error}}async updateUniversityUserAccess(data){const{rows}=await this.repository.updateUniversityUserAccess(data.access);return rows[0]||{sms:"",kol:null}}async createUniversityUserDocument(data){const{rows}=await this.repository.manageUniversityUserDocument(0,data.id_users_university,data.url_document);return rows[0]?.sms||""}async updateUniversityUserDocument(data){const{rows}=await this.repository.manageUniversityUserDocument(1,data.id_users_university,data.url_document);return rows[0]?.sms||""}async getUniversityUserPhotosUrl(id_users_university){const{rows,rowCount}=await this.repository.findUniversityUserPhotos(id_users_university);return rowCount?rows[0]:null}}},8700:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.CommissionRepository=void 0;const db_1=__webpack_require__(6067);exports.CommissionRepository=class{async findCommissionMembers(id_users,language){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_commission_grid($1, $2);",[id_users,language])}async manageCommission(id_users,iud,id_commission,id_commission_position,fio,fio_en){return await(0,db_1.dbQuery)("CALL p_vuz_commission_iud($1, $2, $3, $4, $5, $6, $7);",[id_users,iud,id_commission,id_commission_position,fio,fio_en,""])}}},8739:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbiturientController=void 0;const plan_service_1=__webpack_require__(6796),settings_service_1=__webpack_require__(3156),getMimeType_1=__webpack_require__(8572),helpers_1=__webpack_require__(8549),lang_1=__webpack_require__(7590),response_1=__webpack_require__(8369),validation_1=__webpack_require__(1077),abiturient_schema_1=__webpack_require__(2284),abiturient_service_1=__webpack_require__(7076),shared_service_1=__webpack_require__(3852),service=new abiturient_service_1.AbiturientService,planService=new plan_service_1.PlanService,settingsService=new settings_service_1.SettingsService,sharedService=new shared_service_1.SharedService;exports.AbiturientController=class{constructor(){this.personalInfo=async(req,res)=>{try{const id_abiturient=req.user?.id;if(!id_abiturient)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),abitInfo=await service.getPersonalInfo(id_abiturient,id_lang);return abitInfo?(0,response_1.sendSuccess)(res,req.t("success"),{abitInfo}):(0,response_1.sendError)(res,req.t("notFound"),!1,404)}catch(error){return console.error("❌ AbiturientController.personalInfo error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.updatePersonal=async(req,res)=>{try{const id_abiturient=req.user?.id;if(!id_abiturient)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const{isValid,data,issues}=(0,validation_1.validate)(abiturient_schema_1.updatePersonalSchema,req.body);if(!isValid)return(0,response_1.sendError)(res,req.t(issues?.[0]?.message||"inValidFormat"));const processedData={...data,surname_en:data.surname_en||"",names_en:data.names_en||"",patronymic:data.patronymic||"",patronymic_en:data.patronymic_en||""};return"UPDATE"===await service.updateAbitPersonalInfo(id_abiturient,processedData)?(0,response_1.sendSuccess)(res,req.t("successUpdate")):(0,response_1.sendError)(res,req.t("errorUpdate"))}catch(error){return console.error("❌ AbiturientController.updatePersonal error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.abitDocumentsList=async(req,res)=>{try{const id_abiturient=req.user?.id;if(!id_abiturient)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const baseUrl=`${req.protocol}://${req.get("host")}`,id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getAbitDocuments({id_abiturient,id_lang},baseUrl);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.abitDocumentsList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.abitDocumentsListResponsible=async(req,res)=>{try{const id_user=req.user?.id,id_role=req.user?.role;if(!id_user||!id_role)return(0,response_1.sendError)(res,req.t("token.invalid_token"),!1,401);const id_abiturient=(0,helpers_1.toNumber)(req.params.id_abiturient);if(!id_abiturient)return(0,response_1.sendError)(res,req.t("inValidFormat"));const baseUrl=`${req.protocol}://${req.get("host")}`,id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getAbitDocuments({id_abiturient,id_lang},baseUrl);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.abitDocumentsList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.getAbitDocument=async(req,res)=>{try{const{file_name}=req.params,absolutePath=await service.getUploadAbsolutePath(file_name);if(!absolutePath)return(0,response_1.sendError)(res,req.t("document.notFound"),!1,404);const mimeType=(0,getMimeType_1.getMimeType)(absolutePath)||"application/octet-stream";res.setHeader("Content-Type",mimeType),res.sendFile(absolutePath)}catch(error){return console.error("❌ AbiturientController.getAbitDocument error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.uploadAbitDocument=async(req,res)=>{try{const authState=req.user;if(!authState)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const{isValid,data,issues}=(0,validation_1.validate)(abiturient_schema_1.abiturientDocumentSchema,req.body);if(!isValid)return(0,response_1.sendError)(res,req.t(issues?.[0]?.message||"inValidFormat"));let file=req.files?.file;if(Array.isArray(file)&&(file=file[0]),!file)return(0,response_1.sendError)(res,req.t("noFileUploaded"));const result=await service.saveAbitDocument({...data,id_abiturient:authState.id},file,authState);return console.log("result",result),result?(0,response_1.sendSuccess)(res,req.t("successUpload")):(0,response_1.sendError)(res,req.t("errorUpload"))}catch(error){return console.error("❌ AbiturientController.uploadDocuments error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.uploadAbitDocumentResponsible=async(req,res)=>{try{const authState=req.user;if(!authState)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const id_abiturient=(0,helpers_1.toNumber)(req.params.id_abiturient);if(!id_abiturient)return(0,response_1.sendError)(res,req.t("inValidFormat"));const{isValid,data,issues}=(0,validation_1.validate)(abiturient_schema_1.abiturientDocumentSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t(issues?.[0]?.message||"inValidFormat"));let file=req.files?.file;if(Array.isArray(file)&&(file=file[0]),!file)return(0,response_1.sendError)(res,req.t("noFileUploaded"));return await service.saveAbitDocument({id_document:data?.id_document,id_abiturient},file,authState)?(0,response_1.sendSuccess)(res,req.t("successUpload")):(0,response_1.sendError)(res,req.t("errorUpload"))}catch(error){return console.error("❌ AbiturientController.uploadDocuments error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.apllicationList=async(req,res)=>{try{const id_abiturient=req.user?.id;if(!id_abiturient)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getApplicationsByAbiturient({id_abiturient,id_lang});return(0,response_1.sendSuccess)(res,req.t("success"),{applications:result})}catch(error){return console.error("❌ AbiturientController.apllicationList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.applyAbiturient=async(req,res)=>{try{const id_abiturient=req.user?.id;if(!id_abiturient)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const{isValid,data,issues}=(0,validation_1.validate)(abiturient_schema_1.applyAbiturientSchema,req.body);if(!isValid||!data)return(0,response_1.sendError)(res,req.t(issues?.[0]?.message||"inValidFormat"));const{id_specialty,id_bk}=data,settingsRecord=await settingsService.getAllSettings();if(0===settingsRecord.length)return(0,response_1.sendError)(res,req.t("settings.notFound"));const settingsMap=new Map(settingsRecord.map(s=>[s?.id,s?.id_settings])),id_years=settingsMap.get(1),id_ws=settingsMap.get(2);if(!id_years||!id_ws)return(0,response_1.sendError)(res,req.t("settings.notFound"));const planRecords=await planService.getPlanBySpecialtyAndBkAndYearAndWs(id_specialty,id_bk,id_years,id_ws),id_plan=planRecords[0]?.id_plan;if(!id_plan)return(0,response_1.sendError)(res,req.t("plan.notFound"));const result=await service.applyToUniversity({id_abiturient,id_plan}),response={INSERT:{success:!0,key:"application.success"},DUPLICATE:{success:!1,key:"application.alreadyRegistered"}}[result];return response?response.success?(0,response_1.sendSuccess)(res,req.t(response.key)):(0,response_1.sendError)(res,req.t(response.key),!1,response.status):(0,response_1.sendError)(res,req.t("application.unknownError"))}catch(error){return console.error("❌ AbiturientController.applyAbiturient error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.cancelAbiturient=async(req,res)=>{try{const id_abiturient=req.user?.id;if(!id_abiturient)return(0,response_1.sendError)(res,req.t("token.expired"),!1,401);const id_movement=(0,helpers_1.toNumber)(req.params?.id_movement);if(!id_movement)return(0,response_1.sendError)(res,req.t("inValidFormat"));return"DELETE"===await service.canselToUniversity({id_abiturient,id_movement})?(0,response_1.sendSuccess)(res,req.t("application.canceled")):(0,response_1.sendError)(res,req.t("application.unknownError"))}catch(error){return console.error("❌ AbiturientController.cancelAbiturient error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.educationDirectionList=async(req,res)=>{try{const result=await sharedService.getAllEducationDirection();return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.educationDirectionList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.educationLanguageList=async(req,res)=>{try{const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getEducationLanguage(id_lang);return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.educationLanguageList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.regionList=async(req,res)=>{try{const id_education_lang=(0,helpers_1.toNumber)(req.query?.id_education_lang);if(!id_education_lang)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getRegionByIdEduLang({id_lang,id_education_lang});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.regionList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.universityList=async(req,res)=>{try{const id_education_lang=(0,helpers_1.toNumber)(req.query?.id_education_lang)||0,id_region=(0,helpers_1.toNumber)(req.query?.id_region)||0,id_education_direction=(0,helpers_1.toNumber)(req.query?.id_education_direction)||0,id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getUniversityByRegion({id_lang,id_education_lang,id_region,id_education_direction});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.universityList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.facultyList=async(req,res)=>{try{const id_education_lang=(0,helpers_1.toNumber)(req.query?.id_education_lang),id_university=(0,helpers_1.toNumber)(req.query?.id_university),id_education_direction=(0,helpers_1.toNumber)(req.query?.id_education_direction)||0;if(!id_education_lang||!id_university||!id_education_direction)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getFacultyByUniversity({id_lang,id_education_lang,id_university,id_education_direction});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.facultyList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.directionList=async(req,res)=>{try{const id_education_lang=(0,helpers_1.toNumber)(req.query?.id_education_lang),id_faculty=(0,helpers_1.toNumber)(req.query?.id_faculty),id_education_direction=(0,helpers_1.toNumber)(req.query?.id_education_direction)||0;if(!id_education_lang||!id_faculty||!id_education_direction)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getDirectionByFaculty({id_lang,id_education_lang,id_faculty,id_education_direction});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.directionList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.bkList=async(req,res)=>{try{const id_education_lang=(0,helpers_1.toNumber)(req.query?.id_education_lang),id_direction=(0,helpers_1.toNumber)(req.query?.id_direction);if(!id_education_lang||!id_direction)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getBkByDirection({id_lang,id_education_lang,id_direction});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.bkList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.specialtyList=async(req,res)=>{try{const id_education_lang=(0,helpers_1.toNumber)(req.query?.id_education_lang),id_direction=(0,helpers_1.toNumber)(req.query?.id_direction),id_bk=(0,helpers_1.toNumber)(req.query?.id_bk);if(!id_education_lang||!id_direction||!id_bk)return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getSpecialtyByDirectionAndBk({id_lang,id_education_lang,id_direction,id_bk});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.specialtyList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}},this.formEducationList=async(req,res)=>{try{const id_education_lang=(0,helpers_1.toNumber)(req.query?.id_education_lang),id_direction=(0,helpers_1.toNumber)(req.query?.id_direction),id_bk=(0,helpers_1.toNumber)(req.query?.id_bk),id_speciality=(0,helpers_1.toNumber)(req.query?.id_speciality);if(!(id_education_lang&&id_direction&&id_bk&&id_speciality))return(0,response_1.sendError)(res,req.t("inValidFormat"));const id_lang=(0,lang_1.getLangId)(req.i18n.resolvedLanguage),result=await service.getFormEducation({id_lang,id_education_lang,id_direction,id_bk,id_speciality});return(0,response_1.sendSuccess)(res,req.t("success"),result)}catch(error){return console.error("❌ AbiturientController.formEducationList error: ",error.message),(0,response_1.sendError)(res,req.t("error.unknown"),!1,500)}}}}},8740:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),monitoring_controller_1=__webpack_require__(2633),router=(0,express_1.Router)(),ctrl=new monitoring_controller_1.MonitoringController;
/**
 * @swagger
 * /api/monitoring/abiturients:
 *   get:
 *     tags:
 *       - Monitoring
 *     summary: Получить список абитуриентов для мониторинга
 *     description: |
 *       Возвращает отфильтрованный список абитуриентов по университету, году и приемной кампании.
 *       Поддерживает пагинацию и поиск по ФИО.
 *       Требуется роль сотрудника министерства (role 2).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_university
 *         in: query
 *         required: true
 *         description: ID университета для фильтрации
 *         schema:
 *           type: integer
 *           example: 43
 *       - name: id_year
 *         in: query
 *         required: true
 *         description: ID учебного года
 *         schema:
 *           type: integer
 *           example: 25
 *       - name: id_ws
 *         in: query
 *         required: true
 *         description: ID приемной кампании (сезон приема)
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: page
 *         in: query
 *         required: false
 *         description: Номер страницы (по умолчанию 1)
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - name: size
 *         in: query
 *         required: false
 *         description: Размер страницы (по умолчанию 50, максимум 100)
 *         schema:
 *           type: integer
 *           default: 50
 *           maximum: 100
 *           example: 50
 *       - name: search
 *         in: query
 *         required: false
 *         description: Поиск по ФИО абитуриента
 *         schema:
 *           type: string
 *           example: "Иванов"
 *     responses:
 *       200:
 *         description: Список абитуриентов успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_movement:
 *                         type: integer
 *                         example: 123
 *                       id_plan:
 *                         type: integer
 *                         example: 45
 *                       id_abiturient:
 *                         type: integer
 *                         example: 789
 *                       shifr:
 *                         type: string
 *                         example: "AB12345"
 *                       fio:
 *                         type: string
 *                         description: ФИО и дата рождения абитуриента
 *                         example: "Иванов Иван 01.01.2000"
 *                       country:
 *                         type: string
 *                         example: "Кыргызстан"
 *                       specialty:
 *                         type: string
 *                         example: "Информационные технологии"
 *                       recom:
 *                         type: boolean
 *                         description: Рекомендован
 *                       exam:
 *                         type: integer
 *                         description: Баллы за экзамен
 *                       otobran:
 *                         type: boolean
 *                         description: Отобран
 *                       status_mon:
 *                         type: string
 *                         description: Статус мониторинга
 *                       colors:
 *                         type: string
 *                         description: Цветовой код статуса
 *                         example: "#28a745"
 *                       reg_date:
 *                         type: string
 *                         format: date
 *                         description: Дата регистрации
 *                       id_status:
 *                         type: integer
 *                       total_rows:
 *                         type: integer
 *                         description: Общее количество записей
 *                       total_pages:
 *                         type: integer
 *                         description: Общее количество страниц
 *                       waiting:
 *                         type: integer
 *                         description: Количество в ожидании
 *                       confirmed:
 *                         type: integer
 *                         description: Количество подтверждённых
 *                       denied:
 *                         type: integer
 *                         description: Количество отклонённых
 *                       agreement:
 *                         type: integer
 *                         description: Количество с соглашением
 *                       for_revision:
 *                         type: integer
 *                         description: Количество на доработке
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация или недостаточно прав
 */
router.get("/abiturients",authorize_1.isMinistryToken,ctrl.getAbiturientGrid),
/**
 * @swagger
 * /api/monitoring/status:
 *   put:
 *     tags:
 *       - Monitoring
 *     summary: Обновить статус мониторинга абитуриента
 *     description: |
 *       Обновляет уровень образования и статус мониторинга для заявки.
 *       При статусе отказа (3) или на доработку (5) сохраняет причину отказа.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_movement
 *               - id_level_education
 *               - id_status_mon
 *             properties:
 *               id_movement:
 *                 type: integer
 *                 description: ID заявки
 *                 example: 123
 *               id_level_education:
 *                 type: integer
 *                 description: ID уровня образования
 *                 example: 1
 *               id_status_mon:
 *                 type: integer
 *                 description: ID статуса мониторинга (1-ожидание, 2-подтверждён, 3-отказ, 4-соглашение, 5-на доработку)
 *                 example: 2
 *               refusing:
 *                 type: string
 *                 nullable: true
 *                 description: Причина отказа (обязательно при id_status_mon = 3 или 5)
 *                 example: "Неполный пакет документов"
 *               shifr:
 *                 type: number
 *                 nullable: true
 *                 description: Номер справки
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Статус успешно обновлён
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 */
router.put("/status",authorize_1.isMinistryToken,ctrl.updateStatus),
/**
 * @swagger
 * /api/monitoring/spravka/{id_abiturient}:
 *   get:
 *     tags:
 *       - Monitoring
 *     summary: Получить данные для справки
 *     description: Возвращает данные абитуриента для формирования справки (только для статусов 2-подтверждён или 4-соглашение)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_abiturient
 *         in: path
 *         required: true
 *         description: ID абитуриента
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: Данные справки успешно получены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: integer
 *                     surname:
 *                       type: string
 *                     names:
 *                       type: string
 *                     patronymic:
 *                       type: string
 *                     birth_date:
 *                       type: string
 *                     country:
 *                       type: string
 *                     agreement:
 *                       type: string
 *                     education_doc:
 *                       type: string
 *                     level_education:
 *                       type: string
 *                     reg_number:
 *                       type: number
 *                     report_date:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Неверный формат параметров
 *       401:
 *         description: Требуется авторизация
 */
router.get("/spravka/:id_abiturient",authorize_1.isMinistryToken,ctrl.getSpravka),
/**
 * @swagger
 * /api/monitoring/refusing/{id_abiturient}/{id_movement}:
 *   get:
 *     tags:
 *       - Monitoring
 *     summary: Получить причину отказа абитуриента
 *     description: Возвращает текст причины отказа для указанного абитуриента и заявки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *       - name: id_abiturient
 *         in: path
 *         required: true
 *         description: ID абитуриента
 *         schema:
 *           type: integer
 *           example: 123
 *       - name: id_movement
 *         in: path
 *         required: true
 *         description: ID заявки
 *         schema:
 *           type: integer
 *           example: 456
 *     responses:
 *       200:
 *         description: Причина отказа успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     refusing:
 *                       type: string
 *                       nullable: true
 *                       description: Текст причины отказа
 *                       example: "Неполный пакет документов"
 *       400:
 *         description: Неверный формат параметров
 *       401:
 *         description: Требуется авторизация
 */
router.get("/refusing/:id_abiturient/:id_movement",authorize_1.isMinistryToken,ctrl.getAbitRefusing),exports.default=router},8749:module=>{module.exports=require("crypto")},8938:module=>{module.exports=require("axios")},9008:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.normalizeBodyMiddleware=function(opts){const options={emptyAsNull:opts?.emptyAsNull??!0,maxDepth:opts?.maxDepth??10,logChanges:opts?.logChanges??!1};return(req,_res,next)=>{try{if(!req.body)return next();if("object"!=typeof req.body||null===req.body)return next();const contentType=req.headers["content-type"]||"",hasFiles=req.files&&Object.keys(req.files).length>0;if(contentType.includes("multipart/form-data")&&hasFiles)return next();const originalBody=options.logChanges&&"development"===env_1.ENV.NODE_ENV?JSON.stringify(req.body):null;if(req.body=(0,normalizeFormData_1.normalizeFormData)(req.body,{emptyAsNull:options.emptyAsNull,maxDepth:options.maxDepth}),options.logChanges&&"development"===env_1.ENV.NODE_ENV&&originalBody){const normalizedBody=JSON.stringify(req.body);originalBody!==normalizedBody&&console.log("📝 Body normalized:",{url:req.url,method:req.method,before:originalBody,after:normalizedBody})}next()}catch(err){console.error("❌ Body normalization error:",err),next(err)}}};const env_1=__webpack_require__(6138),normalizeFormData_1=__webpack_require__(2189)},9095:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.encrypt=encrypt,exports.decrypt=decrypt,exports.encryptLegacy=encryptLegacy,exports.decryptLegacy=decryptLegacy,exports.sha256=sha256,exports.md5=md5,exports.randomBytes=randomBytes;const crypto_1=__importDefault(__webpack_require__(8749)),env_1=__webpack_require__(6138),ALGORITHM="aes-256-cbc",IV_LENGTH=16,keyBase64=env_1.ENV.ENC_KEY_BASE64,ivBase64=env_1.ENV.ENC_IV_BASE64,securityKey=(()=>{if(!keyBase64)throw new Error("ENC_KEY_BASE64 is not set. Generate with: crypto.randomBytes(32).toString('base64')");try{const key=Buffer.from(keyBase64,"base64");if(32!==key.length)throw new Error(`Invalid encryption key length: ${key.length} bytes (expected 32)`);return key}catch(error){throw new Error(`Failed to parse ENC_KEY_BASE64: ${error instanceof Error?error.message:"Unknown error"}`)}})(),initVector=(()=>{if(!ivBase64)throw new Error("ENC_IV_BASE64 is not set. Generate with: crypto.randomBytes(16).toString('base64')");try{const iv=Buffer.from(ivBase64,"base64");if(iv.length!==IV_LENGTH)throw new Error(`Invalid IV length: ${iv.length} bytes (expected ${IV_LENGTH})`);return iv}catch(error){throw new Error(`Failed to parse ENC_IV_BASE64: ${error instanceof Error?error.message:"Unknown error"}`)}})();function encrypt(plainText){if(!plainText)throw new Error("Cannot encrypt empty string");try{const randomIV=crypto_1.default.randomBytes(IV_LENGTH),cipher=crypto_1.default.createCipheriv(ALGORITHM,securityKey,randomIV),encrypted=Buffer.concat([cipher.update(plainText,"utf8"),cipher.final()]);return Buffer.concat([randomIV,encrypted]).toString("base64")}catch(error){throw new Error(`Encryption failed: ${error instanceof Error?error.message:"Unknown error"}`)}}const isPrintableString=str=>/^[\x20-\x7E\s\u0080-\uFFFF]*$/.test(str);function decrypt(cipherTextBase64){if(!cipherTextBase64)throw new Error("Cannot decrypt empty string");const errors=[];try{const buffer=Buffer.from(cipherTextBase64,"base64");try{const decipher=crypto_1.default.createDecipheriv(ALGORITHM,securityKey,initVector),result=Buffer.concat([decipher.update(buffer),decipher.final()]).toString("utf8");if(isPrintableString(result))return result;errors.push("Legacy format: Result contains non-printable characters")}catch(error){errors.push(`Legacy format: ${error instanceof Error?error.message:"Decryption failed"}`)}if(buffer.length>=IV_LENGTH+16)try{const iv=buffer.subarray(0,IV_LENGTH),encryptedData=buffer.subarray(IV_LENGTH),decipher=crypto_1.default.createDecipheriv(ALGORITHM,securityKey,iv),result=Buffer.concat([decipher.update(encryptedData),decipher.final()]).toString("utf8");if(isPrintableString(result))return result;errors.push("New format: Result contains non-printable characters")}catch(error){errors.push(`New format: ${error instanceof Error?error.message:"Decryption failed"}`)}else errors.push(`New format: Buffer too short (${buffer.length} bytes, need at least ${IV_LENGTH+16})`);throw new Error("Decryption failed with both legacy and new formats.\n"+errors.join("\n"))}catch(error){throw new Error(`Decryption failed: ${error instanceof Error?error.message:"Unknown error"}. Data may be corrupted or encrypted with a different key.`)}}function encryptLegacy(plainText){if(!plainText)throw new Error("Cannot encrypt empty string");try{const cipher=crypto_1.default.createCipheriv(ALGORITHM,securityKey,initVector);return Buffer.concat([cipher.update(plainText,"utf8"),cipher.final()]).toString("base64")}catch(error){throw new Error(`Legacy encryption failed: ${error instanceof Error?error.message:"Unknown error"}`)}}function decryptLegacy(cipherTextBase64){if(!cipherTextBase64)throw new Error("Cannot decrypt empty string");try{const encryptedText=Buffer.from(cipherTextBase64,"base64"),decipher=crypto_1.default.createDecipheriv(ALGORITHM,securityKey,initVector);return Buffer.concat([decipher.update(encryptedText),decipher.final()]).toString("utf8")}catch(error){throw new Error(`Legacy decryption failed: ${error instanceof Error?error.message:"Unknown error"}`)}}function sha256(value){if(null==value)throw new Error("Cannot hash undefined or null value");try{return crypto_1.default.createHash("sha256").update(value,"utf8").digest("hex")}catch(error){throw new Error(`SHA-256 hashing failed: ${error instanceof Error?error.message:"Unknown error"}`)}}function md5(value){if(null==value)throw new Error("Cannot hash undefined or null value");try{return crypto_1.default.createHash("md5").update(value,"utf8").digest("hex")}catch(error){throw new Error(`MD5 hashing failed: ${error instanceof Error?error.message:"Unknown error"}`)}}function randomBytes(length){if(length<=0)throw new Error("Length must be positive");try{return crypto_1.default.randomBytes(length).toString("base64")}catch(error){throw new Error(`Random bytes generation failed: ${error instanceof Error?error.message:"Unknown error"}`)}}exports.default={encrypt,decrypt,encryptLegacy,decryptLegacy,sha256,md5,randomBytes}},9175:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbiturientRepository=void 0;const db_1=__webpack_require__(6067);exports.AbiturientRepository=class{async findPersonalInfo(id_abiturient,id_lang){return await(0,db_1.dbQuery)("SELECT * FROM fn_abiturient($1, $2);",[id_abiturient,id_lang])}async updateAbitInfoById(id_abiturient,data){const values=[id_abiturient,data.surname,data.surname_en,data.names,data.names_en,data.patronymic,data.patronymic_en,data.id_gender,data.birth_date,data.passport,data.passport_date,data.id_country,data.telephone,data.id_education_doc,data.serial_number,data.date_document,data.name_org,""];return await(0,db_1.dbQuery)("CALL p_abiturient_personal_info_update($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);",values)}async findAbitDocuments(id_abiturient,id_lang){return await(0,db_1.dbQuery)("SELECT * FROM fn_vuz_abit_document($1, $2);",[id_lang,id_abiturient])}async findApplicationsByAbiturient(data){const values=[data.id_abiturient,data.id_lang];return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_vuz($1, $2);",values)}async applicationsAbiturientIUD(data){const values=[data.iud,data.id_movement,data.id_plan,data.id_abiturient,null,null];return await(0,db_1.dbQuery)("CALL p_ab_vuz_iud($1, $2, $3, $4, $5, $6);",values)}async findEducationLanguage(id_lang){return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_education_language($1);",[id_lang])}async findRegionByIdEduLang(data){const values=[data.id_lang,data.id_education_lang];return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_region($1, $2);",values)}async findUniversityByRegion(data){const values=[data.id_lang,data.id_education_lang,data.id_region,0,data.id_education_direction];return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_university_select($1, $2, $3, $4, $5);",values)}async findFacultyByUniversity(data){const values=[data.id_lang,data.id_education_lang,data.id_university,data.id_education_direction];return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_faculty($1, $2, $3, $4);",values)}async findDirectionByFaculty(data){const values=[data.id_lang,data.id_education_lang,data.id_faculty,data.id_education_direction];return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_direction($1, $2, $3, $4);",values)}async findBkByDirection(data){const values=[data.id_lang,data.id_education_lang,data.id_direction];return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_bk($1, $2, $3);",values)}async findSpecialtyByDirectionAndBk(data){const values=[data.id_lang,data.id_education_lang,data.id_direction,data.id_bk];return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_specialty($1, $2, $3, $4);",values)}async findFormEducation(data){const values=[data.id_lang,data.id_education_lang,data.id_direction,data.id_bk,data.id_speciality];return await(0,db_1.dbQuery)("SELECT * FROM fn_ab_learning($1, $2, $3, $4, $5);",values)}async existEmailAbit(email){const values=[email];return await(0,db_1.dbQuery)("SELECT EXISTS(SELECT 1 FROM abiturient a WHERE LOWER(a.email) = LOWER(TRIM($1)));",values)}async abitDocumentIUD(id_user,id_role,data){const values=[data.iud,data.id_abiturient,data.id_document,data.fileName,id_user,id_role,""];return await(0,db_1.dbQuery)("CALL p_vuz_abiturient_document_iud($1, $2, $3, $4, $5, $6, $7);",values)}async findAbitDocument(data){const values=[data.id_abiturient,data.id_document];return await(0,db_1.dbQuery)("SELECT * FROM abiturient_document ad WHERE ad.id_abiturient = $1 AND ad.id_document = $2 ORDER BY ad.dates DESC LIMIT 1;",values)}async abiturientPhotoIUD(id_abiturient,photo){return await(0,db_1.dbQuery)("CALL p_abiturient_photo_iud($1, $2, $3);",[id_abiturient,photo,null])}}},9224:module=>{module.exports=JSON.parse('{"success":"Success","inValidFormat":"Invalid data format","hasRelations":"Cannot delete: there are related records","error":{"unknown":"An unknown error occurred","internal_server":"Internal server error","dbConnection":"Database connection error","validation":"Invalid data","notFound":"The requested resource was not found","tooManyRequests":"Too many requests. Please try again later","tooManyLoginAttempts":"Too many login attempts. Please try again in 15 minutes","tooManyUploads":"Too many file uploads. Please try again later"},"token":{"token_required":"Token not provided","permission":"Access denied","invalid":"Invalid token","notFound":"Token not found","expired":"Token has expired","generateError":"Token generation error","invalid_token":"Invalid token","permission_denied":"No permission to access the resource","unknown_error":"An unknown error occurred while verifying the token"},"auth":{"Required":"Please enter login and password","login_required":"Please enter login","password_required":"Please enter password","role_required":"Please select a role to log in","role_invalid":"Invalid role, unacceptable value","invalid_credentials":"Incorrect login or password","loginFailed":"Login failed"},"logout":{"success":"You have successfully logged out","failed":"Logout failed"},"register":{"Required":"Please fill in the required fields","consent_required":"You must confirm agreement to the user terms","consent_invalid":"Invalid consent value","token_required":"reCAPTCHA verification required","token_invalid":"Invalid reCAPTCHA token","token_captcha_invalid":"reCAPTCHA verification failed. Please try again","surname_required":"Please enter surname","names_required":"Please enter first name","patronymic_invalid":"Invalid patronymic format","birth_date_required":"Please enter birth date","birth_date_invalid":"Invalid birth date format","birth_date_format":"Birth date must be in YYYY-MM-DD format","id_gender_required":"Please select gender","id_gender_invalid":"Invalid gender format","passport_required":"Please enter passport number","passport_invalid":"Invalid passport format","passport_date_required":"Please enter passport issue date","passport_date_invalid":"Invalid passport issue date format","passport_date_format":"Passport issue date must be in YYYY-MM-DD format","id_country_required":"Please specify country","id_country_invalid":"Invalid country format","email_required":"Please enter email","email_invalid":"Invalid email format","code_required":"Please enter verification code","code_invalid":"Invalid code format","code_length":"Code must be 6 digits","password_required":"Please enter password","password_invalid":"Invalid password format","password_minLength":"Password must be at least 6 characters","password_maxLength":"Password is too long","repeat_password_required":"Please enter repeat password","repeat_password_invalid":"Invalid repeat password format","repeat_password_minLength":"Repeat password must be at least 6 characters","repeat_password_maxLength":"Repeat password is too long","telephone_required":"Please enter phone number","telephone_invalid":"Invalid phone number format","photo_invalid":"File must be an image","already_registered":"You are already registered","passport_duplicate":"A user with this passport is already registered","email_duplicate":"A user with this email is already registered","save_error":"Failed to save data","unknown_error":"Unknown error","success":"You have successfully registered","password_sent":"Password has been sent to your email"},"email":{"Required":"Please fill in the required fields","email_required":"Please enter email","email_invalid":"Invalid email format","isExistEmailCode":"A verification code has already been sent to this address","success_send":"Verification code sent successfully","error_send":"Error sending verification code, please try again","error":"An error occurred while processing the request","already_exist":"A user with this email already exists"},"password":{"change":{"success":"Password changed successfully","wrongOld":"Incorrect current password","failed":"Failed to change password. Please try again later"}},"application":{"success":"Application submitted successfully","alreadyRegistered":"You have already applied","canceled":"Application canceled successfully","invalidFormat":"Invalid data format","unknownError":"An unknown error occurred"},"settings":{"notFound":"System settings not found or not configured"},"plan":{"notFound":"Admission plan not found for selected specialty"},"specialty":{"notDelete":"Cannot delete, there are applicants"},"admissionPlan":{"exceeded":"Cannot add or modify the plan as it exceeds the total"},"notDelete":"Cannot delete, record exists","notFound":"Data not found","invalidEmailCode":"Invalid code. Please request a new code via email","errorSendEmail":"Error sending email!","noValidEmail":"Invalid email address!","errorGenerateCode":"Error generating code!","errorVerifyCaptcha":"You did not pass the captcha verification!","errorExistRecover":"Password reset link has already been used!","successSave":"Data saved successfully","errorSave":"Error saving data","successAdd":"Data added successfully","errorAdd":"Error adding data","successUpdate":"Data updated successfully","errorUpdate":"Error updating data","errorDelete":"Error deleting data","successDelete":"Data deleted successfully","errorDateValid":"Invalid date!","errorGet":"Error fetching data!","errorEmailUserNotFound":"User with specified email not found!","errorUserId":"User not found!","isTooShort":"New password is too short. Enter at least 6 characters!","passDoesNotMatch":"New passwords do not match!","changePassword":"Password changed successfully!","sendLinkSuccess":"Password reset instructions sent to your email!","isExistEmailLink":"Recovery link has already been sent!","emailInCorrect":"Enter a valid email!","pinExistError":"User with such PIN not found!","yourEmail":"Your email","errorStartYear":"Invalid start year!","errorIdEducation":"Please select education level!","errorIdFormEducation":"Please select form of education!","errorOnlyPdfFile":"Upload only PDF files!","errorFileAdd":"Error saving file!","errorExistFile":"File not found!","errorMaxFilesExceeded":"Maximum number of files exceeded: {{maxFiles}}!","errorDataPassportInCorrect":"Enter passport data correctly!","errorExistSeries":"This passport series not found!","errorPinInCorrect":"Enter PIN correctly!","existUserLang":"You have already selected this language!","existUserKeySkill":"You have already selected this skill!","errorYear":"Enter a valid year!","errorSelectOrg":"Please specify the organization!","existUserMilitary":"You already have military record!","olympiad":{"nameInCorrect":"Enter the first name correctly!","surnameInCorrect":"Enter the surname correctly!","patronymicInCorrect":"Enter the patronymic correctly!"},"emplyee":{"nameInCorrect":"Enter the first name correctly!","surnameInCorrect":"Enter the surname correctly!","patronymicInCorrect":"Enter the patronymic correctly!"},"upload_xml":"Upload XML file!","uploadCurrectXml":"Upload a valid XML file!","inValidPin":"Invalid PIN!","laptopDuplicate":"Laptop already received!","updateEmail":{"pinError":"Invalid PIN!","userNotFound":"User not found in the system!","userNotRegister":"User with this PIN is not registered yet!","surnameCorrect":"Enter the surname correctly!","nameCorrect":"Enter the first name correctly!","patronymicCorrect":"Enter the patronymic correctly!","patronymicRequired":"Patronymic is required!","birthDayCorrect":"Enter the birth date correctly!","emailSame":"New email must not match current email!","success":"Your email has been successfully updated"},"accessDenied":"Access denied!","esi":{"invalidRequest":"Insufficient information to log in. Fill in the information and try again.","authFailedState":"Request expired or data invalid. Please try logging in again.","tokenFailed":"Access could not be obtained. Please try again later.","userNotFound":"You are not registered yet. Please register in the \\"Mugalim\\" system.","tryError":"An error occurred during login! Please try again!"},"userNotRegister":"User with this PIN is not registered yet!","existHeadOrganization":"The appointed candidate already holds a manager position in another organization!","existHeadOldOrganization":"The organization already has a manager appointed (including temporary or acting). Please perform dismissal first!","passport":{"successSave":"Data saved successfully","errorSave":"Error saving data!","notFoundWithPin":"Passport with PIN {{pin}} not found","notFound":"Passport not found","serviceUnavailable":"Passport verification service temporarily unavailable. Please try later","unknownError":"Unknown error occurred. Please try later"},"errorSaveFile":"Error saving file","uploadFile":"Upload file","uploadImage":"Upload photo","errorTestDelete":"Cannot delete test — applications already exist for it","tour":{"notAdd":"This tour already exists","notDelete":"Cannot delete, there is a relation"},"avatar":{"notFound":"Avatar not found"},"document":{"notFound":"Document not found"},"university":{"not_found":"University not found or user is not assigned to a university","duplicate":"University with this name already exists"},"abiturient":{"duplicate":"Abiturient with this passport or email already exists"},"faculty":{"duplicate":"Faculty with this name already exists","errorAdd":"Error adding faculty","errorUpdate":"Error updating faculty","errorDelete":"Error deleting faculty","operationDenied":"Operation denied","cannotDeleteLinked":"Cannot delete faculty, there are related records","noResponse":"No response from database"},"direction":{"not_found":"Directions not found","duplicate":"Direction with this cipher already exists","errorAdd":"Error adding direction","errorUpdate":"Error updating direction","errorDelete":"Error deleting direction","operationDenied":"Operation denied","cannotDeleteLinked":"Cannot delete direction, there are related records"},"country":{"not_found":"Country not found","duplicate":"Country with this name already exists"},"noFileUploaded":"No file uploaded","successUpload":"Upload successful","errorUpload":"Upload error","cache":{"key_not_found":"Key not found in cache","deleted":"Key deleted from cache","pattern_deleted":"Keys deleted by pattern","flushed":"All cache cleared"}}')},9237:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const email_route_1=__importDefault(__webpack_require__(3570));exports.default=email_route_1.default},9259:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.loggerMiddleware=void 0;const env_1=__webpack_require__(6138),colors_reset="[0m",colors_gray="[90m",colors_blue="[34m",colors_green="[32m",colors_yellow="[33m",colors_red="[31m",colors_cyan="[36m",colors_white="[37m",SKIP_PATHS=["/health","/ready"],useColors="production"!==env_1.ENV.NODE_ENV;exports.loggerMiddleware=(req,res,next)=>{const start=Date.now();if(SKIP_PATHS.includes(req.path))return next();res.on("finish",()=>{const duration=Date.now()-start,{method,path}=req,status=res.statusCode,ip=(req=>req.headers["x-forwarded-for"]?.split(",")[0]?.trim()||req.headers["x-real-ip"]||req.socket.remoteAddress||"unknown")(req),contentLength=res.get("content-length")||"-";if(useColors){const statusColor=(status=>useColors?status>=500?colors_red:status>=400?colors_yellow:status>=300?colors_cyan:colors_green:"")(status);console.log(`${colors_blue}${method}${colors_reset} ${colors_white}${path}${colors_reset} ${statusColor}${status}${colors_reset} ${colors_gray}${duration}ms ${contentLength}b ${ip}${colors_reset}`)}else console.log({type:"http",method,path,status,duration:`${duration}ms`,contentLength,ip,timestamp:(new Date).toISOString()});duration>1e3&&(useColors?console.warn(`⚠️  SLOW REQUEST: ${method} ${path} took ${duration}ms (IP: ${ip})`):console.warn({type:"slow_request",method,path,duration:`${duration}ms`,ip,timestamp:(new Date).toISOString()})),status>=500&&(useColors?console.error(`❌ SERVER ERROR: ${method} ${path} - Status ${status} (IP: ${ip})`):console.error({type:"server_error",method,path,status,ip,timestamp:(new Date).toISOString()}))}),next()}},9288:module=>{module.exports=require("sharp")},9309:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbiturientService=void 0;const abiturient_repository_1=__webpack_require__(7360);exports.AbiturientService=class{constructor(){this.repository=new abiturient_repository_1.AbiturientRepository}async getAbitGrid(id_user,id_role,id_lang,data){const{rows}=await this.repository.findAbitGrid(id_user,id_role,id_lang,data);return{abiturients:rows,page:data.page,size:data.size,total_count:rows[0]?.total_count||0,total_pages:rows[0]?.total_pages||0}}async getLearningTypes(data){const{rows}=await this.repository.findLearningTypes(data);return rows}async getEducationLanguages(data){const{rows}=await this.repository.findEducationLanguages(data);return rows}async getFaculties(data){const{rows}=await this.repository.findFaculties(data);return rows}async getSpecialties(data){const{rows}=await this.repository.findSpecialties(data);return rows}async getBudgetContractTypes(data){const{rows}=await this.repository.findBudgetContractTypes(data);return rows}async updateMovement(id_user,id_role,id_movement,data){const{rows}=await this.repository.updateMovement(id_user,id_role,id_movement,data);return"UPDATE"===rows[0]?.sms}async getAbiturientDetails(data){const{rows}=await this.repository.findAbiturientDetails(data);return rows[0]||null}async getStats(data){const{rows}=await this.repository.findStats(data);return rows[0]||{total_count:0,rejected_count:0,selected_count:0,revision_count:0}}async createAbiturient(id_user,id_role,data){const{rows}=await this.repository.abiturientIud(id_user,id_role,0,0,data);return{id:rows[0]?.p_id??0,sms:rows[0]?.sms??"NO_RESPONSE"}}async updateAbiturient(id_user,id_role,id_abiturient,data){const{rows}=await this.repository.abiturientIud(id_user,id_role,1,id_abiturient,{...data,id_plan:0});return{id:rows[0]?.p_id??0,sms:rows[0]?.sms??"NO_RESPONSE"}}}},9310:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const abiturient_route_1=__importDefault(__webpack_require__(3674));exports.default=abiturient_route_1.default},9425:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const abiturient_route_1=__importDefault(__webpack_require__(6296));exports.default=abiturient_route_1.default},9530:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),country_controller_1=__webpack_require__(1539),router=(0,express_1.Router)(),ctrl=new country_controller_1.CountryController;
/**
 * @swagger
 * /api/country/all-list:
 *   get:
 *     tags:
 *       - Country
 *     summary: Получить список стран для авторизованных
 *     description: Возвращает список стран
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Успешный ответ список стран
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *       401:
 *         description: Нет доступа
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get("/all-list",authorize_1.isMinistryToken,ctrl.countryAll),
/**
 * @swagger
 * /api/country/create:
 *   post:
 *     tags:
 *       - Country
 *     summary: Добавить новую страну
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country
 *               - country_en
 *               - agreement
 *               - spravka
 *               - id_country_type
 *               - ort
 *             properties:
 *               country:
 *                 type: string
 *                 description: Название страны на русском
 *               country_en:
 *                 type: string
 *                 description: Название страны на английском
 *               agreement:
 *                 type: boolean
 *                 description: Наличие соглашения
 *               agreement_year:
 *                 type: string
 *                 example: "2024"
 *                 description: Год соглашения
 *               spravka:
 *                 type: boolean
 *                 description: Требуется справка
 *               id_country_type:
 *                 type: integer
 *                 description: Тип страны
 *               ort:
 *                 type: boolean
 *                 description: Требуется ОРТ
 *               ort_max_ball:
 *                 type: number
 *                 description: Максимальный балл ОРТ
 *     responses:
 *       200:
 *         description: Страна успешно добавлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_country:
 *                       type: integer
 *       400:
 *         description: Неверный формат данных или дубликат
 *       401:
 *         description: Нет доступа
 *       500:
 *         description: Ошибка сервера
 */
router.post("/create",authorize_1.isMinistryToken,ctrl.countryCreate),
/**
 * @swagger
 * /api/country/update/{id_country}:
 *   put:
 *     tags:
 *       - Country
 *     summary: Обновить информацию о стране
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_country
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - $ref: '#/components/parameters/langParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country
 *               - country_en
 *               - agreement
 *               - spravka
 *               - id_country_type
 *               - ort
 *             properties:
 *               country:
 *                 type: string
 *                 description: Название страны на русском
 *               country_en:
 *                 type: string
 *                 description: Название страны на английском
 *               agreement:
 *                 type: boolean
 *                 description: Наличие соглашения
 *               agreement_year:
 *                 type: string
 *                 example: "2024"
 *                 description: Год соглашения
 *               spravka:
 *                 type: boolean
 *                 description: Требуется справка
 *               id_country_type:
 *                 type: integer
 *                 description: Тип страны
 *               ort:
 *                 type: boolean
 *                 description: Требуется ОРТ
 *               ort_max_ball:
 *                 type: number
 *                 description: Максимальный балл ОРТ
 *     responses:
 *       200:
 *         description: Успешное обновление
 *       400:
 *         description: Неверный формат данных или дубликат
 *       401:
 *         description: Нет доступа
 *       404:
 *         description: Страна не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.put("/update/:id_country",authorize_1.isMinistryToken,ctrl.countryUpdate),
/**
 * @swagger
 * /api/country/delete/{id_country}:
 *   delete:
 *     tags:
 *       - Country
 *     summary: Удалить страну
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_country
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Страна успешно удалена
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Нет доступа
 *       404:
 *         description: Страна не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/delete/:id_country",authorize_1.isMinistryToken,ctrl.countryDelete),exports.default=router},9607:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0});exports.default=(_req,res,next)=>{res.setHeader("Cache-Control","no-store, no-cache, must-revalidate, private"),res.setHeader("Pragma","no-cache"),res.setHeader("Expires","Thu, 01 Jan 1970 00:00:00 GMT"),next()}},9647:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const university_route_1=__importDefault(__webpack_require__(5196));exports.default=university_route_1.default},9682:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const express_1=__webpack_require__(7252),authorize_1=__webpack_require__(1008),faculty_controller_1=__webpack_require__(3915),router=(0,express_1.Router)(),ctrl=new faculty_controller_1.FacultyController;
/**
 * @swagger
 * /api/faculty/my:
 *   get:
 *     tags:
 *       - Faculty
 *     summary: Получить мои факультеты
 *     description: Возвращает список факультетов текущего пользователя университета
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список факультетов успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Требуется авторизация
 */
router.get("/my",authorize_1.isUniversityToken,ctrl.getMyFaculties),
/**
 * @swagger
 * /api/faculty/selector:
 *   get:
 *     tags:
 *       - Faculty
 *     summary: Получить селектор факультетов
 *     description: Возвращает список факультетов для выпадающего списка с учетом языка
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/langParam'
 *     responses:
 *       200:
 *         description: Список факультетов для селектора
 *       401:
 *         description: Требуется авторизация
 */
router.get("/selector",authorize_1.isUniversityToken,ctrl.getFacultiesSelector),
/**
 * @swagger
 * /api/faculty:
 *   post:
 *     tags:
 *       - Faculty
 *     summary: Создать новый факультет
 *     description: Создает новый факультет в университете
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - faculty
 *               - faculty_en
 *               - s_faculty
 *               - s_faculty_en
 *             properties:
 *               faculty:
 *                 type: string
 *                 example: "Факультет информационных технологий"
 *               faculty_en:
 *                 type: string
 *                 example: "Faculty of Information Technology"
 *               s_faculty:
 *                 type: string
 *                 example: "ФИТ"
 *               s_faculty_en:
 *                 type: string
 *                 example: "FIT"
 *               faculty_url:
 *                 type: string
 *                 nullable: true
 *                 example: "https://fit.university.edu"
 *     responses:
 *       200:
 *         description: Факультет успешно создан
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Дубликат записи
 */
router.post("/",authorize_1.isUniversityToken,ctrl.createFaculty),
/**
 * @swagger
 * /api/faculty/{id_faculty}:
 *   put:
 *     tags:
 *       - Faculty
 *     summary: Обновить факультет
 *     description: Обновляет данные существующего факультета
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_faculty
 *         in: path
 *         required: true
 *         description: ID факультета
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - faculty
 *               - faculty_en
 *               - s_faculty
 *               - s_faculty_en
 *             properties:
 *               faculty:
 *                 type: string
 *                 example: "Факультет информационных технологий"
 *               faculty_en:
 *                 type: string
 *                 example: "Faculty of Information Technology"
 *               s_faculty:
 *                 type: string
 *                 example: "ФИТ"
 *               s_faculty_en:
 *                 type: string
 *                 example: "FIT"
 *               faculty_url:
 *                 type: string
 *                 nullable: true
 *                 example: "https://fit.university.edu"
 *     responses:
 *       200:
 *         description: Факультет успешно обновлен
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Дубликат записи
 */
router.put("/:id_faculty",authorize_1.isUniversityToken,ctrl.updateFaculty),
/**
 * @swagger
 * /api/faculty/{id_faculty}:
 *   delete:
 *     tags:
 *       - Faculty
 *     summary: Удалить факультет
 *     description: Удаляет факультет из системы
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_faculty
 *         in: path
 *         required: true
 *         description: ID факультета
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Факультет успешно удален
 *       400:
 *         description: Неверный формат данных
 *       401:
 *         description: Требуется авторизация
 *       409:
 *         description: Факультет имеет связанные записи и не может быть удален
 */
router.delete("/:id_faculty",authorize_1.isUniversityToken,ctrl.deleteFaculty),exports.default=router},9700:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.emailVerifySchema=void 0;const zod_1=__webpack_require__(1569),regex_1=__webpack_require__(3807);exports.emailVerifySchema=zod_1.z.object({email:zod_1.z.string({required_error:"email_required",invalid_type_error:"email_invalid"}).regex(regex_1.EMAIL_FORMAT_REGEX,{message:"email_invalid"}),isCheckEmail:zod_1.z.boolean().optional()})},9822:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const settings_route_1=__importDefault(__webpack_require__(3130));exports.default=settings_route_1.default},9896:module=>{module.exports=require("fs")},9925:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const commission_route_1=__importDefault(__webpack_require__(5631));exports.default=commission_route_1.default},9956:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.CountryService=void 0;const iud_1=__webpack_require__(1442),country_repository_1=__webpack_require__(6967);exports.CountryService=class{constructor(){this.repository=new country_repository_1.CountryRepository}async getAllCountry(){return await this.repository.findAllCountry()}async createCountry(data){const{rows}=await this.repository.countryIUD({iud:iud_1.IUDOperation.INSERT,country:data.country,country_en:data.country_en,agreement:data.agreement,agreement_year:data.agreement_year,spravka:data.spravka,id_country_type:data.id_country_type,ort:data.ort,ort_max_ball:data.ort_max_ball});return rows[0]?.sms||"NO_RESPONSE"}async updateCountry(id_country,data){const{rows}=await this.repository.countryIUD({iud:iud_1.IUDOperation.UPDATE,id_country,country:data.country,country_en:data.country_en,agreement:data.agreement,agreement_year:data.agreement_year,spravka:data.spravka,id_country_type:data.id_country_type,ort:data.ort,ort_max_ball:data.ort_max_ball});return rows[0]?.sms||"NO_RESPONSE"}async deleteCountry(id_country){const{rows}=await this.repository.countryIUD({iud:iud_1.IUDOperation.DELETE,id_country});return rows[0]?.sms||"NO_RESPONSE"}}},9982:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.connectToRedis=exports.getRedisClient=void 0;const redis_1=__webpack_require__(4835),env_1=__webpack_require__(6138),crypto_1=__webpack_require__(9095),isCheck=env_1.ENV.CACHE.CHECK,NODE_ENV=env_1.ENV.NODE_ENV,connectionURL=(()=>{if(!isCheck)return"";try{const encrypted=env_1.ENV.CACHE.CONNECTION_STRING;if(!encrypted)return console.warn("⚠️  CACHE_CONNECTION_STRING is not set, but CACHE_CHECK=true"),"";const decrypted=(0,crypto_1.decrypt)(encrypted);if(!decrypted||"string"!=typeof decrypted)throw new Error("Decrypted Redis connection string is invalid");return decrypted.startsWith("redis://")||decrypted.startsWith("rediss://")||console.warn("⚠️  Warning: Redis connection string doesn't start with redis:// or rediss://"),decrypted}catch(error){throw console.error("❌ Failed to decrypt CACHE_CONNECTION_STRING"),console.error("This usually means:"),console.error("1. CACHE_CONNECTION_STRING in .env is not encrypted"),console.error("2. ENC_KEY_BASE64 or ENC_IV_BASE64 are incorrect"),console.error("3. CACHE_CONNECTION_STRING was encrypted with different keys"),console.error("\nError details:",error instanceof Error?error.message:error),error}})();let redisClient;exports.getRedisClient=()=>isCheck?redisClient:void 0;async function keys(pattern="*"){try{if(!isCheck)return[];const keys=await redisClient.keys(pattern);return"development"===NODE_ENV&&(console.log("CACHE query: ",{pattern,method:"keys",count:keys.length}),keys.length>1e3&&console.warn("⚠️  Large number of keys! Consider using SCAN instead of KEYS")),keys}catch(err){return console.error("❌ CACHE ERROR=>",err),[]}}exports.connectToRedis=async()=>{try{isCheck&&(redisClient=(0,redis_1.createClient)({url:connectionURL}),redisClient.on("error",error=>{console.error(`❌ redisClient on Error: ${error}`)}),await redisClient.connect(),console.log("✅ Connected to redis"))}catch(error){console.error(`❌ Failed to connect to redis: ${error}`)}};const Cache={get:async function(key){try{if(!isCheck)return null;const result=await redisClient.get(key);return"development"===NODE_ENV&&console.log("CACHE query: ",{key,method:"get"}),result?JSON.parse(result):null}catch(err){return console.error("❌ CACHE ERROR=>",err),console.error("❌ CACHE query: ",{key,method:"get"}),null}},set:async function(key,value,expireSeconds){try{return!!isCheck&&(await redisClient.set(key,JSON.stringify(value),{EX:expireSeconds||900,NX:!0}),"development"===NODE_ENV&&console.log("CACHE query: ",{key,method:"set"}),!0)}catch(err){return console.error("❌ CACHE ERROR=>",err),console.error("❌ CACHE query: ",{key,method:"set"}),!1}},del:async function(key){try{return!!isCheck&&(await redisClient.del(key),"development"===NODE_ENV&&console.log("CACHE query: ",{key,method:"del"}),!0)}catch(err){return console.error("❌ CACHE ERROR=>",err),console.error("❌ CACHE query: ",{key,method:"del"}),!1}},keys,deletePattern:async function(pattern){try{if(!isCheck)return 0;const keysToDelete=await keys(pattern);if(0===keysToDelete.length)return 0;const result=await redisClient.del(keysToDelete);return"development"===NODE_ENV&&console.log("CACHE query: ",{pattern,method:"deletePattern",deleted:result}),result}catch(err){return console.error("❌ CACHE ERROR=>",err),0}},flushAll:async function(){try{return!!isCheck&&(await redisClient.flushAll(),"development"===NODE_ENV&&console.log("CACHE query: ",{method:"flushAll"}),!0)}catch(err){return console.error("❌ CACHE ERROR=>",err),!1}},ttl:async function(key){try{if(!isCheck)return-2;const result=await redisClient.ttl(key);return"development"===NODE_ENV&&console.log("CACHE query: ",{key,method:"ttl",result}),result}catch(err){return console.error("❌ CACHE ERROR=>",err),-2}},exists:async function(key){try{if(!isCheck)return!1;return 1===await redisClient.exists(key)}catch(err){return console.error("❌ CACHE ERROR=>",err),!1}},getStats:async function(){try{if(!isCheck||!redisClient)return{totalKeys:0,memoryUsed:"0",uptime:0,connected:!1};const info=await redisClient.info("memory"),dbSize=await redisClient.dbSize(),serverInfo=await redisClient.info("server"),memoryMatch=info.match(/used_memory_human:(.+)/),uptimeMatch=serverInfo.match(/uptime_in_seconds:(\d+)/);return{totalKeys:dbSize,memoryUsed:memoryMatch?memoryMatch[1].trim():"unknown",uptime:uptimeMatch?parseInt(uptimeMatch[1]):0,connected:redisClient.isOpen}}catch(err){return console.error("❌ CACHE ERROR=>",err),{totalKeys:0,memoryUsed:"0",uptime:0,connected:!1}}}};exports.default=Cache}},__webpack_module_cache__={};var __webpack_exports__=function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.exports}(7806);app=__webpack_exports__})();