import { Request, Response, NextFunction } from "express"
import AuthService from "./auth.service.js"
import ApiResponse from "../../utils/api.response.js"

class AuthController {
    constructor(private readonly authService: AuthService){
        this.authService = authService
    }

    public registerStepOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fullName, email, dobYear, dobMonth, dobDay} = req.body
            const user = await this.authService.registerStepOne({ fullName, email, dobYear, dobMonth, dobDay })
            res.status(201).json(new ApiResponse(user))
        } catch (error) {
            next(error)
        }
    }

    public registerStepTwo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, verificationCode } = req.body
            const user = await this.authService.registerStepTwo({ email, verificationCode })
            res.status(201).json(new ApiResponse(user))
        } catch (error) {
            next(error)
        }
    }
}

export default AuthController