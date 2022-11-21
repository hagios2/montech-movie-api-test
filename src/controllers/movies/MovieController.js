import {
  errorResponse,
  successResponse,
} from '../../responses/response.js'
import { getMovies } from '../../services/Movies/MovieService.js'

class MoviesController {

  getMoviesController = async (req, res) => {
    try {
      const movies = await getMovies()
      return successResponse(res, { data: movies }, 'success')
    } catch (error) {
      return errorResponse(res, error.message)
    }
  }
}

const MovieController = new MoviesController()

export { MovieController }