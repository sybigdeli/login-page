export function validateIranianPhoneNumber(phone: string): boolean {
    const regex = /^(?:(?:09[1-9]\d{8})|(?:\+989[1-9]\d{8})|(?:00989[1-9]\d{8}))$/
    return regex.test(phone)
}