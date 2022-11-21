import axios from 'axios'
import nodeCache from 'node-cache'
import { Movie } from '../../models/Movie.js'

const cache = new nodeCache()

export const getMovies = async () => {
  const cachedMovies = cache.has('movies')
  if (cachedMovies) {
    return cache.get('movies')
  }
  let page = 1
  const results = []
  while (page <= 5) {
    const { data } = await axios.get(
      `${process.env.TMDB_API_URL}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
    )
    results.push(...data.results)
    page = page + 1
  }
  cache.set('movies', results, 100000)
  return results
}

export const addMovie = async (details) => {
  const movie = await Movie.create(details)
  return movie
}
