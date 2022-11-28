import dotenv from 'dotenv'

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const HOST = process.env.HOST!
export const PORT = process.env.PORT!
export const MONGODB_URI = process.env.MONGODB_URI!
export const TOKEN_ISSUER = process.env.TOKEN_ISSUER!
export const REDIS_HOST = process.env.REDIS_HOST!
export const REDIS_PORT = process.env.REDIS_PORT!
export const TZ = process.env.TZ || 'Asia/Jakarta'
export const SECRET = process.env.SECRET!
export const SYMMETRIC_ALGO = process.env.SYMMETRIC_ALGO!
export const LOGS_DIR = process.env.LOGS_DIR || 'logs'
export const ERROR_LOG_FILENAME = process.env.ERROR_LOG_FILENAME || 'errors.log'