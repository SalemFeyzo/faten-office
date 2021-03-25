import mongoose from 'mongoose'

const currencySchema = mongoose.Schema(
  {
    tlUsd: {
      type: Number,
      required: true,
      default: 0.0,
    },
    euroUsd: {
      type: Number,
      required: true,
      default: 0.0,
    },
    syrUsd: {
      type: Number,
      required: true,
      default: 0.0,
    },
    llUsd: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true }
)

const Currency = mongoose.model('Currency', currencySchema)

export default Currency
