import express from 'express'
import { getAllAccounts } from '../controllers/caseController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getAllAccounts)

export default router
