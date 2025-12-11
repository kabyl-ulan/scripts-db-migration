# Примеры миграций

Коллекция готовых примеров SQL миграций для типичных задач.

## Создание таблиц

### Простая таблица пользователей
```sql
-- migrations/V001__create_users.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

### Таблица с foreign key
```sql
-- migrations/V002__create_posts.sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status VARCHAR(20) DEFAULT 'draft',
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);
```

### Таблица связей many-to-many
```sql
-- migrations/V003__create_tags_and_post_tags.sql
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE post_tags (
    post_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    CONSTRAINT fk_post_tags_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_post_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
```

---

## Добавление колонок

### Добавление одной колонки
```sql
-- migrations/V004__add_phone_to_users.sql
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

CREATE INDEX idx_users_phone ON users(phone);
```

### Добавление нескольких колонок
```sql
-- migrations/V005__add_user_profile_fields.sql
ALTER TABLE users ADD COLUMN first_name VARCHAR(100);
ALTER TABLE users ADD COLUMN last_name VARCHAR(100);
ALTER TABLE users ADD COLUMN birth_date DATE;
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500);
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT true;

CREATE INDEX idx_users_is_active ON users(is_active);
```

### Добавление NOT NULL колонки с дефолтным значением
```sql
-- migrations/V006__add_role_to_users.sql
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user' NOT NULL;

CREATE INDEX idx_users_role ON users(role);
```

---

## Изменение колонок

### Изменение типа колонки
```sql
-- migrations/V007__increase_email_length.sql
ALTER TABLE users ALTER COLUMN email TYPE VARCHAR(320);
```

### Добавление NOT NULL constraint
```sql
-- migrations/V008__make_username_not_null.sql
-- Сначала заполните NULL значения
UPDATE users SET username = 'user_' || id WHERE username IS NULL;

-- Потом добавьте NOT NULL
ALTER TABLE users ALTER COLUMN username SET NOT NULL;
```

### Изменение дефолтного значения
```sql
-- migrations/V009__change_status_default.sql
ALTER TABLE posts ALTER COLUMN status SET DEFAULT 'published';
```

### Переименование колонки
```sql
-- migrations/V010__rename_password_hash.sql
ALTER TABLE users RENAME COLUMN password_hash TO password;
```

---

## Удаление объектов

### Удаление колонки
```sql
-- migrations/V011__remove_bio_from_users.sql
ALTER TABLE users DROP COLUMN bio;
```

### Удаление нескольких колонок
```sql
-- migrations/V012__remove_old_fields.sql
ALTER TABLE users DROP COLUMN old_field_1;
ALTER TABLE users DROP COLUMN old_field_2;
ALTER TABLE users DROP COLUMN old_field_3;
```

### Удаление таблицы
```sql
-- migrations/V013__drop_old_logs.sql
DROP TABLE old_logs;
```

---

## Индексы

### Создание индекса
```sql
-- migrations/V014__add_created_at_index.sql
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

### Создание уникального индекса
```sql
-- migrations/V015__add_unique_slug_index.sql
CREATE UNIQUE INDEX idx_posts_slug ON posts(slug);
```

### Создание составного индекса
```sql
-- migrations/V016__add_user_status_index.sql
CREATE INDEX idx_posts_user_status ON posts(user_id, status);
```

### Создание частичного индекса
```sql
-- migrations/V017__add_active_users_index.sql
CREATE INDEX idx_users_active ON users(email) WHERE is_active = true;
```

### Удаление индекса
```sql
-- migrations/V018__drop_old_index.sql
DROP INDEX idx_users_old_field;
```

---

## Constraints

### Добавление UNIQUE constraint
```sql
-- migrations/V019__add_email_unique.sql
ALTER TABLE users ADD CONSTRAINT uq_users_email UNIQUE (email);
```

### Добавление CHECK constraint
```sql
-- migrations/V020__add_age_check.sql
ALTER TABLE users ADD COLUMN age INTEGER;
ALTER TABLE users ADD CONSTRAINT chk_users_age CHECK (age >= 0 AND age <= 150);
```

