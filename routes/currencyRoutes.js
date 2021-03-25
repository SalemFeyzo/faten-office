import express from 'express'
import {
  getCurrencies,
  updateCurrencies,
} from '../controllers/currencyController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getCurrencies)
router.put('/:id', protect, updateCurrencies)

export default router
