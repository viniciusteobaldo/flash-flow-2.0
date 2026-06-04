import { Router, Request, Response } from 'express'
import { CATEGORIES } from '../constants/categories'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json(CATEGORIES)
})

export default router
