const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      default: "",
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    friendsCount: {
      type: Number,
      default: 0,
    },

    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    hasTopWeb3NFT: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
};
