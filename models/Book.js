const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    text: {
        type: String,
        require: true
    },
    name: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        },
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('book', BookSchema);