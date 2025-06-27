import { Request, Response } from "express"
import UserService from "./user.service.js"

class UserController {
    constructor(private readonly userService: UserService) {
        this.userService = userService
    }
}

export default UserController