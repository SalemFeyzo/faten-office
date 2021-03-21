import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
import interactionRoutes from './routes/interactionRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('API is running....')
// })

app.use('/api/users', userRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/interactions', interactionRoutes)

// make upload folder acceble in the browser, make it static
// const __dirname = path.resolve() //so we can us es module
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      .yellow.bold
  )
)
