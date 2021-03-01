import mongoose from 'mongoose'

const interactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    input: {
      usd: {
        type: Number,
        required: true,
        default: 0,
      },
      tl: {
        type: Number,
        required: true,
        default: 0,
      },
      syr: {
        type: Number,
        required: true,
        default: 0,
      },
      euro: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    output: {
      usd: {
        type: Number,
        required: true,
        default: 0,
      },
      tl: {
        type: Number,
        required: true,
        default: 0,
      },
      syr: {
        type: Number,
        required: true,
        default: 0,
      },
      euro: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
)

const accountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    interactions: [interactionSchema],
  },
  {
    timestamps: true,
  }
)

const caseSchema = mongoose.Schema(
  {
    accounts: [accountSchema],
  },
  { timestamps: true }
)

const Case = mongoose.model('Case', caseSchema)

export default Case
