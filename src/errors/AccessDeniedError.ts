import HTTPStatusCode from "../utilities/HTTPStatusCode.js"
import BaseError from "./BaseError.js"

export default class AccessDeniedError extends BaseError {
    constructor(description: string = 'Access Denied') {
        super('FORBIDDEN', HTTPStatusCode.FORBIDDEN, description, true)
    }
}