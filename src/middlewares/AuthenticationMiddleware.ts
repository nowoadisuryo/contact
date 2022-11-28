import { Express } from "express"
import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { SECRET, SYMMETRIC_ALGO, TOKEN_ISSUER } from "../utilities/Environments.js"

export default function AuthenticationMiddleware(app: Express) {
    const authStrategy = new JwtStrategy({
        secretOrKey: SECRET,
        algorithms: [SYMMETRIC_ALGO],
        issuer: TOKEN_ISSUER,
        ignoreExpiration: false,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async function (payload, done) {
        let id = payload.sub
        if (id) done(null, id)
        else done(null, false)
    })

    passport.use(authStrategy)
    app.use(passport.initialize())
}