import UserService from "../services/UserService.js"
import { NextFunction, Response, Router } from "express"
import RequestInterface from "../interfaces/RequestInterface.js"
import HTTPStatusCode from "../utilities/HTTPStatusCode.js"
import ProtectedRouteMiddleware from "../middlewares/ProtectedRouteMiddleware.js"

let router: Router = Router()
const user = new UserService()

router.post(
    '/',
    ProtectedRouteMiddleware(),
    async function (req: RequestInterface, res: Response, next: NextFunction) {
        try {
            res.status(HTTPStatusCode.OK)
                .setHeader('content-type', 'text/html')
                .send(await user.create(req.body))
        } catch (error) {
            req.error = error
            next(error)
        }
    })

router.post(
    '/signin',
    async function (req: RequestInterface, res: Response, next: NextFunction) {
        try {
            let { email, password } = req.body
            res.send(await user.signIn(email, password))
        } catch (error) {            
            req.error = error
            next(error)
        }
    })

export { router }