import asyncHandler from 'express-async-handler'
import Case from '../models/caseModel.js'

// @desc Get All Accounts
// @route GET /api/case
// @access Private
export const getAllAccounts = asyncHandler(async (req, res) => {
  const cases = await Case.find({})
  if (cases) {
    res.json(cases[0].accounts)
  } else {
    res.status(404)
    throw Error('not found')
  }
})
