import { Router, Request, Response } from 'express'
import { randomUUID } from 'crypto'
import db from '../database'
import { CATEGORIES } from '../constants/categories'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  const flashcards = db.all('SELECT * FROM flashcards ORDER BY created_at DESC')
  res.json(flashcards)
})

router.post('/', (req: Request, res: Response) => {
  const { question, answer, category } = req.body

  if (!question?.trim() || !answer?.trim() || !category?.trim()) {
    return res.status(400).json({ error: 'Question, answer and category are required' })
  }

  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: 'Invalid category',
      validCategories: CATEGORIES,
    })
  }

  const flashcard = {
    id: randomUUID(),
    question: question.trim(),
    answer: answer.trim(),
    category,
    created_at: new Date().toISOString(),
  }

  db.run(
    'INSERT INTO flashcards (id, question, answer, category, created_at) VALUES (?, ?, ?, ?, ?)',
    [flashcard.id, flashcard.question, flashcard.answer, flashcard.category, flashcard.created_at]
  )

  return res.status(201).json(flashcard)
})

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const { question, answer, category } = req.body

  const existing = db.get('SELECT * FROM flashcards WHERE id = ?', [id])

  if (!existing) {
    return res.status(404).json({ error: 'Flashcard not found' })
  }

  if (!question?.trim() || !answer?.trim() || !category?.trim()) {
    return res.status(400).json({ error: 'Question, answer and category are required' })
  }

  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: 'Invalid category',
      validCategories: CATEGORIES,
    })
  }

  db.run(
    'UPDATE flashcards SET question = ?, answer = ?, category = ? WHERE id = ?',
    [question.trim(), answer.trim(), category, id]
  )

  const updated = db.get('SELECT * FROM flashcards WHERE id = ?', [id])

  return res.json(updated)
})

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const existing = db.get('SELECT * FROM flashcards WHERE id = ?', [id])

  if (!existing) {
    return res.status(404).json({ error: 'Flashcard not found' })
  }

  db.run('DELETE FROM flashcards WHERE id = ?', [id])

  return res.status(204).send()
})

export default router
