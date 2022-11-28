import { Router, Response, NextFunction } from "express"
import RequestInterface from "../interfaces/RequestInterface.js"
import ContactService from "../services/ContactService.js"
import multer from "multer"
import path from "node:path"
import ProtectedRouteMiddleware from "../middlewares/ProtectedRouteMiddleware.js"
import HTTPStatusCode from "../utilities/HTTPStatusCode.js"

let router: Router = Router()
const contact = new ContactService()

router.use(ProtectedRouteMiddleware())

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 300 * 1024, // Maximum file size is 300KB
    }
})
router.use(upload.single('profile_pic'))

router.get(
    '/',
    async function (req: RequestInterface, res: Response, next: NextFunction) {
        try {
            res.status(HTTPStatusCode.OK).json(contact.findAll())
        } catch (error) {
            req.error = error
            next(error)
        }
    })

router.post(
    '/',
    async function (req: RequestInterface, res: Response, next: NextFunction) {
        try {
            let _contact = await contact.create({
                full_name: req.body.full_name,
                phone_number: req.body.phone_number,
                address: req.body.address,
                profile_pic: req.file ? req.file.path : ''
            })
            res.status(HTTPStatusCode.OK)
                .setHeader('content-type', 'application/json')
                .send(_contact)
        } catch (error) {
            req.error = error
            next(error)
        }
    })

router.patch(
    '/',
    async function (req: RequestInterface, res: Response, next: NextFunction) {
        try {
            let _contact = await contact.edit({
                _id: parseInt(req.body._id),
                full_name: req.body.full_name,
                phone_number: req.body.phone_number,
                address: req.body.address,
                profile_pic: req.file ? req.file.path : ''
            })

            res.status(HTTPStatusCode.OK)
                .setHeader('content-type', 'application/json')
                .send(_contact)
        } catch (error) {
            req.error = error
            next(error)
        }
    })

router.delete(
    '/:id',
    async function (req: RequestInterface, res: Response, next: NextFunction) {
        try {
            res.status(HTTPStatusCode.OK)
                .setHeader('content-type', 'application/json')
                .send(contact.deleteOne(parseInt(req.params.id)))
        } catch (error) {
            req.error = error
            next(error)
        }
    })

router.get(
    '/sort',
    async function (req: RequestInterface, res: Response, next: NextFunction) {
        try {
            res.status(HTTPStatusCode.OK)
                .setHeader('content-type', 'application/json')
                .send(contact.sortBy(`${req.query.field}`))
        } catch (error) {
            req.error = error
            next(error)
        }
    })

export { router }