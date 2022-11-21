import { Router } from 'express'
import { authenticate } from '../auth/userAuth.js'
import { MovieListController } from '../controllers/movies/ListController.js'

const router = Router()

router.post('/list', authenticate, MovieListController.createListController)
router.get('/list', authenticate, MovieListController.getListController)
router.put('/list/:id', authenticate, MovieListController.addMovieToListController)
router.delete('/list/:id', authenticate, MovieListController.deleteListController)

export default router
