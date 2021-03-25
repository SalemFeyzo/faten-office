import mongoose from 'mongoose'

const capitalSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true }
)

const Capital = mongoose.model('Capital', capitalSchema)

export default Capital
