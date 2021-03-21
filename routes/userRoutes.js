import express from 'express'
import {
  authUser,
  getAllUsers,
  getUserDetails,
  updateUser,
} from '../controllers/userController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getAllUsers)
router.post('/login', authUser)
router.route('/:id').get(protect, getUserDetails).put(protect, updateUser)

export default router
