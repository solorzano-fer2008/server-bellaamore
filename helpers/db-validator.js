import User from '../src/users/user.model.js';
import Post from '../src/posts/post.models.js';
import Comment from '../src/comments/comment.model.js';

// Verifica si el email ya existe
export const emailExists = async (email = '') => {
  const existe = await User.findOne({ email });
  if (existe) {
    throw new Error('El email ya está registrado');
  }
};

// Verifica si el nombre de usuario ya existe
export const usernameExists = async (username = '') => {
  const existe = await User.findOne({ username });
  if (existe) {
    throw new Error('El nombre de usuario ya está registrado');
  }
};

// Verifica si el post existe por ID
export const existePost = async (id = '') => {
  const existe = await Post.findById(id);
  if (!existe) {
    throw new Error('No existe un post con el id proporcionado');
  }
};

// Verifica si el usuario es dueño del post
export const isPostOwner = async (id = '', userId = '') => {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error('No existe un post con el id proporcionado');
  }
  if (post.user.toString() !== userId) {
    throw new Error('No tienes permisos para modificar este post');
  }
};

// Verifica si el comentario existe por ID
export const existeComment = async (id = '') => {
  const existe = await Comment.findById(id);
  if (!existe) {
    throw new Error('No existe un comentario con el id proporcionado');
  }
};

// Verifica si el usuario es dueño del comentario
export const isCommentOwner = async (id = '', userId = '') => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error('No existe un comentario con el id proporcionado');
  }
  if (comment.user.toString() !== userId) {
    throw new Error('No tienes permisos para modificar este comentario');
  }
};
