import { Router } from 'express'
import { authenticate } from '../auth/userAuth.js'
import { MovieController } from '../controllers/movies/MovieController.js'

const router = Router()

router.get('/movies', authenticate, MovieController.getMoviesController)

export default router