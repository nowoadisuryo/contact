import HTTPStatusCode from "../utilities/HTTPStatusCode.js"
import BaseError from "./BaseError.js"

export default class NotFoundError extends BaseError {
    constructor(description: string = 'Data Not Found') {
        super('NOT FOUND', HTTPStatusCode.NOT_FOUND, description, true)
    }
}