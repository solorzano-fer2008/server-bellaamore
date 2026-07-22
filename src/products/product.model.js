import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    price: {
        type: String,
        required: [true, 'El precio es obligatorio'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'La imagen es obligatoria']
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['combos', 'individuales', 'bebidas', 'desayunos', 'postres', 'promociones', 'brunch', 'almuerzos', 'cenas']
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);
