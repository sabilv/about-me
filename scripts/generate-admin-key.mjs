// Run: npm run admin:key
// Prints a random 256-bit admin key and its SHA-256 hash.
// Keep the KEY in a password manager. Put only the HASH on the server (ADMIN_KEY_HASH).
import { randomBytes, createHash } from 'node:crypto'

const key = randomBytes(32).toString('base64url')
const hash = createHash('sha256').update(key).digest('hex')

console.log('\nADMIN KEY (secret, save it in a password manager, never commit it):')
console.log(key)
console.log('\nADMIN_KEY_HASH (set this as a secret environment variable on the server):')
console.log(hash + '\n')
