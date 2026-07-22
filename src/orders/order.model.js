import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    type: {
        type: String,
        required: true,
        enum: ['delivery', 'restaurant']
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        subtotal: {
            type: String,
            required: true
        }
    }],
    total: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'confirmado', 'en_preparacion', 'en_camino', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    deliveryInfo: {
        name: String,
        phone: String,
        address: String,
        references: String,
        paymentMethod: String,
        observations: String
    },
    restaurantInfo: {
        name: String,
        phone: String,
        reservationDate: Date,
        reservationTime: String,
        numberOfPeople: Number,
        observations: String
    }
}, {
    timestamps: true,
    versionKey: false
});

orderSchema.pre('save', function(next) {
    if (this.isNew) {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.orderNumber = `ORD-${timestamp}-${random}`;
    }
    next();
});

export default model('Order', orderSchema);
