import { use, expect } from "chai"
import Sinon from "sinon"
import UserService from "../../services/UserService.js"
import chaiAsPromised from "chai-as-promised"

use(chaiAsPromised)

describe('User Service', function () {
    let userService = <any>new UserService()

    describe('Create', function () {
        it('Should save a new user and return an access token', async function () {
            let user = {
                email: 'johndoe@test.com',
                password: '123456'
            }
            let create = await userService.create(user)
            expect(create).to.be.a('string')
        })
    })

    describe('Find', function () {
        it('Should find a user by email', async function () {
            let email = 'johndoe@example.com'
            let findByEmail = await userService.findByEmail(email)
            expect(findByEmail).to.be.an('object')
            expect(findByEmail).to.deep.eq({
                email: email,
                password: '$2b$10$b.KoxA8j.Hchrb3.mzcMeexNaPjNVev1d7Fpf9pZfN.Mpg2jbxfl.'
            })
        })
    })

    describe('Authentication', function () {
        it('Should not sign in the user', async function () {
            Sinon.stub(userService, 'findByEmail').returns({
                email: 'johndoe@example.com',
                password: '$2b$10$b.KoxA8j.Hchrb3.mzcMeexNaPjNVev1d7Fpf9pZfN.Mpg2jbxfl.'
            })

            expect(userService.signIn('johndoe@example.com', 'passwordsalah'))
                .to.be.rejectedWith("Email or password is wrong. Please try again.")
        })

        it('Should sign in the user', async function () {
            Sinon.stub(userService, 'findByEmail').returns({
                email: 'johndoe@example.com',
                password: '$2b$10$b.KoxA8j.Hchrb3.mzcMeexNaPjNVev1d7Fpf9pZfN.Mpg2jbxfl.'
            })

            expect(await userService.signIn('johndoe@example.com', 'okemantap'))
                .to.be.a('string')
        })

        it('Should be rejected when cannot find a user', function () {
            Sinon.stub(userService, 'findByEmail').returns(null)

            expect(userService.signIn('johndoe@example.com', 'passwordsalah'))
                .to.be.rejectedWith("Email or password is wrong. Please try again.")
        })
    })
})