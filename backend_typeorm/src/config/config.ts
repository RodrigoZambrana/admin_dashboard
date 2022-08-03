import dotenv from 'dotenv'

dotenv.config()

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 1337
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600
const SERVER_TOKEN_ISSUER =
  process.env.SERVER_TOKEN_ISSUER || 'lfjfjasjfr09ri09wrilfdjdjgdfgd'
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET ||
  'fgdfgdfgdfgfgfdgdfgdfgfgfgtrgrtg5455454y4646hhgdfg'

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
}

const config = {
  server: SERVER,
}

export default config

const PORT = 5055
const JWT_SECRET = 'fgdfgdfgdfgfgfdgdfgdfgfgfgtrgrtg5455454y4646hhgdfg'
const JWT_SECRET_FOR_VERIFY = 'lfjfjasjfr09ri09wrilfdjdjgdfgd'

//this is store and admin dev server url, it is use for email verification and password reset change  option
const STORE_URL = 'http://localhost:3000'
const ADMIN_URL = 'http://localhost:3000'
