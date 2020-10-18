const mongoose = require("mongoose");
const router = require("../routes/api/users");
const { validationResult } = require("express-validator");
const User = require("./User");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
  },
  image: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("book", BookSchema);
