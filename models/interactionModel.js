import mongoose from 'mongoose'

const ioSchema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  },
  ioType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
  },
})

const interactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    interactionType: {
      type: String, //Money transfer or anything else
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    IOs: [ioSchema],
  },
  {
    timestamps: true,
  }
)

const Interaction = mongoose.model('Interaction', interactionSchema)

export default Interaction
