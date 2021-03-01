import express from 'express'
import {
  authUser,
  getUserDetails,
  updateUser,
} from '../controllers/userController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
router.route('/:id').get(protect, getUserDetails).put(protect, updateUser)

export default router
