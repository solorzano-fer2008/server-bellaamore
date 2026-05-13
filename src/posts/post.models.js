import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Combos', 'Comparte', 'Individuales', 'Complementos', 'Postres', 'Bebidas', 'Desayunos'],
        default: 'Individuales'
    },
    image: {
        type: String,
        default: 'default-post.png'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Post', postSchema)