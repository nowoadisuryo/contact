import { expect, use } from "chai"
import chaiAsPromised from "chai-as-promised"
import NotFoundError from "../../errors/NotFoundError.js"
import ValidationError from "../../errors/ValidationError.js"
import ContactService from "../../services/ContactService.js"

use(chaiAsPromised)

describe('Contact Service', function () {
    const contactService = new ContactService()

    describe('Find All', function () {
        it('Should return an empty array', function () {
            expect(contactService.findAll()).to.be.an('array')
                .and.to.deep.equal([])
        })
    })

    describe('Create', function () {
        it('Should be rejected with Validation Error', function () {
            expect(contactService.create({
                full_name: 'John Doe',
                phone_number: '08123839293812',
                address: 'Jakarta',
                profile_pic: ''
            })).to.be.rejectedWith(ValidationError)
            expect(contactService.create({
                full_name: 'John Doe',
                phone_number: '08123839293812',
                address: 'Jakarta',
                profile_pic: <any>1
            })).to.be.rejectedWith(ValidationError)
        })

        it('Should add a new contact', async function () {
            let contact = await contactService.create({
                full_name: 'John Doe',
                phone_number: '+628123839293812',
                address: 'Jakarta',
                profile_pic: ''
            })
            expect(contact).to.be.an('object')
            expect(contact).to.haveOwnProperty('_id', 1)
            expect(contact).to.haveOwnProperty('full_name', 'John Doe')
            expect(contact).to.haveOwnProperty('phone_number', '+628123839293812')
            expect(contact).to.haveOwnProperty('address', 'Jakarta')
        })
    })

    describe('Edit', function () {
        it('Should be rejected with Validation Error', function () {
            expect(contactService.edit({
                _id: 1,
                full_name: 'John Doe',
                phone_number: '08123839293812',
                address: 'Jakarta',
                profile_pic: ''
            })).to.be.rejectedWith(ValidationError)
        })

        it('Should be rejected with Not Found Error', function () {
            expect(contactService.edit({
                _id: 2,
                full_name: 'John Doe',
                phone_number: '08123839293812',
                address: 'Jakarta',
                profile_pic: ''
            })).to.be.rejectedWith(NotFoundError)
        })

        it('Should modify the existing contact', async function () {
            let contact = await contactService.edit({
                _id: 1,
                full_name: 'Nowo',
                phone_number: '+628123839293812',
                address: 'Bandung',
                profile_pic: ''
            })
            expect(contact).to.be.an('object')
            expect(contact).to.haveOwnProperty('_id', 1)
            expect(contact).to.haveOwnProperty('full_name', 'Nowo')
            expect(contact).to.haveOwnProperty('phone_number', '+628123839293812')
            expect(contact).to.haveOwnProperty('address', 'Bandung')
        })
    })

    describe('Find All', function () {
        it('Should return array of contact', function () {
            expect(contactService.findAll()).to.be.an('array')
                .and.length(1)
        })
    })

    describe('Find One', function () {
        it('Should return null', function () {
            expect(contactService.findOne(2)).to.null
        })

        it('Should return a contact', function () {
            const contact = contactService.findOne(1)
            expect(contact).to.be.an('object')
            expect(contact).to.haveOwnProperty('_id', 1)
            expect(contact).to.haveOwnProperty('full_name', 'Nowo')
            expect(contact).to.haveOwnProperty('phone_number', '+628123839293812')
            expect(contact).to.haveOwnProperty('address', 'Bandung')
        })
    })

    describe('Sort By', function () {
        it('Should sort contacts by address', async function () {
            await contactService.create({
                full_name: 'John Doe',
                phone_number: '+628123839293812',
                address: 'Jakarta',
                profile_pic: ''
            })
            expect(contactService.sortBy('address')[0]).to.haveOwnProperty('address', 'Bandung')
        })

        it('Should sort contacts by full name', function () {
            expect(contactService.sortBy('name')[0]).to.haveOwnProperty('full_name', 'John Doe')
        })

        it('Should sort contacts by default parameter', function () {
            expect(contactService.sortBy('')[0]).to.haveOwnProperty('full_name', 'Nowo')
        })
    })

    describe('Delete One', function () {
        it('Should delete one contact', async function () {
            expect(contactService.deleteOne(2)).to.be.an('boolean')
                .and.itself.deep.equal(true)
        })

        it('Should delete the last contact', function () {
            expect(contactService.deleteOne(1)).to.be.an('boolean')
                .and.itself.deep.equal(true)
        })
    })
})