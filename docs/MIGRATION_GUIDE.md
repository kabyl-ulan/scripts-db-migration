# Руководство по работе с миграциями БД

## 📋 Содержание

- [Обзор системы](#обзор-системы)
- [Как работают миграции](#как-работают-миграции)
- [SQL Preprocessor](#sql-preprocessor)
- [Создание миграций](#создание-миграций)
- [Запуск миграций](#запуск-миграций)
- [Управление серверами](#управление-серверами)
- [Примеры](#примеры)
- [Troubleshooting](#troubleshooting)

📝 **[Библиотека готовых примеров миграций →](./EXAMPLES.md)** - коллекция SQL примеров для типичных задач

---

## Обзор системы

Система миграций управляет изменениями схемы PostgreSQL базы данных. Основные возможности:

- ✅ Автоматическое отслеживание применённых миграций
- ✅ Версионирование с использованием checksum (MD5)
- ✅ Параллельное выполнение на нескольких серверах
- ✅ Транзакционная безопасность (откат при ошибке)
- ✅ **SQL Preprocessor** - автоматическое добавление `IF NOT EXISTS/IF EXISTS`
- ✅ Фильтрация по серверам и тегам
- ✅ Dry-run режим для предварительного просмотра

---

## Как работают миграции

### 1. Структура миграций

```
migrations/
├── V001__initial_schema.sql       # Первая миграция
├── V002__add_user_roles.sql       # Вторая миграция
└── V003__add_audit_logs.sql       # Третья миграция
```

**Формат имени файла:** `V{версия}__{описание}.sql`
- Версия: последовательное число (001, 002, 003...)
- Описание: краткое описание изменений (только латиница, цифры, подчёркивания)

### 2. Таблица отслеживания `_migrations`

Система автоматически создаёт таблицу `_migrations` в каждой БД:

```sql
CREATE TABLE _migrations (
    version INTEGER PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    checksum VARCHAR(32) NOT NULL,           -- MD5 хеш содержимого
    applied_at TIMESTAMP WITH TIME ZONE,      -- Время применения
    execution_time_ms INTEGER                 -- Время выполнения
);
```

### 3. Процесс выполнения миграции

```
┌─────────────────────────────────────┐
│ 1. Чтение файла миграции            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 2. Проверка: уже применена?         │
│    - Если да → пропустить           │
│    - Если нет → продолжить          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 3. SQL Preprocessor                 │
│    Добавление IF NOT EXISTS и т.д.  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 4. BEGIN TRANSACTION                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 5. Выполнение SQL                   │
│    - Успех → продолжить             │
│    - Ошибка → ROLLBACK              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 6. Запись в _migrations             │
│    (версия, checksum, время)        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 7. COMMIT                           │
└─────────────────────────────────────┘
```

### 4. Проверка целостности (Checksum)

Система вычисляет MD5 хеш каждой миграции:
- При первом применении → сохраняет checksum
- При повторном запуске → сравнивает checksum
- Если изменилась → выдаёт **ошибку** (миграция была изменена после применения)

---

## SQL Preprocessor

### Что это?

Автоматическая система, которая **преобразует SQL** перед выполнением, добавляя проверки существования объектов.

### Зачем?

Позволяет безопасно запускать миграции повторно, даже если таблицы/колонки уже существуют.

### Преобразования

| Оригинальный SQL | Преобразуется в |
|------------------|------------------|
| `CREATE TABLE users (...)` | `CREATE TABLE IF NOT EXISTS users (...)` |
| `CREATE SEQUENCE user_seq` | `CREATE SEQUENCE IF NOT EXISTS user_seq` |
| `CREATE INDEX idx_name` | `CREATE INDEX IF NOT EXISTS idx_name` |
| `CREATE UNIQUE INDEX idx_email` | `CREATE UNIQUE INDEX IF NOT EXISTS idx_email` |
| `ALTER TABLE users ADD COLUMN email` | `ALTER TABLE users ADD COLUMN IF NOT EXISTS email` |
| `ALTER TABLE users DROP COLUMN age` | `ALTER TABLE users DROP COLUMN IF EXISTS age` |
| `DROP TABLE old_users` | `DROP TABLE IF EXISTS old_users` |
| `DROP SEQUENCE old_seq` | `DROP SEQUENCE IF EXISTS old_seq` |
| `DROP INDEX old_idx` | `DROP INDEX IF EXISTS old_idx` |

### Пример

**Вы пишете:**
```sql
-- migrations/V002__add_users.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL
);

ALTER TABLE users ADD COLUMN email VARCHAR(255);
CREATE INDEX idx_users_email ON users(email);
```

**Система выполняет:**
```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

### Важно

- **Checksum вычисляется ДО preprocessor** - модификация оригинального файла будет обнаружена
- Preprocessor работает **только при выполнении**, не изменяет файлы
- Если в SQL уже есть `IF NOT EXISTS` - preprocessor его не дублирует

---

## Создание миграций

### Автоматическое создание

```bash
npx ts-node tools/db-migrate/cli.ts create "add user roles"
```

Создаст файл: `migrations/V002__add_user_roles.sql` с шаблоном:

```sql
-- Migration: add user roles
-- Version: 2
-- Created: 2025-12-08T15:30:00.000Z

-- Write your migration SQL here

```

### Ручное создание

1. Узнайте последнюю версию:
   ```bash
   ls migrations/
   ```

2. Создайте новый файл с номером `последняя_версия + 1`:
   ```bash
   touch migrations/V003__my_changes.sql
   ```

### Правила написания миграций

#### ✅ Правильно

```sql
-- Создание таблиц
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Добавление колонок
ALTER TABLE users ADD COLUMN role_id INTEGER;
ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT NOW();

-- Создание индексов
CREATE INDEX idx_users_role_id ON users(role_id);

-- Создание foreign key
ALTER TABLE users
    ADD CONSTRAINT fk_users_role
    FOREIGN KEY (role_id) REFERENCES user_roles(id);

-- Вставка данных
INSERT INTO user_roles (role_name) VALUES ('admin'), ('user'), ('guest');
```

#### ❌ Неправильно

```sql
-- НЕ ИСПОЛЬЗУЙТЕ интерактивные команды
\d users              -- Это psql команда, не SQL
\dt                   -- Не будет работать

-- НЕ ИСПОЛЬЗУЙТЕ несколько транзакций
BEGIN;                -- Миграция уже в транзакции
...
COMMIT;

-- НЕ ИЗМЕНЯЙТЕ применённые миграции
-- После применения миграции её НЕЛЬЗЯ редактировать!
```

---

## Запуск миграций

### Посмотреть статус

```bash
npx ts-node tools/db-migrate/cli.ts status
```

**Вывод:**
```
Migration Status:

● dev/foreigners_new
  Applied: 2 | Pending: 1
    ✓ V001__all_tables.sql
    ✓ V002__add_user_roles.sql
    - V003__add_audit_logs.sql
```

### Запустить все миграции

```bash
npx ts-node tools/db-migrate/cli.ts migrate
```

### Запустить на конкретной базе данных

```bash
npx ts-node tools/db-migrate/cli.ts single dev foreigners_new
```

### Dry-run (предварительный просмотр)

```bash
npx ts-node tools/db-migrate/cli.ts migrate -d
```

Покажет, какие миграции будут применены, **без реального выполнения**.

### Миграция до определённой версии

```bash
npx ts-node tools/db-migrate/cli.ts migrate --target 5
```

Применит только миграции V001...V005.

### Параллельное выполнение

```bash
npx ts-node tools/db-migrate/cli.ts migrate -c 10
```

Устанавливает параллельность на 10 баз одновременно (по умолчанию: 5).

---

## Управление серверами

### Конфигурация

Файл: `config/databases.js`

```javascript
export default {
  defaults: {
    port: 5432,
    user: "postgres",
    password: process.env.DB_PASSWORD,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  },

  servers: [
    {
      id: "dev",
      host: "172.168.0.246",
      tags: ["development", "master"],
      databases: ["foreigners_new"],
    },
    {
      id: "staging",
      host: "172.168.0.250",
      tags: ["staging"],
      databases: ["foreigners_new", "analytics"],
      user: "custom_user",  // Переопределение defaults
    },
    {
      id: "prod-1",
      host: "10.0.1.10",
      tags: ["production", "primary"],
      databases: ["foreigners_new"],
    },
    {
      id: "prod-2",
      host: "10.0.1.11",
      tags: ["production", "replica"],
      databases: ["foreigners_new"],
    },
  ],
};
```

### Фильтрация по тегам

```bash
# Только development серверы
npx ts-node tools/db-migrate/cli.ts migrate -t development

# Только production серверы
npx ts-node tools/db-migrate/cli.ts migrate -t production
```

### Фильтрация по ID серверов

```bash
# Только указанные серверы
npx ts-node tools/db-migrate/cli.ts migrate -s dev,staging

# Исключить серверы
npx ts-node tools/db-migrate/cli.ts migrate -e prod-1,prod-2
```

### Комбинированные фильтры

```bash
# Production серверы, кроме replica
npx ts-node tools/db-migrate/cli.ts migrate -t production -e prod-2
```

---

## Примеры

### Пример 1: Добавление новой таблицы

```sql
-- migrations/V002__add_audit_logs.sql
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id INTEGER,
    changes JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
```

### Пример 2: Добавление колонок к существующей таблице

```sql
-- migrations/V003__add_user_fields.sql
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD COLUMN birth_date DATE;
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN last_login TIMESTAMP;

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_is_active ON users(is_active);
```

### Пример 3: Изменение типа колонки

```sql
-- migrations/V004__change_email_length.sql
ALTER TABLE users ALTER COLUMN email TYPE VARCHAR(320);
```

### Пример 4: Миграция данных

```sql
-- migrations/V005__migrate_old_roles.sql
-- Создание новой таблицы ролей
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Заполнение справочника
INSERT INTO user_roles (role_name)
VALUES ('admin'), ('moderator'), ('user'), ('guest');

-- Добавление поля role_id
ALTER TABLE users ADD COLUMN role_id INTEGER REFERENCES user_roles(id);

-- Миграция данных из старого поля role_name
UPDATE users
SET role_id = (SELECT id FROM user_roles WHERE role_name = users.old_role_field)
WHERE old_role_field IS NOT NULL;

-- Удаление старого поля (опционально)
ALTER TABLE users DROP COLUMN old_role_field;
```

### Пример 5: Создание функций и триггеров

```sql
-- migrations/V006__add_updated_at_trigger.sql
-- Функция обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Добавление поля updated_at
ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

-- Создание триггера
CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## Troubleshooting

### Ошибка: "Checksum mismatch"

**Проблема:** Файл миграции был изменён после применения.

**Решение:**
1. **НЕ ИЗМЕНЯЙТЕ** применённые миграции!
2. Создайте новую миграцию с исправлениями:
   ```bash
   npx ts-node tools/db-migrate/cli.ts create "fix previous migration"
   ```

### Ошибка: "relation already exists"

**Проблема:** Таблица/индекс уже существует в БД.

**Решение:**
- SQL Preprocessor должен автоматически это обрабатывать
- Если ошибка возникает, проверьте синтаксис SQL (возможно нестандартный случай)
- Можно вручную добавить `IF NOT EXISTS` в миграцию

### Миграция зависла

**Проблема:** Долгое выполнение или нет ответа.

**Диагностика:**
```sql
-- Подключитесь к БД и проверьте активные запросы
SELECT pid, query, state, query_start
FROM pg_stat_activity
WHERE state != 'idle';

-- Проверьте блокировки
SELECT * FROM pg_locks WHERE NOT granted;
```

**Решение:**
- Увеличьте timeout: измените `connectionTimeoutMillis` в config
- Разбейте большую миграцию на несколько маленьких

### Миграция упала с ошибкой

**Проблема:** SQL содержит ошибку, транзакция откатилась.

**Решение:**
1. Исправьте SQL в файле миграции
2. Запустите снова:
   ```bash
   npx ts-node tools/db-migrate/cli.ts migrate
   ```
3. Миграция не была записана в `_migrations` → можно безопасно исправить

### Нужно откатить миграцию

**Проблема:** Миграция применена, но нужно откатить изменения.

**Решение:**
1. Создайте **обратную миграцию**:
   ```bash
   npx ts-node tools/db-migrate/cli.ts create "revert add user roles"
   ```

2. Напишите SQL для отката:
   ```sql
   -- migrations/V007__revert_add_user_roles.sql
   DROP TABLE IF EXISTS user_roles CASCADE;
   ALTER TABLE users DROP COLUMN IF EXISTS role_id;
   ```

### Разные версии на разных серверах

**Проблема:** dev - V005, staging - V003, prod - V001.

**Решение:**
- Это **нормально** - каждый сервер применяет только нужные миграции
- Проверьте статус:
  ```bash
  npx ts-node tools/db-migrate/cli.ts status
  ```
- Примените на всех:
  ```bash
  npx ts-node tools/db-migrate/cli.ts migrate
  ```

---

## Лучшие практики

### ✅ Делайте

1. **Одна миграция - одна задача**
   - Создание таблицы
   - Добавление колонки
   - Изменение индекса

2. **Используйте транзакционно-безопасные операции**
   - CREATE TABLE
   - ALTER TABLE ADD COLUMN
   - CREATE INDEX CONCURRENTLY (осторожно! не транзакционная операция)

3. **Тестируйте миграции локально**
   ```bash
   # Dry run сначала
   npx ts-node tools/db-migrate/cli.ts migrate -d -s dev

   # Потом реальный запуск
   npx ts-node tools/db-migrate/cli.ts migrate -s dev
   ```

4. **Делайте резервные копии перед миграциями production**
   ```bash
   pg_dump -h prod-host -U user -d foreigners_new > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

5. **Добавляйте значения по умолчанию для NOT NULL колонок**
   ```sql
   ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active' NOT NULL;
   ```

### ❌ Не делайте

1. **НЕ редактируйте применённые миграции**
   - Checksum изменится → ошибка
   - Создавайте новую миграцию

2. **НЕ удаляйте применённые миграции**
   - История должна быть полной

3. **НЕ используйте `DROP TABLE` без крайней необходимости**
   - Потеря данных необратима

4. **НЕ делайте миграции слишком большими**
   - Разбивайте на несколько файлов
   - Легче отлаживать и откатывать

5. **НЕ забывайте про индексы**
   - Всегда добавляйте индексы для foreign keys
   - Индексы для часто используемых полей (email, username, created_at)

---

## Дополнительно

### Схема синхронизации (Schema Sync)

Система также поддерживает сравнение схем между master и target базами:

```bash
# Дамп схемы из master
npx ts-node tools/db-migrate/cli.ts schema:dump foreigners_new

# Сравнение схем
npx ts-node tools/db-migrate/cli.ts schema:diff foreigners_new

# Синхронизация
npx ts-node tools/db-migrate/cli.ts schema:sync foreigners_new
```

### Переменные окружения

Рекомендуется хранить пароли в `.env`:

```bash
# .env
DB_PASSWORD=your_secure_password
```

```javascript
// config/databases.js
export default {
  defaults: {
    password: process.env.DB_PASSWORD,
  },
};
```

---

## Полезные команды

```bash
# Показать все команды
npx ts-node tools/db-migrate/cli.ts --help

# Статус всех БД
npx ts-node tools/db-migrate/cli.ts status

# Создать миграцию
npx ts-node tools/db-migrate/cli.ts create "description"

# Применить все миграции
npx ts-node tools/db-migrate/cli.ts migrate

# Dry run
npx ts-node tools/db-migrate/cli.ts migrate -d

# Фильтр по тегам
npx ts-node tools/db-migrate/cli.ts migrate -t production

# Фильтр по серверам
npx ts-node tools/db-migrate/cli.ts migrate -s dev,staging

# Исключить серверы
npx ts-node tools/db-migrate/cli.ts migrate -e prod-replica

# Одна база
npx ts-node tools/db-migrate/cli.ts single dev foreigners_new

# Параллельность
npx ts-node tools/db-migrate/cli.ts migrate -c 10

# До версии
npx ts-node tools/db-migrate/cli.ts migrate --target 5
```

---

## Контакты и поддержка

При возникновении проблем:
1. Проверьте [Troubleshooting](#troubleshooting)
2. Посмотрите логи выполнения
3. Проверьте таблицу `_migrations` в БД
4. Создайте issue в репозитории проекта
