#!/usr/bin/env node
/**
 * Шифрование connection strings новыми ключами
 *
 * Использование:
 *   node scripts/encrypt-connection-string.js
 */

const crypto = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

/**
 * Шифрование данных (из crypto.ts)
 */
function encrypt(data, keyBase64, ivBase64) {
  try {
    const key = Buffer.from(keyBase64, "base64");
    const iv = Buffer.from(ivBase64, "base64");

    if (key.length !== 32) {
      throw new Error(`Invalid key length: ${key.length} bytes (expected 32 bytes for AES-256)`);
    }
    if (iv.length !== 16) {
      throw new Error(`Invalid IV length: ${iv.length} bytes (expected 16 bytes)`);
    }

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");

    // Возвращаем чистый base64 (БЕЗ префикса enc:)
    return encrypted;
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

async function main() {
  console.log("🔐 Шифрование connection strings новыми ключами\n");

  try {
    // 1. Получаем новые ключи
    console.log("📥 Введите новые ключи шифрования:\n");
    const newKey = await question("ENC_KEY_BASE64: ");
    const newIV = await question("ENC_IV_BASE64: ");

    console.log("\n📥 Введите незашифрованные connection strings:\n");

    // 2. DB Connection String
    const dbConnection = await question(
      "DB_CONNECTION_STRING (незашифрованный, Enter для пропуска): "
    );

    // 3. Redis Connection String (опционально)
    const redisConnection = await question(
      "REDIS_CONNECTION_STRING (незашифрованный, Enter для пропуска): "
    );

    console.log("\n🔄 Шифрование...\n");

    // 4. Шифруем DB (если указан)
    let encryptedDb = null;
    if (dbConnection && dbConnection.trim()) {
      encryptedDb = encrypt(dbConnection.trim(), newKey.trim(), newIV.trim());
      console.log("✅ DB_CONNECTION_STRING зашифрован");
    }

    // 5. Шифруем Redis (если указан)
    let encryptedRedis = null;
    if (redisConnection && redisConnection.trim()) {
      encryptedRedis = encrypt(redisConnection.trim(), newKey.trim(), newIV.trim());
      console.log("✅ REDIS_CONNECTION_STRING зашифрован");
    }

    // 6. Выводим результат
    console.log("\n📋 Добавьте эти строки в ваш .env файл:\n");
    console.log("─".repeat(80));
    console.log("# Ключи шифрования");
    console.log(`ENC_KEY_BASE64=${newKey.trim()}`);
    console.log(`ENC_IV_BASE64=${newIV.trim()}`);
    console.log("");
    console.log("# Зашифрованные connection strings");
    if (encryptedDb) {
      console.log(`DB_CONNECTION_STRING=${encryptedDb}`);
    }
    if (encryptedRedis) {
      console.log(`REDIS_CONNECTION_STRING=${encryptedRedis}`);
    }
    console.log("─".repeat(80));

    console.log("\n✅ Шифрование завершено успешно!");
    console.log("\n📝 Следующие шаги:");
    console.log("   1. Скопируйте значения выше в ваш .env файл");
    console.log("   2. Перезапустите приложение: npm run dev");
    console.log("   3. Проверьте подключение к базе данных");
    console.log("\n⚠️  Безопасность:");
    console.log("   - Очистите историю терминала после копирования");
    console.log("   - Не коммитьте .env в git");
    console.log("   - Используйте разные ключи для dev/prod окружений");
  } catch (error) {
    console.error("\n❌ Ошибка:", error.message);
    console.error("\nПроверьте:");
    console.error("   - Формат ключей (должны быть base64)");
    console.error("   - Размеры: ENC_KEY_BASE64 = 44 символа, ENC_IV_BASE64 = 24 символа");
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
