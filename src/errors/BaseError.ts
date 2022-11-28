import HTTPStatusCode from "../utilities/HTTPStatusCode.js"

export default class BaseError extends Error {
    public readonly name: string
    public readonly httpCode: HTTPStatusCode
    public readonly isOperational: boolean

    constructor(name: string, httpCode: HTTPStatusCode, description: string, isOperational: boolean) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name
        this.httpCode = httpCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}