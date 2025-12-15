# Руководство по синхронизации схем (Schema Sync)

## Обзор

Schema Sync позволяет автоматически синхронизировать структуру таблиц с **master базы** (источник истины) на все **slave базы** (целевые).

## Настройка

### 1. Конфигурация серверов

В файле `config/databases.js` укажите:
- **master** сервер с тегом `["master"]`
- **slave** сервера с тегом `["slave"]`

```javascript
export default {
  defaults: { /* ... */ },
  servers: [
    {
      id: "master",
      host: "192.168.1.10",  // IP master сервера
      tags: ["master", "production"],
      databases: ["edu_prod"],
    },
    {
      id: "slave-dev",
      host: "192.168.1.20",  // IP slave сервера
      tags: ["slave", "development"],
      databases: ["edu_test"],
    },
    {
      id: "slave-staging",
      host: "192.168.1.30",
      tags: ["slave", "staging"],
      databases: ["edu_staging"],
    },
  ],
};
```

## Команды

### Шаг 1: Проверить различия

Сравнить схему master базы со всеми slave базами:

```bash
npx ts-node src/tools/db-migrate/cli.ts schema:diff edu_prod
```

Результат покажет:
- ❌ **Недостающие столбцы** (есть в master, нет в slave)
- ⚠️ **Лишние столбцы** (есть в slave, нет в master)
- ❌ **Несовпадение типов** (разные типы данных)
- ❌ **Недостающие индексы**

**Пример вывода:**

```
dev/edu_test - differences found:
  Table main_research:
    - Missing column: title (character varying)
    - Extra column: updated
    - Type mismatch: title_ky (expected: character varying(255), actual: character varying(500))
```

### Шаг 2: Сухой прогон (Dry Run)

Посмотреть, какие SQL команды будут выполнены **БЕЗ ПРИМЕНЕНИЯ**:

```bash
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod --dry-run
```

Результат:
```
dev/edu_test - changes needed:
  ALTER TABLE main_research ADD COLUMN title character varying(255) NOT NULL;
  ALTER TABLE main_research ALTER COLUMN title_ky TYPE character varying(255);
  ALTER TABLE main_research ALTER COLUMN title_ru TYPE character varying(255);
```

### Шаг 3: Применить изменения

#### Вариант A: Только добавить недостающие столбцы

```bash
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod
```

⚠️ Лишние столбцы (например `updated`) **НЕ БУДУТ УДАЛЕНЫ**.

#### Вариант B: Полная синхронизация (удалить лишние)

```bash
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod --drop-extra
```

⚠️ **ОПАСНО!** Столбцы, которых нет в master, **БУДУТ УДАЛЕНЫ** вместе с данными!

### Фильтрация серверов

Синхронизировать только определённые сервера:

```bash
# Только development сервера
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod -t slave,development

# Только конкретный сервер
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod -s slave-dev

# Исключить production
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod -e master
```

## Полный рабочий процесс

### Вариант 1: Ручная синхронизация

```bash
# 1. Проверить различия
npx ts-node src/tools/db-migrate/cli.ts schema:diff edu_prod

# 2. Dry run для проверки
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod --dry-run

# 3. Применить изменения
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod
```

### Вариант 2: Автоматизация (скрипт)

Создайте файл `scripts/sync-schema.sh`:

```bash
#!/bin/bash

DATABASE="edu_prod"
MASTER_ID="master"

echo "🔍 Проверяем различия с master базой..."
npx ts-node src/tools/db-migrate/cli.ts schema:diff $DATABASE -m $MASTER_ID

echo ""
echo "📋 Dry run - что будет изменено:"
npx ts-node src/tools/db-migrate/cli.ts schema:sync $DATABASE -m $MASTER_ID --dry-run

echo ""
read -p "Применить изменения? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "✅ Применяем изменения..."
    npx ts-node src/tools/db-migrate/cli.ts schema:sync $DATABASE -m $MASTER_ID
    echo "✅ Готово!"
else
    echo "❌ Отменено"
fi
```

Запуск:
```bash
chmod +x scripts/sync-schema.sh
./scripts/sync-schema.sh
```

## Пример: Синхронизация main_research

**Master база:**
```sql
CREATE TABLE public.main_research (
    id bigserial NOT NULL,
    title varchar(255) NOT NULL,        -- ← Есть в master
    title_ky varchar(255) NULL,
    title_ru varchar(255) NULL,
    attachment varchar(100) NOT NULL,
    organization_id int8 NOT NULL,
    created timestamptz NOT NULL,
    CONSTRAINT main_research_pkey PRIMARY KEY (id)
);
```

**Slave база (до синхронизации):**
```sql
CREATE TABLE public.main_research (
    id bigserial NOT NULL,
    -- title отсутствует                -- ❌ Нужно добавить
    title_ky varchar(500) NULL,         -- ⚠️ Неправильный размер (500 вместо 255)
    title_ru varchar(500) NULL,         -- ⚠️ Неправильный размер
    attachment varchar(100) NOT NULL,
    organization_id int8 NOT NULL,
    created timestamptz NOT NULL,
    updated timestamptz NULL,           -- ⚠️ Лишний столбец
    CONSTRAINT main_research_pkey PRIMARY KEY (id)
);
```

**Команды:**

```bash
# Проверить различия
npx ts-node src/tools/db-migrate/cli.ts schema:diff edu_prod

# Dry run
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod --dry-run

# Синхронизировать (без удаления лишних)
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod

# Или полная синхронизация (с удалением 'updated')
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod --drop-extra
```

## Важные замечания

### ⚠️ Безопасность

- **Всегда делайте бэкап** перед синхронизацией
- **Используйте `--dry-run`** для проверки перед применением
- **Флаг `--drop-extra`** удаляет столбцы безвозвратно!

### 📝 Что синхронизируется

✅ **Синхронизируется:**
- Новые столбцы
- Недостающие индексы
- Изменение типов данных (в будущих версиях)

❌ **НЕ синхронизируется:**
- Данные в таблицах
- Constraints (кроме указанных в схеме)
- Триггеры и функции
- Permissions

### 🔄 Когда использовать

**Schema Sync подходит для:**
- Синхронизации тестовых/staging баз с production
- Восстановления схемы после сбоев
- Развертывания изменений на несколько серверов одновременно

**НЕ подходит для:**
- Миграции данных
- Версионирования изменений (используйте миграции)
- Production → Production синхронизации (слишком опасно)

## Комбинация с миграциями

Рекомендуемый workflow:

1. **Development:** Создаёте миграции и применяете их
2. **Staging:** Синхронизируете со schema:sync для быстрой проверки
3. **Production:** Применяете миграции (НЕ schema:sync)

```bash
# Development
npx ts-node src/tools/db-migrate/cli.ts create "add title to main_research"
# Редактируете миграцию
npx ts-node src/tools/db-migrate/cli.ts migrate -s master

# Staging (быстрая синхронизация)
npx ts-node src/tools/db-migrate/cli.ts schema:sync edu_prod -t staging

# Production (через миграции)
npx ts-node src/tools/db-migrate/cli.ts migrate -t production
```
