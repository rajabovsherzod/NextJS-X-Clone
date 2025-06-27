import { prisma } from "../../lib/prisma.js"
import { Prisma } from "@prisma/client"
import ApiError from "../../utils/api.error.js"

interface IRegisterStepOneData {
    fullName: string,
    email: string,
    dobYear: number,
    dobMonth: number,
    dobDay: number
}

interface IRegisterStepTwoData {
    email: string,
    verificationCode: string
}

class AuthService {
    public async registerStepOne(data: IRegisterStepOneData) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email}
        })
        if(existingUser){
            throw new ApiError(400, "User already exists")
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const codeExpiryTime = new Date(Date.now() + 10 * 60 * 1000)

        const dateOfBirth = new Date(data.dobYear, data.dobMonth - 1, data.dobDay)

        const newUser = await prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                dob: dateOfBirth,
                verificationCode,
                codeExpiryTime
            }
        })

        console.log(`--- SIMULATING SENDING EMAIL ---`);
        console.log(`To: ${data.email}`);
        console.log(`Verification Code: ${verificationCode}`);
        console.log(`------------------------------`);

        return {
            message: "Verification code has been sent to your email.",
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
            }
        }
    }

    public async registerStepTwo(data: IRegisterStepTwoData) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            }
        })
        if(!user || user.verificationCode !== data.verificationCode){
            throw new ApiError(400, "Invalid verification code")
        }
        if(user.codeExpiryTime && user.codeExpiryTime < new Date()){
            throw new ApiError(400, "Verification code has expired")
        }
        
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                emailVerified: true,
                verificationCode: null,
                codeExpiryTime: null
            }
        })

        return {
            message: "Email verified successfully. You can now set your password.",
        }
    }
}

export default AuthService