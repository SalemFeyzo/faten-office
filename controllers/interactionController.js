import asyncHandler from 'express-async-handler'
import Interaction from '../models/interactionModel.js'

// @desc Add Interaction
// @route POST /api/interactions
// @access Private
export const addInteraction = asyncHandler(async (req, res) => {
  // const { interactionType, description } = req.body
  const interaction = new Interaction({
    user: req.user._id,
    interactionType: 'exchange',
    description: 'تصريف',
  })
  const createdInteraction = await interaction.save()
  res.status(201).json(createdInteraction)
})

// @desc Update interaction
// @route PUT /api/interactions/:id
// @access Private
export const updateInteraction = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id)
  const { interactionType, description } = req.body
  if (interaction) {
    interaction.interactionType = interactionType || interaction.interactionType
    interaction.description = description || interaction.description

    const updatedInteraction = await interaction.save()
    res.json({
      _id: updatedInteraction._id,
      interactionType: updatedInteraction.interactionType,
      description: updatedInteraction.description,
      user: updatedInteraction.user,
      IOs: updatedInteraction.IOs,
    })
  } else {
    res.status(404)
    throw new Error('الحركة غير موجودة')
  }
})
// @desc Get interaction Details
// @route GET /api/interactions/:id
// @access Private
export const getInteractiondetails = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id)
  if (interaction) {
    res.json(interaction)
  } else {
    res.status(404)
    throw Error('الحركة غير موجودة')
  }
})

// @desc Delete interaction
// @route DELETE /api/interactions/:id
// @access Private
export const deleteInteraction = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id)
  if (interaction) {
    await interaction.delete()
    res.json({ message: 'تم مسح الحركة' })
  } else {
    res.status(404)
    throw Error('الحركة غير موجودة')
  }
})

// @desc Get All Interactions
// @route GET /api/interactions
// @access Private
export const getAllInteractions = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({})
    .sort({ createdAt: 'desc' })
    .populate('user', 'name')
    .populate({
      path: 'IOs',
      populate: { path: 'account' },
    })
  if (interactions) {
    res.json(interactions)
  } else {
    res.status(404)
    throw Error('لا يوجد حركات حاليا')
  }
})

// @desc Add IO
// @route POST /api/interactions/:id/io
// @access Private
export const addIO = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id)

  if (interaction) {
    interaction.IOs.push(req.body)
    await interaction.save()
    res.json(interaction)
  } else {
    res.status(404)
    throw Error('الحركة غير موجودة')
  }
})

// @desc Get  Interactions By Account
// @route GET /api/interactions/account/:id
// @access Puplic
export const getInteractionsByAccount = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({ 'IOs.account': req.params.id })
    .sort({ createdAt: 'desc' })
    .populate('user', 'name')
    .populate({
      path: 'IOs',
      populate: { path: 'account' },
    })

  if (interactions) {
    res.json(interactions)
  } else {
    res.status(404)
    throw Error('لا يوجد حركات حاليا')
  }
})

// @desc Get  Interactions By User
// @route GET /api/interactions/user/:id
// @access Private
export const getInteractionsByUser = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({ user: req.params.id })
    .sort({ createdAt: 'desc' })
    .populate('user', 'name')
    .populate({
      path: 'IOs',
      populate: { path: 'account' },
    })

  if (interactions) {
    res.json(interactions)
  } else {
    res.status(404)
    throw Error('لا يوجد حركات حاليا')
  }
})

// @desc Get  Interactions By Type
// @route GET /api/interactions/type/:type
// @access Private
export const getInteractionsByType = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({
    interactionType: req.params.type,
  })
    .sort({ createdAt: 'desc' })
    .populate('user', 'name')
    .populate({
      path: 'IOs',
      populate: { path: 'account' },
    })

  if (interactions) {
    res.json(interactions)
  } else {
    res.status(404)
    throw Error('لا يوجد حركات حاليا')
  }
})

// @desc Get  Interactions By Date
// @route GET /api/interactions/date/:startDate/:endDate
// @access Private
export const getInteractionsByDate = asyncHandler(async (req, res) => {
  const startDate = req.params.startDate
  const endDate = req.params.endDate
  const interactions = await Interaction.find({
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  })
    .populate('user', 'name')
    .populate({
      path: 'IOs',
      populate: { path: 'account' },
    })

  if (interactions) {
    res.json(interactions)
  } else {
    res.status(404)
    throw Error('لا يوجد حركات حاليا')
  }
})

