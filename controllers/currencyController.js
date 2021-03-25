import asyncHandler from 'express-async-handler'
import Currency from '../models/currencyModel.js'

// @desc get Currencies
// @route GET /api/currencies
// @access Private
export const getCurrencies = asyncHandler(async (req, res) => {
  const currencies = await Currency.find({})

  if (currencies) {
    res.json(currencies)
  } else {
    res.status(404)
    throw Error('not found')
  }
})

// @desc update Currencies
// @route PUT /api/currencies/:id
// @access Private
export const updateCurrencies = asyncHandler(async (req, res) => {
  const currency = await Currency.findById(req.params.id)
  if (currency) {
    currency.tlUsd = req.body.tlUsd || currency.tlUsd
    currency.euroUsd = req.body.euroUsd || currency.euroUsd
    currency.syrUsd = req.body.syrUsd || currency.syrUsd
    currency.llUsd = req.body.llUsd || currency.llUsd

    const updatedCurrency = await currency.save()
    res.json(updatedCurrency)
  } else {
    res.status(404)
    throw Error('not found')
  }
})
