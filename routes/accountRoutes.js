import express from 'express'
import {
  addAccount,
  getAccountDetails,
  getAllAccounts,
} from '../controllers/accountController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()
router.route('/:id').get(getAccountDetails)
router.route('/').get(protect, getAllAccounts).post(protect, addAccount)

export default router