////
const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}
// @desc Get  IOs By Account culc totals/ single account
// @route GET /api/interactions/account/:id/io
// @access Puplic
export const getIOsByAccount = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({ 'IOs.account': req.params.id })
    .select('IOs')
    .sort({ createdAt: 'desc' })

  if (interactions) {
    const ios = interactions.map((interaction) => interaction.IOs)
    const maregedIos = [].concat.apply([], ios)
    const accountIos = maregedIos.filter((io) => io.account == req.params.id)

    /// IPUTS
    const inputs = accountIos.filter((io) => io.ioType === 'input')

    const inputsUsd = inputs.filter((input) => input.currency === 'USD')
    const usdTotalInputs = addDecimal(
      inputsUsd.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsTl = inputs.filter((input) => input.currency === 'TL')
    const tlTotalInputs = addDecimal(
      inputsTl.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsSyr = inputs.filter((input) => input.currency === 'SYR')
    const syrTotalInputs = addDecimal(
      inputsSyr.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsLl = inputs.filter((input) => input.currency === 'LL')
    const llTotalInputs = addDecimal(
      inputsLl.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsEuro = inputs.filter((input) => input.currency === 'EURO')
    const euroTotalInputs = addDecimal(
      inputsEuro.reduce((acc, item) => acc + item.amount, 0)
    )

    /// OUTPUTS
    const outputs = accountIos.filter((io) => io.ioType === 'output')

    const outputsUsd = outputs.filter((input) => input.currency === 'USD')
    const usdTotalOutputs = addDecimal(
      outputsUsd.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsTl = outputs.filter((input) => input.currency === 'TL')
    const tlTotalOutputs = addDecimal(
      outputsTl.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsSyr = outputs.filter((input) => input.currency === 'SYR')
    const syrTotalOutputs = addDecimal(
      outputsSyr.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsLl = outputs.filter((input) => input.currency === 'LL')
    const llTotalOutputs = addDecimal(
      outputsLl.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsEuro = outputs.filter((input) => input.currency === 'EURO')
    const euroTotalOutputs = addDecimal(
      outputsEuro.reduce((acc, item) => acc + item.amount, 0)
    )

    /// TOTAL
    const usdTotal = addDecimal(usdTotalInputs - usdTotalOutputs)
    const tlTotal = addDecimal(tlTotalInputs - tlTotalOutputs)
    const euroTotal = addDecimal(euroTotalInputs - euroTotalOutputs)
    const syrTotal = addDecimal(syrTotalInputs - syrTotalOutputs)
    const llTotal = addDecimal(llTotalInputs - llTotalOutputs)

    res.json({
      usdTotalInputs,
      tlTotalInputs,
      euroTotalInputs,
      syrTotalInputs,
      llTotalInputs,
      usdTotalOutputs,
      tlTotalOutputs,
      euroTotalOutputs,
      syrTotalOutputs,
      llTotalOutputs,
      usdTotal,
      tlTotal,
      euroTotal,
      syrTotal,
      llTotal,
    })
  } else {
    res.status(404)
    throw Error('غير موجود')
  }
})

// @desc Get  all accounts total
// @route GET /api/interactions/accounts/total
// @access Private

export const getAllAccountsTotal = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({})
    .select('IOs')
    .populate({
      path: 'IOs',
      populate: { path: 'account' },
    })
  if (interactions) {
    const ios = interactions.map((interaction) => interaction.IOs)
    const maregedIos = [].concat.apply([], ios)
    /// get all accounts ios except the primary one
    const allIOs = maregedIos.filter((io) => io.account.isPrimary === false)
    /// IPUTS
    const inputs = allIOs.filter((io) => io.ioType === 'input')

    const inputsUsd = inputs.filter((input) => input.currency === 'USD')
    const usdTotalInputs = addDecimal(
      inputsUsd.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsTl = inputs.filter((input) => input.currency === 'TL')
    const tlTotalInputs = addDecimal(
      inputsTl.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsSyr = inputs.filter((input) => input.currency === 'SYR')
    const syrTotalInputs = addDecimal(
      inputsSyr.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsLl = inputs.filter((input) => input.currency === 'LL')
    const llTotalInputs = addDecimal(
      inputsLl.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsEuro = inputs.filter((input) => input.currency === 'EURO')
    const euroTotalInputs = addDecimal(
      inputsEuro.reduce((acc, item) => acc + item.amount, 0)
    )

    /// OUTPUTS
    const outputs = allIOs.filter((io) => io.ioType === 'output')

    const outputsUsd = outputs.filter((input) => input.currency === 'USD')
    const usdTotalOutputs = addDecimal(
      outputsUsd.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsTl = outputs.filter((input) => input.currency === 'TL')
    const tlTotalOutputs = addDecimal(
      outputsTl.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsSyr = outputs.filter((input) => input.currency === 'SYR')
    const syrTotalOutputs = addDecimal(
      outputsSyr.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsLl = outputs.filter((input) => input.currency === 'LL')
    const llTotalOutputs = addDecimal(
      outputsLl.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsEuro = outputs.filter((input) => input.currency === 'EURO')
    const euroTotalOutputs = addDecimal(
      outputsEuro.reduce((acc, item) => acc + item.amount, 0)
    )

    /// TOTAL
    const usdTotal = addDecimal(usdTotalInputs - usdTotalOutputs)
    const tlTotal = addDecimal(tlTotalInputs - tlTotalOutputs)
    const euroTotal = addDecimal(euroTotalInputs - euroTotalOutputs)
    const syrTotal = addDecimal(syrTotalInputs - syrTotalOutputs)
    const llTotal = addDecimal(llTotalInputs - llTotalOutputs)

    res.json({
      usdTotalInputs,
      tlTotalInputs,
      euroTotalInputs,
      syrTotalInputs,
      llTotalInputs,
      usdTotalOutputs,
      tlTotalOutputs,
      euroTotalOutputs,
      syrTotalOutputs,
      llTotalOutputs,
      usdTotal,
      tlTotal,
      euroTotal,
      syrTotal,
      llTotal,
    })
  } else {
    res.status(404)
    throw Error('not found')
  }
})

// @desc Get  Primary total
// @route GET /api/interactions/primary/total
// @access Private
export const getPrimaryAccountTotal = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({})
    .select('IOs')
    .populate({
      path: 'IOs',
      populate: { path: 'account' },
    })
  if (interactions) {
    const ios = interactions.map((interaction) => interaction.IOs)
    const maregedIos = [].concat.apply([], ios)
    /// get primary account
    const PrimaryIOs = maregedIos.filter((io) => io.account.isPrimary === true)
    /// IPUTS
    const inputs = PrimaryIOs.filter((io) => io.ioType === 'input')
    const inputsUsd = inputs.filter((input) => input.currency === 'USD')
    const usdTotalInputs = addDecimal(
      inputsUsd.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsTl = inputs.filter((input) => input.currency === 'TL')
    const tlTotalInputs = addDecimal(
      inputsTl.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsSyr = inputs.filter((input) => input.currency === 'SYR')
    const syrTotalInputs = addDecimal(
      inputsSyr.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsLl = inputs.filter((input) => input.currency === 'LL')
    const llTotalInputs = addDecimal(
      inputsLl.reduce((acc, item) => acc + item.amount, 0)
    )

    const inputsEuro = inputs.filter((input) => input.currency === 'EURO')
    const euroTotalInputs = addDecimal(
      inputsEuro.reduce((acc, item) => acc + item.amount, 0)
    )

    /// OUTPUTS
    const outputs = PrimaryIOs.filter((io) => io.ioType === 'output')

    const outputsUsd = outputs.filter((input) => input.currency === 'USD')
    const usdTotalOutputs = addDecimal(
      outputsUsd.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsTl = outputs.filter((input) => input.currency === 'TL')
    const tlTotalOutputs = addDecimal(
      outputsTl.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsSyr = outputs.filter((input) => input.currency === 'SYR')
    const syrTotalOutputs = addDecimal(
      outputsSyr.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsLl = outputs.filter((input) => input.currency === 'LL')
    const llTotalOutputs = addDecimal(
      outputsLl.reduce((acc, item) => acc + item.amount, 0)
    )

    const outputsEuro = outputs.filter((input) => input.currency === 'EURO')
    const euroTotalOutputs = addDecimal(
      outputsEuro.reduce((acc, item) => acc + item.amount, 0)
    )

    /// TOTAL
    const usdTotal = addDecimal(usdTotalInputs - usdTotalOutputs)
    const tlTotal = addDecimal(tlTotalInputs - tlTotalOutputs)
    const euroTotal = addDecimal(euroTotalInputs - euroTotalOutputs)
    const syrTotal = addDecimal(syrTotalInputs - syrTotalOutputs)
    const llTotal = addDecimal(llTotalInputs - llTotalOutputs)

    res.json({
      usdTotalInputs,
      tlTotalInputs,
      euroTotalInputs,
      syrTotalInputs,
      llTotalInputs,
      usdTotalOutputs,
      tlTotalOutputs,
      euroTotalOutputs,
      syrTotalOutputs,
      llTotalOutputs,
      usdTotal,
      tlTotal,
      euroTotal,
      syrTotal,
      llTotal,
    })
  } else {
    res.status(404)
    throw Error('not found')
  }
})
