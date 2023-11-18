import express, { json } from 'express'
import cors from 'cors'
import { conection } from './db/conection.js'
import { usersRouter } from './routes/users.js'
import { publicationRouter } from './routes/publications.js'
import { followsRouter } from './routes/follows.js'

conection()

const app = express()

app.use(cors())
app.use(json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', usersRouter)
app.use('/api', publicationRouter)
app.use('/api', followsRouter)

const PORT = 1234

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`)
})
