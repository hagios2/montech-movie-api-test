import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { logInUser } from '../../src/services/Auth/AuthService.js'
import { registerUser } from '../../src/services/Auth/RegisterUserService.js'

const mongoServer = await MongoMemoryServer.create()
jest.setTimeout(30000);
describe('User Services', () => {
  beforeAll(async function () {
    await mongoose.connect(mongoServer.getUri(), { dbName: 'movies' })
  })

  beforeEach(async () => {
      const collections = mongoose.connection.collections
    
      for (const key in collections) {
        collections[key].deleteMany({})
      }
  })

  it('Should register user', async () => {
    const userDetails = {
      name: 'Oteng Wilson',
      email: 'hagioswilson@gmail.com',
      password: '12345678',
    }
    const user = await registerUser(userDetails)
    expect(user.user).toBeDefined()
    expect(user.user.email).toBe('hagioswilson@gmail.com')
  })

  it('Should login with valid user credentials', async () => {
    const userDetails = {
      email: 'hagioswilson11@gmail.com',
      password: '123456789',
      name: 'Oteng Wilson',
    }
    await registerUser(userDetails)
    const response = await logInUser({
      email: userDetails.email,
      password: '123456789',
    })
    expect(response.token).toBeDefined()
    expect(response.user).toBeDefined()
  })

  afterAll(async function () {
    await mongoose.disconnect()
  })
})
