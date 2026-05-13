import Comment from "./comment.model.js";
import Post from "../posts/post.models.js";

export const createcomment = async (req, res) => {
    try {
        const  { text, post } = req.body;
        const authorId = req.uid;

        const comment = await Comment.create({
            text,
            post,
            author: authorId,
        });

        console.log(comment._id)
        // Agregar el comnetario al array de comentarios del post
        await  Post.findByIdAndUpdate(post,{
            $push: { comments: comment._id }
        });
        const populatedComment = await Comment.findById(comment._id)
            .populate('author', 'username name surname profilePicture')
            .populate('post', 'title');

            return res.status(201).json({
                message: "Comentario creado exitosamente",
                comment: populatedComment,
            });
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al crear el comentario",
            error: error.message,
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const authorId = req.uid;

        console.log("Intentando eliminar comentario:", id);
        console.log("ID del autor (token):", authorId);

        const comment = await Comment.findById(id);

        if (!comment) {
            console.log("Comentario no encontrado");
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        console.log("Autor del comentario en DB:", comment.author.toString());

        // Solo el autor del comentario puede borrarlo
        if (comment.author.toString() !== authorId) {
            console.log("Permiso denegado: el autor no coincide");
            return res.status(403).json({ message: "No tienes permiso para borrar este comentario" });
        }

        // Eliminar del array de comentarios del post
        await Post.findByIdAndUpdate(comment.post, {
            $pull: { comments: id }
        });

        await Comment.findByIdAndDelete(id);

        console.log("Comentario eliminado con éxito");
        return res.status(200).json({ message: "Comentario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        return res.status(500).json({ message: "Error al eliminar el comentario" });
    }
};