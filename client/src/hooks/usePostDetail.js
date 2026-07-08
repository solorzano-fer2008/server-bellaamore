import { useEffect, useState } from "react";
import { getPostById } from "../services/apiService";

export const usePostDetail = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPost = () => {
    setLoading(true);
    getPostById(id)
      .then((data) => {
        if (data.error) setError(data.message);
        else setPost(data.post);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar el post");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) fetchPost();
    // eslint-disable-next-line
  }, [id]);

  return { post, loading, error, fetchPost };
};
