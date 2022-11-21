import app from './app.js'
import dotenv from 'dotenv'
dotenv.config({path: './.env'})

const PORT = process.env.PORT || 8081

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`)
})
