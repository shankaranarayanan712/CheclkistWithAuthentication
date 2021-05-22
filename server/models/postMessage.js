import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    todos: [{id: Number, text: String, isComplete: Boolean}],
    creator: String,
    isCompleted: Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;