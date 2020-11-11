export const idMatch = '[A-Za-z0-9]{2,}'
export const idFormMatch = `(${idMatch}|creation)/:modification(modification)?`
export const uuidMatch = '[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}'
export const uuidFormMatch = `(${uuidMatch}|creation)/:modification(modification)?`
