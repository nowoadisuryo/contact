import chaiHttp from "chai-http"
import chai, { expect, use } from "chai"
import HTTPStatusCode from "../../utilities/HTTPStatusCode.js"
import app from "../Express.js"
import { admin, user } from "../Constant.js"

use(chaiHttp)

describe('User Controller', function () {
    let adminAccessToken = ''
    describe('Sign In', function () {
        it('Should return a Rejected Promise when the password incorrect', function (done) {
            chai.request(app)
                .post('/user/signin')
                .type('form')
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.UNAUTHORIZED)
                    done()
                })
        })

        it('Should return an access token', function (done) {
            chai.request(app)
                .post('/user/signin')
                .type('form')
                .send(admin)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    adminAccessToken = res.text
                    done()
                })
        })
    })
    describe('Create', function () {
        it('Should throw an Authentication Error when access token is missing ', function (done) {
            chai.request(app)
                .post('/user')
                .type('form')
                .send(admin)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.UNAUTHORIZED)
                    done()
                })
        })

        it('Should save the user and generate access token', function (done) {
            chai.request(app)
                .post('/user')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .type('form')
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.text).length.gt(0)
                    done()
                })
        })
    })
})