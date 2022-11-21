import { Router } from 'express'
import { authenticate } from '../auth/userAuth.js'
import AuthController from '../controllers/auth/AuthController.js'
import { logInValidator } from '../validators/loginValidator.js'
import { registerValidator } from '../validators/registerValidators.js'
import { ValidationChecker } from '../validators/validatorChecker.js'
const router = Router()

// user route for CRUD
router.post('/login', logInValidator, ValidationChecker, AuthController.login)
router.post('/register', registerValidator, ValidationChecker, AuthController.register)
router.post('/logout', authenticate, AuthController.logout)

export default router

