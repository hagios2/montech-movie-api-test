import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { User } from '../../src/models/User.js'
import { getMoviesRanks, createMoviesRanks } from '../../src/services/Movies/RankMovieService.js'
import { addMovie } from '../../src/services/Movies/MovieService.js'

const mongoServer = await MongoMemoryServer.create()

jest.setTimeout(30000);
describe('MovieRank Services', () => {
  let user = null
  beforeAll(async function () {
    await mongoose.connect(mongoServer.getUri(), { dbName: 'movies' })
    user = await User.create({
      name: 'Oteng Wilson',
      email: 'hagioswilson@gmail.com',
      password: 'password',
    })
  })

  it('Should create a movie rank', async () => {
    const details = {
      adult: false,
      backdrop_path: '/m7ldf8UdWSDztU8STGp8artmGoa.jpg',
      genre_ids: [18, 28, 12],
      id: 978436,
      original_language: 'tr',
      original_title: 'Adanis: Kutsal Kavga',
      overview: '',
      popularity: 1166.223,
      poster_path: '/1G5mt3uGUW5OWUcxcBUtHm5Zdd9.jpg',
      release_date: '2022-03-11',
      title: 'Adanis: Kutsal Kavga',
      video: false,
      vote_average: 6,
      vote_count: 8,
      user: user._id,
    }
    const movie = await addMovie(details)
    const rankDetails = {
      data: [
        { rank: 1, movie: movie._id },
        { rank: 2, movie: movie._id },
      ],
    }
    const rank = await createMoviesRanks(rankDetails, user._id)
    expect(rank.length).toBe(2)
  })

  it('Should get all ranked movies', async () => {
    const ranks = await getMoviesRanks(user._id)
    expect(ranks.length).toBe(2)
  })

  afterAll(async function () {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
  })
})
