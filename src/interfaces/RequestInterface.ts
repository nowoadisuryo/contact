import { Request } from "express";
import ContextInterface from "./ContextInterface.js";

export default interface RequestInterface extends Request {
    error?: unknown,
    context?: ContextInterface
}