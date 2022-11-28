const ContactSchema = {
    "full_name": function (fullName: string) {
        function alphabetOnly(val: string): Boolean {
            let regex: RegExp = new RegExp(/^[a-zA-Z ]+$/)
            return (!val || !val.trim().length || regex.test(val))
        }
        return typeof fullName === "string" &&
            fullName !== undefined &&
            alphabetOnly(fullName) &&
            fullName.length > 0
    },
    "phone_number": function (phoneNumber: string) {
        function phoneNumberOnly(val: string): Boolean {
            let regex: RegExp = new RegExp(/^\+[0-9]*$/)
            return (!val || !val.trim().length || regex.test(val))
        }
        return typeof phoneNumber === "string" &&
            phoneNumber !== undefined &&
            phoneNumberOnly(phoneNumber) &&
            phoneNumber.length > 0
    },
    "address": function (address: string) {
        return typeof address === "string" &&
            address !== undefined &&
            address.length < 255 &&
            address.length > 0
    },
    "profile_pic": "string"
}

export default ContactSchema