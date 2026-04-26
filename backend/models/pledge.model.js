const mongoose = require("mongoose");

const pledgeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pledge", pledgeSchema);