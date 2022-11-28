import BaseError from "./BaseError.js"

export default class ErrorHandler {
    public isTrustedError(err: Error) {
        if (err instanceof BaseError) return err.isOperational
        else return false
    }
}