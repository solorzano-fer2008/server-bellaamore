import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuUtensilsCrossed, LuArrowLeft } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts, updateProduct } from '../services/apiService';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';
import { AdminControls } from '../components/ui/AdminControls';
import { toast } from 'react-hot-toast';

export const CenasPage = ({ user }) => {
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user?.role === 'ADMIN_ROLE' || user?.username === 'admin' || localStorageUser.role === 'ADMIN_ROLE' || localStorageUser.username === 'admin';
    
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedItems, setEditedItems] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [items, setItems] = useState([
        {
            _id: 'c1',
            title: "TOSTADAS CON AGUACATE Y POLLO",
            description: "Deliciosas tostadas con aguacate y pollo deshebrado",
            price: "$120.00",
            image: "cena1.jpg"
        },
        {
            _id: 'c2',
            title: "FIDEOS CON QUESO",
            description: "Deliciosos fideos con queso",
            price: "$120.00",
            image: "cena2.jpg"
        },
        {
            _id: 'c3',
            title: "PAN CON QUESO Y JAMON",
            description: "Pan con queso y jamon",
            price: "$120.00",
            image: "cena3.jpg"
        },
        {
            _id: 'c4',
            title: "TORTILLAS DE HARINA CON POLLO",
            description: "300g de jugoso corte New York a la parrilla, servido con papas al horno gratinadas y mantequilla de ajo artesanal.",
            price: "$350.00",
            image: "cena4.jpg"
        },
        {
            _id: 'c5',
            title: "TOSTADAS DE POLLO",
            description: "Deliciosas tostadas con pollo deshebrado",
            price: "$120.00",
            image: "cena5.jpg"
        },
        {
            _id: 'c6',
            title: "MIX DE VERDURAS",
            description: "Deliciosas verduras salteadas",
            price: "$120.00",
            image: "cena6.jpeg"
        },
    ]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getProducts('cenas');
            if (data && data.length > 0) {
                setItems(data);
            }
        };
        fetchItems();
    }, []);

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditedItems([...items]);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            for (const item of editedItems) {
                const result = await updateProduct(item._id, item);
                if (result.error) {
                    toast.error(`Error al actualizar ${item.title}: ${result.message}`);
                }
            }
            toast.success('Cambios guardados exitosamente');
            const data = await getProducts('cenas');
            if (data && data.length > 0) {
                setItems(data);
            }
            setIsEditing(false);
            setEditedItems([]);
        } catch (error) {
            toast.error('Error al guardar los cambios');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setEditedItems([]);
        setIsEditing(false);
    };

    const handleItemEdit = (itemId, field, value) => {
        setEditedItems(prev => 
            prev.map(item => 
                item._id === itemId ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans relative">
            {isAdmin && (
                <AdminControls
                    isEditing={isEditing}
                    onToggleEdit={handleToggleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    position="top-right"
                />
            )}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            {/* Botón Volver */}
            <Link
                to="/menu"
                className="absolute top-8 left-8 z-40 bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-3 text-white hover:border-purple-500 hover:scale-110 transition-all group flex items-center justify-center shadow-lg"
            >
                <LuArrowLeft className="text-2xl group-hover:text-purple-400 transition-colors" />
            </Link>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <div className="inline-block relative">
                        <LuUtensilsCrossed className="text-white text-5xl mx-auto mb-4" />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white">CENAS</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.length > 0 ? (
                      items.map((item) => (
                          <ProductCard 
                            key={item._id || item.id} 
                            item={isEditing ? (editedItems.find(e => e._id === item._id) || item) : item}
                            isEditing={isEditing}
                            onEdit={handleItemEdit}
                            badgeText="Recomendado" 
                            onSelect={(product) => {
                                setSelectedItem(product);
                                setIsModalOpen(true);
                            }}
                          />
                      ))
                    ) : (
                      <p className="text-gray-400 text-center col-span-full">No hay productos disponibles.</p>
                    )}
                </div>
            </div>

            <ProductDetailModal 
                item={selectedItem} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};
