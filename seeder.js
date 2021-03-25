import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import accounts from './data/accounts.js'
import currencies from './data/currencies.js'
import capital from './data/capital.js'
import User from './models/userModel.js'
import Interaction from './models/interactionModel.js'
import Account from './models/accountModel.js'
import Currency from './models/currencyModel.js'
import Capital from './models/capitalModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Account.deleteMany()
    await Interaction.deleteMany()
    await Currency.deleteMany()
    await Capital.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleAccounts = accounts.map((account) => {
      return { ...account, user: adminUser }
    })

    await Account.insertMany(sampleAccounts)
    await Currency.insertMany(currencies)
    await Capital.insertMany(capital)
    console.log('Data imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Account.deleteMany()
    await User.deleteMany()
    await Interaction.deleteMany()
    await Currency.deleteMany()
    await Capital.deleteMany()
    console.log('Data destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
