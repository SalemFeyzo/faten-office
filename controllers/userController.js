import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc Auth user & Get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('خطأ في الايميل او كلمة المرور')
  }
})

// @desc Get user Details
// @route GET /api/users/:id
// @access Private
export const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw Error('المستخدم غير موجود')
  }
})

// @desc Update user profile
// @route PUT /api/users/:id
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('المستخدم غير موجود')
  }
})

// @desc Get All Users
// @route GET /api/users
// @access Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find({}).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw Error('المستخدم غير موجود')
  }
})
