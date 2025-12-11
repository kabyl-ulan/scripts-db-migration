#!/usr/bin/env node
/**
 * Генератор ключей шифрования для EduGate
 *
 * Создает криптографически стойкие ключи для AES-256-CBC:
 * - ENC_KEY_BASE64: 32 байта (256 бит) для AES-256
 * - ENC_IV_BASE64: 16 байт (128 бит) для Initialization Vector
 *
 * Использование:
 *   node scripts/generate-encryption-keys.js
 */

const crypto = require('crypto');

console.log('🔐 Генерация новых ключей шифрования для AES-256-CBC\n');

// Генерация ключа (32 байта = 256 бит для AES-256)
const key = crypto.randomBytes(32);
const keyBase64 = key.toString('base64');

// Генерация IV (16 байт = 128 бит для AES-CBC)
const iv = crypto.randomBytes(16);
const ivBase64 = iv.toString('base64');

console.log('📋 Добавьте эти переменные в ваш .env файл:\n');
console.log('─'.repeat(80));
console.log(`ENC_KEY_BASE64=${keyBase64}`);
console.log(`ENC_IV_BASE64=${ivBase64}`);
console.log('─'.repeat(80));

console.log('\n✅ Размеры:');
console.log(`   ENC_KEY_BASE64: ${key.length} байт (${key.length * 8} бит) -> ${keyBase64.length} символов в base64`);
console.log(`   ENC_IV_BASE64:  ${iv.length} байт (${iv.length * 8} бит) -> ${ivBase64.length} символов в base64`);

console.log('\n⚠️  ВАЖНО:');
console.log('   1. Сохраните эти ключи в БЕЗОПАСНОМ месте');
console.log('   2. НЕ коммитьте их в git');
console.log('   3. Используйте разные ключи для dev/prod окружений');
console.log('   4. При смене ключей старые данные станут нечитаемыми');
console.log('   5. Для production используйте secrets management (AWS Secrets Manager, HashiCorp Vault)');

console.log('\n🔄 Миграция при смене ключей:');
console.log('   - Сохраните старые ключи как ENC_KEY_BASE64_OLD и ENC_IV_BASE64_OLD');
console.log('   - Расшифруйте данные старыми ключами');
console.log('   - Зашифруйте заново новыми ключами');

console.log('\n');
