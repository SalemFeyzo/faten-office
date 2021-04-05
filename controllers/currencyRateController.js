import asyncHandler from 'express-async-handler'
import CurrencyRate from '../models/CurrencyRate.js'

// @desc get currency rates
// @route GET /api/currencyrate
// @access Public
export const getCurrencyRate = asyncHandler(async (req, res) => {
  try {
    const currencyRates = await CurrencyRate.find().sort({ createdAt: 'desc' })
    res.json(currencyRates)
  } catch (error) {
    res.status(401)
    throw new Error(error)
  }
})

// @desc Add currency rates
// @route POST /api/currencyrate
// @access Private
export const addCurrencyRate = asyncHandler(async (req, res) => {
  const { sell, buy } = req.body
  try {
    const newCurrencyRate = new CurrencyRate({
      sell,
      buy,
    })
    const createdCurrencyRate = newCurrencyRate.save()
    res.status(201).json(createdCurrencyRate)
  } catch (error) {
    res.status(401)
    throw new Error(error)
  }
})

// @desc Delete Currency rate
// @route DELETE /api/currencyrate/:id
// @access Private
export const deleteCurrencyRate = asyncHandler(async (req, res) => {
  try {
    const currencyRate = await CurrencyRate.findById(req.params.id)
    if (currencyRate) {
      await currencyRate.delete()
      res.json({ message: 'deleted' })
    } else {
      res.status(404)
      throw Error('الحركة غير موجودة')
    }
  } catch (error) {
    res.status(401)
    throw new Error(error)
  }
})
