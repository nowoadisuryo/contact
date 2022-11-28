import HTTPStatusCode from "../utilities/HTTPStatusCode.js"
import BaseError from "./BaseError.js"

export default class ValidationError extends BaseError{
    constructor(description: string = 'Bad Request') {
        super('BAD REQUEST', HTTPStatusCode.BAD_REQUEST, description, true)
    }
}