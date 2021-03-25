import express from 'express'
import { getCapital, updateCapital } from '../controllers/capitalController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getCapital)
router.put('/:id', protect, updateCapital)

export default router
