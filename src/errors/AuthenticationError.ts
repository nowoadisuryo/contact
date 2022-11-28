import HTTPStatusCode from "../utilities/HTTPStatusCode.js"
import BaseError from "./BaseError.js"

export default class AuthenticationError extends BaseError {
    constructor(description: string = 'Unauthorized') {
        super('UNAUTHORIZED', HTTPStatusCode.UNAUTHORIZED, description, true)
    }
}