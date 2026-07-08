import React from "react";
import { FaStar } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";

export const PostCard = ({ id, title, content, rating, author, onReadMore, onDelete }) => {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthor = (author?._id === currentUser.uid || author === currentUser.uid || author?._id === currentUser.id || author === currentUser.id);

  return (
    <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col justify-between border border-white/40 transition-all hover:scale-[1.03] hover:shadow-2xl relative group">
      
      {isAuthor && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 z-20 bg-white/50 rounded-full"
          title="Borrar publicación"
        >
          <LuTrash2 className="text-lg" />
        </button>
      )}

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`w-4 h-4 ${(rating || 5) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-1 rounded-full">
            Gourmet
          </span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3 leading-tight">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {content}
        </p>
      </div>

      <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-xs">
            {author?.name?.[0] || author?.username?.[0] || "U"}
          </div>
          <p className="text-xs font-medium text-gray-500">
            {author?.name || author?.username || "Usuario"}
          </p>
        </div>

        <button
          onClick={onReadMore}
          className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-all shadow-md shadow-rose-200 text-xs font-bold uppercase tracking-widest active:scale-95"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};
