import bcrypt from "bcrypt";

let saltRound = 10;

export const createHashPassword = async (password)=>{
    try {
        return bcrypt.hashSync(password,saltRound)
    } catch (error) {
        throw new Error("Error while hashing the password`")
    }
}

export const compareHashPassword = async (password,hashedPassword)=>{
    try {
        return bcrypt.compareSync(password,hashedPassword)
    } catch (error) {
        throw new Error("Error while comparing the password`")
    }
}