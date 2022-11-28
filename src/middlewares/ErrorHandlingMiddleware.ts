import ValidationError from "../errors/ValidationError.js"
import AccessDeniedError from "../errors/AccessDeniedError.js"
import AuthenticationError from "../errors/AuthenticationError.js"
import { Request, Response, Express, NextFunction } from "express"
import HTTPStatusCode from "../utilities/HTTPStatusCode.js"
import ErrorHandler from "../errors/ErrorHandler.js"
import NotFoundError from "../errors/NotFoundError.js"

const errorHandler = new ErrorHandler()

function authenticationErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AuthenticationError) {
        if (res.headersSent) return next(err)
        res.status(HTTPStatusCode.UNAUTHORIZED)
        res.json({
            message: err.message,
            error: err
        })
    } else {
        next(err)
    }
}

function validationErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
        if (res.headersSent) return next(err)
        res.status(HTTPStatusCode.BAD_REQUEST)
        res.json({
            message: err.message,
            error: err
        })
    } else {
        next(err)
    }
}

function accessDeniedErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AccessDeniedError) {
        if (res.headersSent) return next(err)
        res.status(HTTPStatusCode.FORBIDDEN)
        res.json({
            message: err.message,
            error: err
        })
    } else {
        next(err)
    }
}

function notFoundErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof NotFoundError) {
        if (res.headersSent) return next(err)
        res.status(HTTPStatusCode.NOT_FOUND)
        res.json({
            message: err.message,
            error: err
        })
    } else {
        next(err)
    }
}

function genericErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (!errorHandler.isTrustedError(err)) {
        if (res.headersSent) return next(err)
        res.status(HTTPStatusCode.INTERNAL_SERVER)
        res.json({
            message: "Internal Server Error",
            error: {
                "name": "INTERNAL SERVER ERROR",
                "httpCode": HTTPStatusCode.INTERNAL_SERVER,
                "isOperational": false
            }
        })
    } else {
        next()
    }
}

export default function ErrorHandlingMiddleware(app: Express) {
    app.use([
        authenticationErrorHandler,
        accessDeniedErrorHandler,
        validationErrorHandler,
        notFoundErrorHandler,
        genericErrorHandler
    ])
}