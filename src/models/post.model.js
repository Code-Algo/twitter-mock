const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        postId:{
            type: String,
            required: true,
        },
        post:{
            type: Text,
            required: true,
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('post', postSchema)