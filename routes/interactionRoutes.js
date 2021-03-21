import express from 'express'
import {
  getAllInteractions,
  addInteraction,
  addIO,
  getInteractiondetails,
  updateInteraction,
  deleteInteraction,
  getInteractionsByAccount,
  getInteractionsByUser,
  getInteractionsByType,
  getInteractionsByDate,
  getIOsByAccount,
  getAllAccountsTotal,
  getPrimaryAccountTotal,
} from '../controllers/interactionController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/account/:id').get(getInteractionsByAccount)
router.route('/account/:id/io').get(getIOsByAccount) // accounts single total
router.route('/accounts/total').get(getAllAccountsTotal) // all accounts total
router.route('/primary/total').get(getPrimaryAccountTotal) // primary account total
router.route('/user/:id').get(getInteractionsByUser)
router.route('/type/:type').get(getInteractionsByType)
router.route('/date/:startDate/:endDate').get(getInteractionsByDate)
router.route('/').get(protect, getAllInteractions).post(protect, addInteraction)
router
  .route('/:id')
  .get(protect, getInteractiondetails)
  .put(protect, updateInteraction)
  .delete(protect, deleteInteraction)
router.route('/:id/io').post(protect, addIO)

export default router
