import ContactInterface from '../interfaces/ContactInterface.js'
import validate from '../utilities/InputValidation.js'
import ContactSchema from '../schemas/ContactSchema.js'
import ValidationError from '../errors/ValidationError.js'
import NotFoundError from '../errors/NotFoundError.js'

class ContactService {
    private contacts: ContactInterface[] = []

    private addId(id: number = 0) {
        if (!id) return 1
        else return id + 1
    }

    async create(contact: ContactInterface) {
        let _contact = <any>contact
        const validation = await validate(_contact, ContactSchema)
        for (let i = 0; i < validation.length; i++) {
            if (validation[i].success === false) {
                return Promise.reject(new ValidationError())
            }
        }
        contact._id = this.addId(this.contacts.length)
        this.contacts.push(contact)
        return contact
    }

    async edit(contact: ContactInterface) {
        let _contact = <any>contact
        const validation = await validate(_contact, ContactSchema)
        for (let i = 0; i < validation.length; i++) {
            if (validation[i].success === false) {
                return Promise.reject(new ValidationError())
            }
        }
        let newData = {}
        this.contacts = this.contacts.map(function (currentValue, index, arr) {
            if (currentValue._id == contact._id) {
                if (contact.profile_pic === undefined || contact.profile_pic === null || contact.profile_pic === "") contact.profile_pic = currentValue.profile_pic
                newData = contact
                return contact
            }
            else return currentValue
        })

        if (Object.keys(newData).length !== 0) return newData
        else return Promise.reject(new NotFoundError())
    }

    findAll() {
        return this.contacts.length > 0 ? this.contacts.filter(function (currentValue) { return currentValue }) : []
    }

    findOne(id: number) {
        let contact = this.contacts.filter(function (el: any) {
            return el._id == id
        })
        if (contact.length === 0) return null
        else return contact[0]
    }

    deleteOne(id: number) {
        let deleted = false
        this.contacts = this.contacts.map(function (currentValue, index, arr) {
            if (currentValue._id == id) {
                if (index == 0) {
                    arr.splice(index, index + 1)
                }
                else {
                    arr.splice(index, index)
                }
                deleted = true
            }
            return arr[index]
        })
        return deleted
    }

    sortBy(field: String) {
        function compare(a: ContactInterface, b: ContactInterface) {
            if (field == 'address') {
                if (a.address < b.address) return -1
                if (a.address > b.address) return 1
                else return 0
            }
            else if (field == 'name') {
                if (a.full_name < b.full_name) return -1
                if (a.full_name > b.full_name) return 1
                else return 0
            }
            else {
                if (a._id! < b._id!) return -1
                if (a._id! > b._id!) return 1
                else return 0
            }
        }
        return this.contacts.sort(compare).filter(function (currentValue) { return currentValue })
    }
}

export default ContactService