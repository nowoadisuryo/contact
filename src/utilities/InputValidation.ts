export default function validate(source: any, schema: any) {
    let result: any = {}
    let error: any = []
    Object.keys(schema).forEach(function (key) {
        let val = source[key]
        let type = schema[key]
        if (type === "string") {
            if (typeof val === "string") {
                result[key] = val
            } else {
                error.push({ success: false, message: 'Bad Request' })
            }
        }
        else if (typeof type === "function") {
            if (type(val)) {
                result[key] = val
            } else {
                error.push({ success: false, message: 'Bad Request' })
            }
        }
    })
    return error || { sucess: true, result: result }
}