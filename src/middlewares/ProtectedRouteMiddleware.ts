import { NextFunction, Response } from "express"
import passport from "passport"
import AuthenticationError from "../errors/AuthenticationError.js"
import RequestInterface from "../interfaces/RequestInterface.js"

export default function ProtectedRouteMiddleware() {
    return function (req: RequestInterface, res: Response, next: NextFunction) {
        passport.authenticate("jwt", { session: false }, function (error, user, info) {
            if (!user) throw new AuthenticationError("Authentication failed")
            else next()
        })(req, res)
    }
}