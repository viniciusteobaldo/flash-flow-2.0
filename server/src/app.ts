import express from 'express'
import cors from 'cors'
import flashcardsRouter from './routes/flashcards'
import categoriesRouter from './routes/categories'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/flashcards', flashcardsRouter)
app.use('/categories', categoriesRouter)

export default app
