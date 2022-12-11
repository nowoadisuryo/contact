import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { HOST, PORT } from './utilities/Environments.js';
import { router as ContactRouter } from './controllers/ContactController.js'
import { router as UserRouter } from "./controllers/UserController.js"
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware.js'
import ErrorHandlingMiddleware from './middlewares/ErrorHandlingMiddleware.js'

const app: Express = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
AuthenticationMiddleware(app)

// Routes
app.get('/', function (req, res) {
    res.send('Hello world!')
})
app.use('/user', UserRouter)
app.use('/contact', ContactRouter)

// Error handling middleware
ErrorHandlingMiddleware(app)

app.listen(PORT, function () {
    console.log(`HTTP server is running at ${HOST}:${PORT}`)
})