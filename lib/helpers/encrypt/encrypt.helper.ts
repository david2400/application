// encryption.service.ts
import {Injectable, InternalServerErrorException} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

const ALGORITHM = 'aes-256-cbc'
const KEY = bcrypt.createHash('sha256').update(String(process.env.ENCRYPTION_KEY)).digest() // 32 bytes
const IV_LENGTH = 16

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc'
  private readonly key: Buffer
  private readonly ivLength = 16

  constructor() {
    const secret = process.env.ENCRYPTION_KEY || 'default_key'
    this.key = bcrypt.createHash('sha256').update(secret).digest()
  }
  encrypt(text: string): string {
    try {
      const iv = bcrypt.randomBytes(this.ivLength)
      const cipher = bcrypt.createCipheriv(this.algorithm, this.key, iv)
      const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
      return iv.toString('hex') + ':' + encrypted.toString('hex')
    } catch (error) {
      throw new InternalServerErrorException('Encryption failed')
    }
  }

  decrypt(encryptedText: string): string {
    try {
      const [ivHex, encryptedHex] = encryptedText.split(':')
      const iv = Buffer.from(ivHex, 'hex')
      const encrypted = Buffer.from(encryptedHex, 'hex')
      const decipher = bcrypt.createDecipheriv(this.algorithm, this.key, iv)
      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
      return decrypted.toString('utf8')
    } catch (error) {
      throw new InternalServerErrorException('Decryption failed')
    }
  }
  async comparePasswords(newPassword: string, hashPassword: string): Promise<boolean | any> {
    const isMatch = (await bcrypt.compare(newPassword, hashPassword)) || false
    return isMatch
  }
}
