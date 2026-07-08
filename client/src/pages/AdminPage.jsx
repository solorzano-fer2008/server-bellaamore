import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuPlus, LuTrash2, LuSave, LuX, LuPencil, LuPackage, LuShoppingBag } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts, createProduct, updateProduct, deleteProduct, getOrders, updateOrderStatus } from '../services/apiService';

export const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('todas');
    const [selectedStatus, setSelectedStatus] = useState('todas');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        category: 'bebidas'
    });

    const categories = ['todas', 'bebidas', 'brunch', 'cenas', 'desayunos', 'individuales', 'postres', 'promociones'];
    const orderStatuses = ['todas', 'pendiente', 'confirmado', 'en_preparacion', 'en_camino', 'entregado', 'cancelado'];

    useEffect(() => {
        loadProducts();
    }, [selectedCategory]);

    useEffect(() => {
        loadOrders();
    }, [selectedStatus]);

    const loadProducts = async () => {
        const category = selectedCategory === 'todas' ? '' : selectedCategory;
        const data = await getProducts(category);
        setProducts(data);
    };

    const loadOrders = async () => {
        const status = selectedStatus === 'todas' ? '' : selectedStatus;
        const data = await getOrders(status);
        setOrders(data);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        const result = await updateOrderStatus(orderId, newStatus);
        if (!result.error) {
            loadOrders();
        } else {
            alert(result.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                title: product.title,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category
            });
        } else {
            setEditingProduct(null);
            setFormData({
                title: '',
                description: '',
                price: '',
                image: '',
                category: selectedCategory === 'todas' ? 'bebidas' : selectedCategory
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
            title: '',
            description: '',
            price: '',
            image: '',
            category: 'bebidas'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const result = editingProduct 
            ? await updateProduct(editingProduct._id || editingProduct.id, formData)
            : await createProduct(formData);

        if (!result.error) {
            handleCloseModal();
            loadProducts();
        } else {
            alert(result.message);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            const result = await deleteProduct(productId);
            if (!result.error) {
                loadProducts();
            } else {
                alert(result.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans relative">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            <Link
                to="/menu"
                className="absolute top-8 left-8 z-40 bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-3 text-white hover:border-purple-500 hover:scale-110 transition-all group flex items-center justify-center shadow-lg"
            >
                <LuArrowLeft className="text-2xl group-hover:text-purple-400 transition-colors" />
            </Link>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Panel de Administración</h1>
                    <p className="text-gray-400">Gestiona productos y pedidos</p>
                </div>

                {/* Tabs */}
                <div className="mb-8 flex gap-4">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                            activeTab === 'products'
                                ? 'bg-purple-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                    >
                        <LuPackage />
                        Productos
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                            activeTab === 'orders'
                                ? 'bg-purple-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                    >
                        <LuShoppingBag />
                        Pedidos
                    </button>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <>
                        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full font-semibold transition-all ${
                                            selectedCategory === cat
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                        }`}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => handleOpenModal()}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-semibold transition-all"
                            >
                                <LuPlus />
                                Agregar Producto
                            </button>
                        </div>

                <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-4 text-gray-400 font-semibold">Imagen</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Título</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Categoría</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Precio</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id || product.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4">
                                        <img 
                                            src={product.image} 
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="p-4 font-semibold">{product.title}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold text-green-400">{product.price}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="p-2 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/50 transition-all"
                                            >
                                                <LuPencil />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id || product.id)}
                                                className="p-2 bg-red-600/30 text-red-300 rounded-lg hover:bg-red-600/50 transition-all"
                                            >
                                                <LuTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <div className="text-center p-8 text-gray-400">
                            No hay productos en esta categoría
                        </div>
                    )}
                </div>
                    </>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <>
                        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                                {orderStatuses.map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`px-4 py-2 rounded-full font-semibold transition-all ${
                                            selectedStatus === status
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                        }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left p-4 text-gray-400 font-semibold">Pedido #</th>
                                        <th className="text-left p-4 text-gray-400 font-semibold">Cliente</th>
                                        <th className="text-left p-4 text-gray-400 font-semibold">Tipo</th>
                                        <th className="text-left p-4 text-gray-400 font-semibold">Total</th>
                                        <th className="text-left p-4 text-gray-400 font-semibold">Estado</th>
                                        <th className="text-left p-4 text-gray-400 font-semibold">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="p-4 font-semibold text-purple-400">{order.orderNumber}</td>
                                            <td className="p-4">
                                                {order.type === 'delivery' 
                                                    ? order.deliveryInfo?.name 
                                                    : order.restaurantInfo?.name}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                    order.type === 'delivery' 
                                                        ? 'bg-blue-600/30 text-blue-300' 
                                                        : 'bg-green-600/30 text-green-300'
                                                }`}>
                                                    {order.type === 'delivery' ? 'Delivery' : 'Restaurante'}
                                                </span>
                                            </td>
                                            <td className="p-4 font-semibold text-green-400">{order.total}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                    order.status === 'pendiente' ? 'bg-yellow-600/30 text-yellow-300' :
                                                    order.status === 'confirmado' ? 'bg-blue-600/30 text-blue-300' :
                                                    order.status === 'en_preparacion' ? 'bg-orange-600/30 text-orange-300' :
                                                    order.status === 'en_camino' ? 'bg-purple-600/30 text-purple-300' :
                                                    order.status === 'entregado' ? 'bg-green-600/30 text-green-300' :
                                                    'bg-red-600/30 text-red-300'
                                                }`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className="bg-white/10 border border-white/20 rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
                                                >
                                                    <option value="pendiente">Pendiente</option>
                                                    <option value="confirmado">Confirmado</option>
                                                    <option value="en_preparacion">En preparación</option>
                                                    <option value="en_camino">En camino</option>
                                                    <option value="entregado">Entregado</option>
                                                    <option value="cancelado">Cancelado</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && (
                                <div className="text-center p-8 text-gray-400">
                                    No hay pedidos con este estado
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">
                                {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-white/10 rounded-full transition-all"
                            >
                                <LuX />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Título</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Descripción</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Precio</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Imagen (nombre del archivo)</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Categoría</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                >
                                    {categories.filter(c => c !== 'todas').map(cat => (
                                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-lg font-semibold transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    <LuSave />
                                    {editingProduct ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
