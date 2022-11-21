import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { User } from '../../src/models/User.js'
import { createList, addMovieToList, getLists, deleteList } from '../../src/services/Movies/MovieListService.js'
import { addMovie } from '../../src/services/Movies/MovieService.js'

const mongoServer = await MongoMemoryServer.create()

describe('Movie List Services', () => {
  let user = null
  beforeAll(async function () {
    jest.setTimeout(30000);
    await mongoose.connect(mongoServer.getUri(), { dbName: 'movies' })
    user = await User.create({
      name: 'Oteng Wilson',
      email: 'hagioswilson@gmail.com',
      password: 'password',
    })
  })

  beforeEach(async () => {
    jest.setTimeout(30000);
    const collections = mongoose.connection.collections
    for (const key in collections) {
      collections[key].deleteMany({})
    }
  })

  it('Should create a new list', async () => {
    jest.setTimeout(30000);
    const list = await createList({ name: 'My Movie', user: user._id })
    expect(list.name).toBe('My Movie')
    expect(list.user).toBe(user._id)
  })

  it('Should delete and existing list', async () => {
    const list = await createList({ name: 'Movie', user: user._id })
    const id = list._id.toHexString()
    const response = await deleteList(id)
    expect(response.deletedCount).toBe(1)
  })

  it('Should fail to delete if list not found', async () => {
    jest.setTimeout(30000);
    const list = mongoose.Types.ObjectId()
    const id = list._id.toHexString()
    try {
      await deleteList(id)
    } catch (error) {
      expect(error.message).toBe('List not found')
    }
  })

  it('Should return all lists associated to a user', async () => {
    jest.setTimeout(30000);
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
    const lists = [
      { name: 'name1', user: user._id, movies: [movie._id] },
      { name: 'name2', user: user._id, movies: [movie._id] },
      { name: 'name3', user: user._id, movies: [movie._id] },
      { name: 'name4', user: user._id, movies: [movie._id] },
      { name: 'name5', user: user._id, movies: [movie._id] },
    ]
    for (let list of lists) {
      await createList(list)
    }
    const response = await getLists(user._id)
    expect(response.length).toBe(5)
  })

  it('should add movie to a list', async () => {
    jest.setTimeout(30000);
    const list = await createList({ name: 'List1', user: user._id })
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
      listId: list._id,
    }
    const response = await addMovieToList(details)
    expect(response.movies.length).toBe(1)
    expect(response.user.toHexString()).toBe(user._id.toHexString())
    expect(response._id.toHexString()).toBe(list._id.toHexString())
  })

  afterAll(async function () {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
  })
})
