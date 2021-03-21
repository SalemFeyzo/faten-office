import asyncHandler from 'express-async-handler'
import Account from '../models/accountModel.js'

// @desc Get All Accounts
// @route GET /api/case/accounts
// @access Private
export const getAllAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({}).sort({ createdAt: 'desc' })
  res.json(accounts)
})

// @desc Get Account Deatails
// @route GET /api/case/accounts
// @access Public
export const getAccountDetails = asyncHandler(async (req, res) => {
  const account = await Account.findById({ _id: req.params.id })
  res.json(account)
})

// @desc Add Account
// @route POST /api/accounts
// @access Private

export const addAccount = asyncHandler(async (req, res) => {
  const { name } = req.body
  const account = new Account({
    user: req.user._id,
    name,
  })
  const createdAccount = await account.save()
  res.status(201).json(createdAccount)
})
