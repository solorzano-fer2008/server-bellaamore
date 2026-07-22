import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuCroissant, LuArrowLeft } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts, updateProduct } from '../services/apiService';
import { getImageUrl } from '../utils/getImage';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';
import { AdminControls } from '../components/ui/AdminControls';
import { toast } from 'react-hot-toast';

export const PostresPage = ({ user }) => {
  const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role === 'ADMIN_ROLE' || user?.username === 'admin' || localStorageUser.role === 'ADMIN_ROLE' || localStorageUser.username === 'admin';
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [items, setItems] = useState([
    {
      _id: 'p1',
      title: "TARTALETA DE FRUTOS",
      description: "Delicada base de pasta sablée rellena de suave crema pastelera artesanal y coronada con una selección de frutos rojos frescos.",
      price: "$85.00",
      image: "postre1.png"
    },
    {
      _id: 'p2',
      title: "BROWNIE CON HELADO",
      description: "Intenso brownie de chocolate belga, servido tibio para un corazón fundente, acompañado de una generosa bola de helado de vainilla bourbon.",
      price: "$95.00",
      image: "postre2.png"
    },
    {
      _id: 'p3',
      title: "PIE DE LIMON",
      description: "Delicioso pie de limon, con ralladura de naranja",
      price: "$85.00",
      image: "postre4.png"
    },
    {
      _id: 'p4',
      title: "PIE DE FRUTOS ROJOS",
      description: "Delicioso pastel de frutos rojos, con merengue y frutos rojos frescos.",
      price: "$95.00",
      image: "postre7.png"
    },
    {
      _id: 'p5',
      title: "TARTALETA DE FRUTOS",
      description: "Delicada base de pasta sablée rellena de suave crema pastelera artesanal y coronada con una selección de frutos rojos frescos.",
      price: "$85.00",
      image: "postre1.png"
    },
    {
      _id: 'p6',
      title: "FLAN TRADICIONAL",
      description: "Delicioso flan casero con salsa de caramelo",
      price: "$95.00",
      image: "postre5.png"
    },
    {
      _id: 'p7',
      title: "TIRAMISU",
      description: "Delicioso tiramisu casero con salsa de caramelo",
      price: "$95.00",
      image: "postre8.png"
    },
  ]);
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getProducts('postres');
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
      const data = await getProducts('postres');
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
      {/* Fondo */}
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
        {/* Título */}
        <div className="text-center mb-12">
          <LuCroissant className="text-white text-5xl mx-auto mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            POSTRES
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item) => (
            <ProductCard 
              key={item._id || item.id} 
              item={isEditing ? (editedItems.find(e => e._id === item._id) || item) : item}
              isEditing={isEditing}
              onEdit={handleItemEdit}
              badgeText="Dulzura Gourmet" 
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
