import { errorResponse, successResponse} from '../../responses/response.js'
import { 
  createList,
  addMovieToList, 
  getLists, 
  deleteList
} from '../../services/Movies/MovieListService.js'

class ListController {

  createListController = async (req, res) => {
    try {
        const details = req.body
        details.user = req.user._id
        const token = await createList(details)
        return successResponse(res, { data: token }, '')
    } catch (error) {
        return errorResponse(res, error.message)
    }
  }
      
  addMovieToListController = async (req, res) => {
    try {
      const details = req.body
      details.listId = req.params.id
      details.user = req.user._id
      await addMovieToList(req.body)
      return successResponse(res, {}, 'movie added to list')
    } catch (error) {
      return errorResponse(res, error.message)
    }
  }
      
  getListController = async (req, res) => {
      try {
        const lists = await getLists(req.user._id)
        return successResponse(res, { data: lists }, 'success')
      } catch (error) {
        return errorResponse(res, error.message)
      }
  }

  deleteListController = async (req, res) => {
    try {
      await deleteList(req.params.id)
      return successResponse(res, {}, 'success')
    } catch (error) {
      return errorResponse(res, error.message)
    }
  }
}

const MovieListController = new ListController()

export { MovieListController }

