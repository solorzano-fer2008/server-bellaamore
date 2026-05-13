import { Schema, model } from "mongoose";

const reservationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email no es válido']
    },
    phone: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    time: {
        type: String,
        required: [true, 'La hora es obligatoria']
    },
    guests: {
        type: String,
        required: [true, 'El número de personas es obligatorio']
    },
    special_request: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Reservation', reservationSchema);
