import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuUtensilsCrossed, LuArrowLeft } from 'react-icons/lu';
import { MdBreakfastDining } from 'react-icons/md';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts, updateProduct } from '../services/apiService';
import { getImageUrl } from '../utils/getImage';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';
import { AdminControls } from '../components/ui/AdminControls';
import { toast } from 'react-hot-toast';

export const DesayunosPage = ({ user }) => {
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user?.role === 'ADMIN_ROLE' || user?.username === 'admin' || localStorageUser.role === 'ADMIN_ROLE' || localStorageUser.username === 'admin';
    
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedItems, setEditedItems] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [items, setItems] = useState([
        {
            _id: 'd1',
            title: "DESAYUNO CLÁSICO",
            description: "El despertar perfecto: huevos al gusto, frijoles refritos, plátanos dulces, queso fresco y pan artesanal. Incluye café de olla.",
            price: "$130.00",
            image: "desayuno1.png"
        },
        {
            _id: 'd2',
            title: "WAFFLES CON FRUTA",
            description: "Waffles dorados y esponjosos servidos con una selección de frutas frescas de temporada, miel de maple y un toque de azúcar glass.",
            price: "$120.00",
            image: "waffles.png"
        },
        {
            _id: 'd3',
            title: "TOSTADAS CON MERMELADA",
            description: "Tostadas con mermelada y requesón",
            price: "$120.00",
            image: "desayuno17.png"
        },
        {
            _id: 'd4',
            title: "PAN CON JAMON",
            description: "Pan con jamon y queso manchego",
            price: "$65.00",
            image: "desayuno18.png"
        },
        {
            _id: 'd5',
            title: "SANDWITCH DE ATÚN",
            description: "Delicioso sandwich de atún con verduras frescas y aderezo especial.",
            price: "$85.00",
            image: "desayuno20.png"
        },
        {
            _id: 'd6',
            title: "AVENA NUTRITIVA",
            description: "Avena preparada con leche, fruta fresca, semillas y miel.",
            price: "$120.00",
            image: "desayuno21.png"
        }
    ]);
    useEffect(() => {
        const fetchItems = async () => {
            const data = await getProducts('desayunos');
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
            const data = await getProducts('desayunos');
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
                        <MdBreakfastDining className="text-white text-5xl mx-auto mb-4" />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white">DESAYUNOS</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.map((item) => (
                        <ProductCard 
                            key={item._id || item.id} 
                            item={isEditing ? (editedItems.find(e => e._id === item._id) || item) : item}
                            isEditing={isEditing}
                            onEdit={handleItemEdit}
                            badgeText="Favorito del Chef" 
                            onSelect={(product) => {
                                setSelectedItem(product);
                                setIsModalOpen(true);
                            }}
                        />
                    ))}
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
