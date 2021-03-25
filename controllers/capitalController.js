import asyncHandler from 'express-async-handler'
import Capital from '../models/capitalModel.js'

// @desc get capital
// @route GET /api/capital
// @access Private
export const getCapital = asyncHandler(async (req, res) => {
  const capital = await Capital.find({})
  if (capital) {
    res.json(capital)
  } else {
    res.status(404)
    throw Error('not found')
  }
})

// @desc update Capital
// @route PUT /api/capital/:id
// @access Private
export const updateCapital = asyncHandler(async (req, res) => {
  const capital = await Capital.findById(req.params.id)
  if (capital) {
    capital.amount = req.body.amount || capital.amount

    const updatedCapital = await capital.save()
    res.json(updatedCapital)
  } else {
    res.status(404)
    throw Error('not found')
  }
})
