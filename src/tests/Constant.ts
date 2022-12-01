import UserInterface from "../interfaces/UserInterface.js";
import ContactInterface from "../interfaces/ContactInterface.js";

export const user: UserInterface = {
    email: 'user@example.com',
    password: 'password'
}

export const admin: UserInterface = {
    email: 'johndoe@example.com',
    password: 'okemantap'
}

export const contact1: ContactInterface = {
    full_name: 'John Doe',
    phone_number: '+628123839293812',
    address: 'Jakarta',
    profile_pic: ''
}