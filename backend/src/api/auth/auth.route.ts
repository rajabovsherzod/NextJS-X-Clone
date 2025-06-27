import { Router } from "express"
import AuthController from "./auth.controller.js"
import AuthService from "./auth.service.js"
import { validate } from "../../middlewares/validate.middleware.js"
import { registerStepOneSchema, verifyEmailSchema } from "./auth.validation.js"

const router = Router()

const authController = new AuthController(new AuthService())

router.post('/register', validate(registerStepOneSchema), authController.registerStepOne)
router.post('/verify-email', validate(verifyEmailSchema), authController.registerStepTwo)
router.post('/set-password', validate(setPasswordSchema), authController.registerStepThree)

export default router