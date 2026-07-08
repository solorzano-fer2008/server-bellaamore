import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "./PostCard";
import { usePosts } from "../../hooks/usePosts";
import { deletePostService } from "../../services/apiService";
import { toast } from "react-hot-toast";
import backgroundImage from '../../assets/img/restaurantefondo3.png';
import { DeleteConfirmModal } from "../ui/DeleteConfirmModal";

export const PostList = () => {
  const [page, setPage] = useState(1);
  const limit = 8;
  const { posts, loading, fetchPosts } = usePosts(page, limit);
  const navigate = useNavigate();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;

    const result = await deletePostService(postToDelete);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success("Publicación eliminada");
      fetchPosts(); // Recargar lista
    }
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {loading ? (
        <div className="text-center py-10">
          <div className="bg-white/90 p-6 rounded-lg shadow-lg">
            <p className="text-xl font-semibold text-gray-800">Cargando publicaciones...</p>
          </div>
        </div>
      ) : !posts.length ? (
        <div className="text-center py-10 w-full flex justify-center">
          <div className="backdrop-blur-sm p-20 rounded-lg shadow-lg max-w-4xl w-full mx-4">
            <p className="text-3xl font-bold text-white">No hay publicaciones disponibles.</p>
            <p className="mt-4 text-xl text-white">Sé el primero en compartir algo interesante.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-6 justify-center">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                title={post.title}
                content={post.content?.slice(0, 120) + (post.content?.length > 120 ? "..." : "")}
                rating={post.rating}
                author={post.author}
                onReadMore={() => navigate(`/posts/${post._id}`)}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          <DeleteConfirmModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Eliminar Publicación"
            message="¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer."
          />

          <div className="flex gap-4 mt-8 bg-white/80 p-4 rounded-lg backdrop-blur-sm">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-blue-900 font-semibold self-center">Página {page}</span>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};
