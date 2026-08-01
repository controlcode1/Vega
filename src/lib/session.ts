import crypto from 'crypto';

const SECRET_KEY = crypto
  .createHash('sha256')
  .update(process.env.SESSION_SECRET || 'vega-gaming-arena-super-secret-key-xyz-987654')
  .digest();

const IV_LENGTH = 16; // For AES-256-CBC

export function encryptSession(data: { username: string; expires: number }): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptSession(token: string): { username: string; expires: number } | null {
  try {
    const parts = token.split(':');
    if (parts.length !== 2) return null;
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    const decryptedStr = Buffer.concat([decrypted, decipher.final()]).toString('utf8');
    
    const parsed = JSON.parse(decryptedStr);
    if (!parsed || typeof parsed.username !== 'string' || typeof parsed.expires !== 'number') {
      return null;
    }
    
    // Check expiration
    if (Date.now() > parsed.expires) {
      return null;
    }
    
    return parsed;
  } catch (error) {
    return null;
  }
}

// Secure credentials check protected against timing and injection attacks
const ADMIN_USERNAME = 'Nemo';
const ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update('Nemo').digest('hex');

export function verifyCredentials(username: unknown, password: unknown): boolean {
  if (typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }
  
  // Hash the incoming password with SHA-256
  const inputHash = crypto.createHash('sha256').update(password).digest('hex');
  
  // Equal length padding for timing safe equality check
  const userBuffer = Buffer.from(username.padEnd(32, ' '));
  const expectedUserBuffer = Buffer.from(ADMIN_USERNAME.padEnd(32, ' '));
  
  const hashBuffer = Buffer.from(inputHash);
  const expectedHashBuffer = Buffer.from(ADMIN_PASSWORD_HASH);
  
  // timingSafeEqual prevents timing attacks, which try to guess chars based on execution latency
  const usernameMatch = crypto.timingSafeEqual(userBuffer, expectedUserBuffer);
  const passwordMatch = crypto.timingSafeEqual(hashBuffer, expectedHashBuffer);
  
  return usernameMatch && passwordMatch;
}
