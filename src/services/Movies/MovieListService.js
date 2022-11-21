import { List } from '../../models/MovieList.js'
import { addMovie } from './MovieService.js'

export const addMovieToList = async (details) => {
  const { listId, ...rest } = details
  const list = await List.findById(listId)
  if (!list) {
    throw new Error('List not found, Please create a list')
  }
  const movie = await addMovie(rest)
  list.movies.push(movie._id)
  await list.save()
  return list.populate('movies')
}

export const createList = async (details) => {
  const { name, user } = details
  let list = await List.findOne({ name, user })
  if (!list) {
    list = await List.create(details)
    return list
  }
  throw new Error('List with name already exist')
}


export const getLists = async (user) => {
    const list = await List.find({ user })
      .populate('movies')
      .populate('user', 'email firstName')
    if (Array.isArray(list) && list.length) {
      return list
    }
    throw new Error('No list found')
  }


export const deleteList = async (id) => {
  const list = await List.findById(id)
  if (!list) {
    throw new Error('List not found')
  }
  return await List.deleteOne({ _id: id })
}
