import { errorResponse, successResponse} from '../../responses/response.js'
import { MovieRank } from '../../models/MovieRank.js'
import { createMoviesRanks, getMoviesRanks } from '../../services/Movies/RankMovieService.js'

class RanksController {

  getRankController = async (req, res) => {
    try {
      const ranks = await getMoviesRanks(req.body)
      return successResponse(res, { data: ranks }, 'success')
    } catch (error) {
      return errorResponse(res, error.message)
    }
  }

  createRankController = async (req, res) => {
    try {
      const details = req.body
      await createMoviesRanks(details, req.user._id)
      const ranks = await MovieRank.find({ user: req.user._id }).populate(
        'movie'
      )
      return successResponse(res, { data: ranks }, 'success')
    } catch (error) {
      console.trace(error)
      return errorResponse(res, error.message)
    }
  }
}

const RankController = new RanksController()

export { RankController }