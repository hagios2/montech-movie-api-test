import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({path: './.env'})

const { connect } = mongoose

class MongDBConnection {
  constructor(MONGO_URI) {
    this.MONGO_URI = MONGO_URI
  }
  connection() {
    connect(
      this.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) console.log(err.message)
        console.log('database connection established')
      }
    )
  }
}

const MONGO_URI = process.env.MONGODB_URI

export const mongdbConnection = new MongDBConnection(MONGO_URI)
