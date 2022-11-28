import UserInterface from "../interfaces/UserInterface.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { SECRET, SYMMETRIC_ALGO, TOKEN_ISSUER } from "../utilities/Environments.js"

dotenv.config()

export default function generateAccessToken(user: UserInterface): string {
    if (!user) throw new Error('Invalid user')

    let userInfo = user
    userInfo.password = undefined
    let payload = { userInfo }
    let privateKey = SECRET

    let token = jwt.sign(payload, privateKey, {
        algorithm: SYMMETRIC_ALGO as jwt.Algorithm,
        issuer: TOKEN_ISSUER,
        expiresIn: '1h',
        subject: `${user.email}`,
        notBefore: 0
    })

    return token
}