const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now
    },
    refreshToken: [String],
},
);


userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})


module.exports = mongoose.model('User', userSchema);