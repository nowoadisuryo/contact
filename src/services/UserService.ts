import UserInterface from "../interfaces/UserInterface.js"
import generateAccessToken from "../utilities/GenerateAccessToken.js"
import PasswordHasher from "../utilities/PasswordHasher.js"

export default class UserService {
    private passwordHasher: PasswordHasher

    constructor() {
        this.passwordHasher = new PasswordHasher()
    }

    async create(user: UserInterface) {
        user.password = await this.passwordHasher.hash(user.password!)
        // TODO: Save user to database
        return generateAccessToken(user)
    }

    async findByEmail(email: string) {
        // TODO: Search user by email
        email = 'johndoe@example.com'
        return {
            email: email,
            password: '$2b$10$b.KoxA8j.Hchrb3.mzcMeexNaPjNVev1d7Fpf9pZfN.Mpg2jbxfl.'
        }
    }

    async signIn(email: string, password: string) {
        let user = await this.findByEmail(email)
        if (!user) throw new Error("Email, username or password is wrong. Please try again.")
        if (await this.passwordHasher.check(password, user.password) === true) return generateAccessToken(user)
        else throw new Error("Email, username or password is wrong. Please try again.")
    }
}