import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createCommentService, deleteCommentService } from "../../services/apiService";
import { CommentModal } from "./CommentModal";
import { usePostDetail } from "../../hooks/usePostDetail";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { LuTrash2, LuUsers } from "react-icons/lu";
import { DeleteConfirmModal } from "../ui/DeleteConfirmModal";

import { getImageUrl } from "../../utils/getImage";

export const PostDetail = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const { post, loading, error, fetchPost } = usePostDetail(id);

  // Custom Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const handleAddComment = async (content) => {
    setCommentLoading(true);
    const result = await createCommentService(id, content);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success("Comentario agregado");
      fetchPost();
      setModalOpen(false);
    }
    setCommentLoading(false);
  };

  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!commentToDelete) return;
    
    const result = await deleteCommentService(commentToDelete);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success("Comentario eliminado");
      fetchPost();
    }
  };

  if (loading) return <div className="text-center py-10">Cargando publicación...</div>;
  if (error) {
    toast.error(error);
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }
  if (!post) return <div className="text-center py-10">No se encontró la publicación.</div>;

  // Obtener lista única de quienes comentaron
  const uniqueCommenters = post.comments 
    ? [...new Set(post.comments.map(c => c.author?.name || c.author?.username || "Usuario"))]
    : [];

  return (
    <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-[2rem] shadow-2xl p-10 mt-10 border border-white/40">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-4xl font-serif font-bold text-gray-800 leading-tight">{post.title}</h2>
        <div className="flex space-x-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`w-5 h-5 ${(post.rating || 5) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-700 text-lg leading-relaxed mb-8">{post.content}</p>
      
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="text-sm text-gray-500">
            <span className="font-bold">Autor:</span> {post.author?.username || post.author?.name}
            <div className="text-[10px] text-gray-400">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
        
        {uniqueCommenters.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                <LuUsers className="text-lg" />
                <span className="font-bold uppercase tracking-wider">Han comentado:</span>
                <span className="font-medium">{uniqueCommenters.join(", ")}</span>
            </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900">Comentarios ({post.comments?.length || 0})</h3>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors shadow-sm"
        >
          Agregar comentario
        </button>
      </div>

      <div className="space-y-6">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-sm transition-all hover:bg-white/60 relative">
              
              {/* Botón Borrar (Solo si es el autor) */}
              {(comment.author?._id === currentUser.uid || comment.author === currentUser.uid || comment.author?._id === currentUser.id || comment.author === currentUser.id) && (
                <button 
                  onClick={() => handleDeleteClick(comment._id)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Borrar comentario"
                >
                  <LuTrash2 className="text-xl" />
                </button>
              )}

              <div className="text-gray-800 text-lg leading-relaxed mb-4 pr-8">{comment.text}</div>
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100/50">
                <img
                  src={comment.author?.profilepicture ? getImageUrl(comment.author.profilepicture) : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                  alt="Author"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{comment.author?.name || comment.author?.username || "Usuario"}</span>
                  <span className="text-[10px] font-medium text-gray-400 capitalize">{new Date(comment.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-10 text-center border border-dashed border-white/60">
            <p className="text-gray-500 italic">No hay comentarios aún. ¡Sé el primero en compartir tu opinión!</p>
          </div>
        )}
      </div>

      <CommentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddComment}
        loading={commentLoading}
      />

      <DeleteConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Comentario"
        message="¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer."
      />
    </div>
  );
};
