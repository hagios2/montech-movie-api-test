import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { addMovie } from '../../src/services/Movies/MovieService.js'
import { User } from '../../src/models/User.js'

jest.useFakerTimers()
const mongoServer = await MongoMemoryServer.create()

jest.setTimeout(30000);
describe('Movies Services', () => {
  let user = null
  beforeAll(async function () {
    await mongoose.connect(mongoServer.getUri(), { dbName: 'movies' })
    user = await User.create({
      name: 'Oteng Wilson',
      email: 'hagioswilson@gmail.com',
      password: 'password',
    })
  })

  it('Should add a movie', async () => {
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
    expect(movie.original_title).toBe(details.original_title)
    expect(movie.overview).toBe(details.overview)
    expect(movie.original_language).toBe(details.original_language)
  })

  afterAll(async function () {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
  })
})
