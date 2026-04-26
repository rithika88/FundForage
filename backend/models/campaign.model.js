const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [20, 'Description must be at least 20 characters'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    goalAmount: {
      type: Number,
      required: [true, 'Goal amount is required'],
      min: [1, 'Goal amount must be at least 1'],
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: 'Deadline must be a future date',
      },
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: ["Technology", "Environment", "Health", "Arts", "Community", "Education"],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Campaign must have an owner'],
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    backersCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }

);

// Virtual: percentage funded
campaignSchema.virtual('fundingPercentage').get(function () {
  if (this.goalAmount === 0) return 0;
  return Math.min(((this.raisedAmount / this.goalAmount) * 100).toFixed(2), 100);
});

// Virtual: days remaining
campaignSchema.virtual('daysRemaining').get(function () {
  const now = new Date();
  const diff = this.deadline - now;
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
});

// Index for common queries
campaignSchema.index({ owner: 1 });
campaignSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Campaign', campaignSchema);
