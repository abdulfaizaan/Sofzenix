import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// Requires a 32-byte hex encoded key (64 characters long).
// Fallback to a temporary random key if not set (for dev). In prod, this will break if restarting without persistent key.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');

export function encrypt(text: string): string {
  if (!text) return text;
  const key = Buffer.from(ENCRYPTION_KEY, 'hex');
  if (key.length !== 32) throw new Error('Invalid ENCRYPTION_KEY length (must be 32 bytes)');

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string): string {
  if (!text) return text;
  
  const parts = text.split(':');
  if (parts.length !== 3) {
    // Return original if it doesn't match our encrypted format (e.g. legacy plain text)
    return text;
  }
  
  const [ivHex, authTagHex, encryptedText] = parts;

  const key = Buffer.from(ENCRYPTION_KEY, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