### Добавление FOREIGN KEY
```sql
-- migrations/V021__add_category_fk.sql
ALTER TABLE posts ADD COLUMN category_id INTEGER;
ALTER TABLE posts ADD CONSTRAINT fk_posts_category
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
```

### Удаление constraint
```sql
-- migrations/V022__drop_old_constraint.sql
ALTER TABLE posts DROP CONSTRAINT chk_posts_status;
```

---

## Функции и триггеры

### Функция обновления updated_at
```sql
-- migrations/V023__add_updated_at_trigger.sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Добавить к существующим таблицам
CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
```

### Функция валидации email
```sql
-- migrations/V024__add_email_validation.sql
CREATE OR REPLACE FUNCTION validate_email()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format: %', NEW.email;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_validate_email
    BEFORE INSERT OR UPDATE OF email ON users
    FOR EACH ROW
    EXECUTE FUNCTION validate_email();
```

### Триггер для аудита
```sql
-- migrations/V025__add_audit_trigger.sql
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL,
    user_id INTEGER,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, operation, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(NEW)::jsonb);
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, operation, old_data, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, operation, old_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD)::jsonb);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Применить к таблице
CREATE TRIGGER trigger_users_audit
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW
    EXECUTE FUNCTION audit_trigger();
```

---

## Миграция данных

### Заполнение справочника
```sql
-- migrations/V026__populate_roles.sql
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

INSERT INTO roles (name, description) VALUES
    ('admin', 'Администратор системы'),
    ('moderator', 'Модератор контента'),
    ('user', 'Обычный пользователь'),
    ('guest', 'Гость');
```

### Перенос данных из одной колонки в другую
```sql
-- migrations/V027__migrate_full_name.sql
-- Добавляем новые колонки
ALTER TABLE users ADD COLUMN first_name VARCHAR(100);
ALTER TABLE users ADD COLUMN last_name VARCHAR(100);

-- Переносим данные из full_name
UPDATE users
SET
    first_name = SPLIT_PART(full_name, ' ', 1),
    last_name = SPLIT_PART(full_name, ' ', 2)
WHERE full_name IS NOT NULL;

-- Удаляем старую колонку (опционально)
-- ALTER TABLE users DROP COLUMN full_name;
```

### Нормализация данных
```sql
-- migrations/V028__normalize_categories.sql
-- Создаем справочник категорий
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Заполняем из существующих данных
INSERT INTO categories (name)
SELECT DISTINCT category_name
FROM posts
WHERE category_name IS NOT NULL;

-- Добавляем связь
ALTER TABLE posts ADD COLUMN category_id INTEGER;

-- Переносим данные
UPDATE posts p
SET category_id = c.id
FROM categories c
WHERE p.category_name = c.name;

-- Добавляем foreign key
ALTER TABLE posts ADD CONSTRAINT fk_posts_category
    FOREIGN KEY (category_id) REFERENCES categories(id);

-- Удаляем старую колонку
ALTER TABLE posts DROP COLUMN category_name;
```

---

## JSON/JSONB

### Добавление JSONB колонки
```sql
-- migrations/V029__add_metadata.sql
ALTER TABLE posts ADD COLUMN metadata JSONB DEFAULT '{}';

CREATE INDEX idx_posts_metadata ON posts USING GIN (metadata);
```

### Обновление JSONB данных
```sql
-- migrations/V030__update_metadata.sql
UPDATE posts
SET metadata = metadata || '{"version": 1, "source": "migration"}'::jsonb
WHERE metadata IS NOT NULL;
```

---

## Полнотекстовый поиск

### Добавление tsvector
```sql
-- migrations/V031__add_fulltext_search.sql
ALTER TABLE posts ADD COLUMN search_vector tsvector;

-- Заполнение search_vector
UPDATE posts
SET search_vector =
    to_tsvector('russian', coalesce(title, '') || ' ' || coalesce(content, ''));

-- Индекс для быстрого поиска
CREATE INDEX idx_posts_search_vector ON posts USING GIN (search_vector);

-- Триггер для автоматического обновления
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector = to_tsvector('russian',
        coalesce(NEW.title, '') || ' ' || coalesce(NEW.content, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_posts_search_vector
    BEFORE INSERT OR UPDATE OF title, content ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_search_vector();
```

