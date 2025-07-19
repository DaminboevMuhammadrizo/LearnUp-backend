import { compare } from 'bcrypt'

export const compirePassword = (password: string, hash: string) => {
    return compare(password, hash)
}