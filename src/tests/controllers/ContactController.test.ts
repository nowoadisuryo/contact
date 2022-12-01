import chaiHttp from "chai-http"
import chai, { expect, use } from "chai"
import HTTPStatusCode from "../../utilities/HTTPStatusCode.js"
import app from "../Express.js"
import { admin, contact1 } from "../Constant.js"
import ContactService from "../../services/ContactService.js"

use(chaiHttp)

describe('Contact Controller', function () {
    let adminAccessToken = ''

    before(function (done) {
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

    describe('Find All', function () {
        it('Should return an empty array of contact', function (done) {
            chai.request(app)
                .get('/contact')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body).to.deep.equal([])
                    expect(res.body.length).to.deep.equal(0)
                    done()
                })
        })
    })

    describe('Create', function () {
        it('Should throw a Validation Error', function (done) {
            let badContact = Object.assign('', contact1)
            badContact.phone_number = '08123123'

            chai.request(app)
                .post('/contact')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .type('form')
                .send(badContact)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.BAD_REQUEST)
                    done()
                })
        })

        it('Should save a new contact', function (done) {
            chai.request(app)
                .post('/contact')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .type('form')
                .send(contact1)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body.full_name).to.equal(contact1.full_name)
                    expect(res.body.phone_number).to.equal(contact1.phone_number)
                    expect(res.body.address).to.equal(contact1.address)
                    done()
                })
        })
    })

    describe('Edit', function () {
        it('Should throw a Validation Error', function (done) {
            let badContact = Object.assign('', contact1)
            badContact._id = 1
            badContact.phone_number = '08123123'

            chai.request(app)
                .patch('/contact')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .type('form')
                .send(badContact)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.BAD_REQUEST)
                    done()
                })
        })

        it('Should throw a Not Found Error', function (done) {
            let badContact = Object.assign('', contact1)
            badContact._id = 2

            chai.request(app)
                .patch('/contact')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .type('form')
                .send(badContact)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.NOT_FOUND)
                    done()
                })
        })

        it('Should edit an existing contact', function (done) {
            let contactEdit = Object.assign('', contact1)
            contactEdit._id = 1
            contactEdit.full_name = 'Nowo'
            contactEdit.phone_number = '+6283214565135'
            contactEdit.address = 'Bandung'

            chai.request(app)
                .patch('/contact')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .type('form')
                .send(contactEdit)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body.full_name).to.equal(contactEdit.full_name)
                    expect(res.body.phone_number).to.equal(contactEdit.phone_number)
                    expect(res.body.address).to.equal(contactEdit.address)
                    done()
                })
        })
    })

    describe('Find All, Find One and Sort', function () {
        before(function (done) {
            chai.request(app)
                .post('/contact')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .type('form')
                .send(contact1)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body.full_name).to.equal(contact1.full_name)
                    expect(res.body.phone_number).to.equal(contact1.phone_number)
                    expect(res.body.address).to.equal(contact1.address)
                    done()
                })
        })

        it('Should get the array of contact', function (done) {
            chai.request(app)
                .get('/contact')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body.length).gt(0)
                    done()
                })
        })

        it('Should not get the contact', function (done) {
            chai.request(app)
                .get('/contact/3')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.NOT_FOUND)
                    done()
                })
        })

        it('Should get the contact', function (done) {
            chai.request(app)
                .get('/contact/1')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body).to.have.property('full_name', 'Nowo')
                    done()
                })
        })

        it('Should sort the array of contact by address', function (done) {
            chai.request(app)
                .get('/contact/sort')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .query('field=address')
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body.length).gt(0)
                    expect(res.body[0]).to.have.property('address', 'Bandung')
                    expect(res.body[1]).to.have.property('address', 'Jakarta')
                    done()
                })
        })

        it('Should sort the array of contact by full name', function (done) {
            chai.request(app)
                .get('/contact/sort')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .query('field=name')
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body.length).gt(0)
                    expect(res.body[0]).to.have.property('full_name', 'John Doe')
                    expect(res.body[1]).to.have.property('full_name', 'Nowo')
                    done()
                })
        })

        it('Should sort the array of contact by id (default)', function (done) {
            chai.request(app)
                .get('/contact/sort')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .end(function (err, res) {
                    expect(res).to.have.status(HTTPStatusCode.OK)
                    expect(res.body.length).gt(0)
                    expect(res.body[0]).to.have.property('_id', 1)
                    expect(res.body[1]).to.have.property('_id', 2)
                    done()
                })
        })
    })

    describe('Delete', function () {
        it('Should not delete non-existing contact', function (done) {
            chai.request(app)
                .delete('/contact/3')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .end(function (err, res) {
                    expect(res.body).to.deep.equal(false)
                    done()
                })
        })

        it('Should delete the existing contact', function (done) {
            chai.request(app)
                .delete('/contact/2')
                .set('Authorization', 'Bearer ' + adminAccessToken)
                .end(function (err, res) {
                    expect(res.body).to.deep.equal(true)
                    done()
                })
        })
    })
})