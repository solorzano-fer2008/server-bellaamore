import Order from './order.model.js';
import Product from '../products/product.model.js';

export const createOrder = async (req, res) => {
    try {
        const { type, items, total, deliveryInfo, restaurantInfo } = req.body;
        
        if (!type || !items || !total || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos requeridos para crear el pedido'
            });
        }

        if (type === 'delivery' && !deliveryInfo) {
            return res.status(400).json({
                success: false,
                message: 'Información de delivery requerida para pedidos a domicilio'
            });
        }

        if (type === 'restaurant' && !restaurantInfo) {
            return res.status(400).json({
                success: false,
                message: 'Información de restaurante requerida para pedidos en restaurante'
            });
        }

        const userId = req.user?.uid || req.user?._id || null;

        const orderItems = items.map(item => ({
            product: item.productId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal
        }));

        const order = new Order({
            user: userId,
            type,
            items: orderItems,
            total,
            deliveryInfo: type === 'delivery' ? deliveryInfo : undefined,
            restaurantInfo: type === 'restaurant' ? restaurantInfo : undefined
        });

        await order.save();

        return res.status(201).json({
            success: true,
            message: 'Pedido creado exitosamente',
            order
        });

    } catch (error) {
        console.error('Error al crear pedido:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear pedido',
            error: error.message
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};

        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .populate('user', 'name surname email phone')
            .populate('items.product', 'title price image')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pedidos',
            error: error.message
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)
            .populate('user', 'name surname email phone')
            .populate('items.product', 'title price image');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error('Error al obtener pedido:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pedido',
            error: error.message
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pendiente', 'confirmado', 'en_preparacion', 'en_camino', 'entregado', 'cancelado'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Estado no válido'
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate('user', 'name surname email phone')
         .populate('items.product', 'title price image');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Estado del pedido actualizado',
            order
        });

    } catch (error) {
        console.error('Error al actualizar estado del pedido:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar estado del pedido',
            error: error.message
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user?.uid;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });
        }

        const orders = await Order.find({ user: userId })
            .populate('items.product', 'title price image')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error('Error al obtener pedidos del usuario:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pedidos del usuario',
            error: error.message
        });
    }
};
