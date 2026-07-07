'Use strict'

import mongoose from 'mongoose'

export const dbConnection = async () => {
    const uri = process.env.URI_MONGODB
    console.log('URI_MONGODB:', uri ? 'CONFIGURADA' : 'NO CONFIGURADA')
    try {
        mongoose.connection.on('error', (error) => {
            console.error('MongoDB | Error de conexión:', error.message)
            mongoose.disconnect()
        })

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Intentando conectar a MongoDB...')
        })

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Conectado exitosamente')
        })

        mongoose.connection.on('open', () => {
            console.log('MongoDB | Conexión a la base de datos establecida')
        })

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | Reconectado a MongoDB')
        })

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | Desconectado de MongoDB')
        })

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        })
    } catch (error) {
        console.error('Error al conectar la base de datos:', error.message)
        console.error('Stack trace:', error.stack)
        throw error
    }
}