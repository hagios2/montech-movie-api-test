import { Router } from 'express'
import { authenticate } from '../auth/userAuth.js'
import { RankController } from '../controllers/movies/RanksController.js'

const router = Router()

router.get('/ranks', authenticate, RankController.getRankController)
router.post('/ranks', authenticate, RankController.createRankController)

export default router