---

## Секции (Partitioning)

### Создание партиционированной таблицы
```sql
-- migrations/V032__create_partitioned_logs.sql
CREATE TABLE logs (
    id BIGSERIAL,
    user_id INTEGER,
    action VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    data JSONB
) PARTITION BY RANGE (created_at);

-- Создание партиций по месяцам
CREATE TABLE logs_2025_01 PARTITION OF logs
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE logs_2025_02 PARTITION OF logs
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

CREATE TABLE logs_2025_03 PARTITION OF logs
    FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');

-- Индексы на каждой партиции
CREATE INDEX idx_logs_2025_01_user_id ON logs_2025_01(user_id);
CREATE INDEX idx_logs_2025_02_user_id ON logs_2025_02(user_id);
CREATE INDEX idx_logs_2025_03_user_id ON logs_2025_03(user_id);
```

---

## Views

### Создание view
```sql
-- migrations/V033__create_active_users_view.sql
CREATE VIEW active_users AS
SELECT
    u.id,
    u.username,
    u.email,
    u.created_at,
    COUNT(p.id) as posts_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.is_active = true
GROUP BY u.id, u.username, u.email, u.created_at;
```

### Создание materialized view
```sql
-- migrations/V034__create_user_stats_mview.sql
CREATE MATERIALIZED VIEW user_stats AS
SELECT
    u.id as user_id,
    u.username,
    COUNT(DISTINCT p.id) as total_posts,
    COUNT(DISTINCT c.id) as total_comments,
    MAX(p.created_at) as last_post_date
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON u.id = c.user_id
GROUP BY u.id, u.username;

CREATE UNIQUE INDEX idx_user_stats_user_id ON user_stats(user_id);

-- Функция для обновления
CREATE OR REPLACE FUNCTION refresh_user_stats()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats;
END;
$$ LANGUAGE plpgsql;
```

---

## Extensions

### Включение расширений
```sql
-- migrations/V035__enable_extensions.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- UUID генерация
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- Криптография
CREATE EXTENSION IF NOT EXISTS "hstore";         -- Key-value хранилище
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- Триграммы для поиска
```

---

## Комплексные примеры

### Полная система комментариев
```sql
-- migrations/V036__create_comments_system.sql
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    parent_id BIGINT,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_parent FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- Таблица лайков
CREATE TABLE comment_likes (
    comment_id BIGINT NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (comment_id, user_id),
    CONSTRAINT fk_comment_likes_comment FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_likes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Триггер для подсчета лайков
CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE comments SET likes_count = likes_count + 1 WHERE id = NEW.comment_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE comments SET likes_count = likes_count - 1 WHERE id = OLD.comment_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_comment_likes_count
    AFTER INSERT OR DELETE ON comment_likes
    FOR EACH ROW
    EXECUTE FUNCTION update_comment_likes_count();
```

---

## Полезные паттерны

### Soft delete
```sql
-- migrations/V037__add_soft_delete.sql
ALTER TABLE posts ADD COLUMN deleted_at TIMESTAMP;

CREATE INDEX idx_posts_deleted_at ON posts(deleted_at);

-- View для активных постов
CREATE VIEW active_posts AS
SELECT * FROM posts WHERE deleted_at IS NULL;
```

### Версионирование записей
```sql
-- migrations/V038__add_versioning.sql
ALTER TABLE posts ADD COLUMN version INTEGER DEFAULT 1;

CREATE TABLE posts_history (
    id BIGSERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    version INTEGER NOT NULL,
    title VARCHAR(255),
    content TEXT,
    changed_by INTEGER,
    changed_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_posts_history_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE INDEX idx_posts_history_post_id ON posts_history(post_id);
```

---

📖 [Вернуться к документации](./MIGRATION_GUIDE.md)
