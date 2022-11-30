import { expect } from "chai"
import generateAccessToken from "../../utilities/GenerateAccessToken.js"

describe('Generate Access Token', function () {
    it('Should throw an Error when there is no user', function () {
        expect(function () { generateAccessToken(<any>null) }).to.throw(Error, 'Invalid user')
    })
})