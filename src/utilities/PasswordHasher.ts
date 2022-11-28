import bcrypt from "bcrypt"

export default class PasswordHasher {
    private rounds: number

    constructor() {
        this.rounds = 10
    }

    async hash(password: string) {
        return await bcrypt.hash(password, this.rounds)
    }

    async check(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }
}