import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import {
  getCurrencyRate,
  addCurrencyRate,
  deleteCurrencyRate,
} from '../controllers/currencyRateController.js'

const router = express.Router()

router.route('/').get(getCurrencyRate)
router.route('/').post(protect, addCurrencyRate)
router.route('/:id').delete(protect, deleteCurrencyRate)

export default router
