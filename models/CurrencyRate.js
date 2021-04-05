import mongoose from 'mongoose'

const currencyRateSchema = mongoose.Schema(
  {
    sell: {
      type: Number,
      required: true,
    },
    buy: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const CurrencyRate = mongoose.model('CurrencyRate', currencyRateSchema)

export default CurrencyRate
