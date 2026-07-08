'Use strict'

import mongoose from 'mongoose'

export const dbConnection = async () => {
    const uri = process.env.URI_MONGODB 
    console.log(uri)
    try {
        mongoose.connection.on('error', () => {
            console.log('MondongoDB | no se puede conectar a mongoDB')
            mongoose.disconnect()
        })

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | intentando conectar a mongoDB')
        })

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | conectando a mongoDB')
        })

        mongoose.connection.on('open', () => {
            console.log('MongoDB | conectando a la base de datos ')
        })

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconectando a mongoDB')
        })

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | desconectado de mongoDB')
        })

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        })
    } catch (error) {
        console.log(`Error al conectar la db: ${error}`)
    }
}