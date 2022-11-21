import { MovieRank } from '../../models/MovieRank.js'

export const createMoviesRanks = async (movieRanksDetails, user) => {
  const data = []
  for (let rank of movieRanksDetails.data) {
    rank.user = user
    data.push(rank)
  }
  await MovieRank.deleteMany({ user })
  const ranks = await MovieRank.insertMany(data)
  return ranks
}

export const getMoviesRanks = async (user) => {
  const ranks = await MovieRank.find(user)
    .populate('movie')
    .sort({ rank: 1, _id: 1 })
  return ranks
}