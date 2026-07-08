import { useEffect, useState, useCallback } from "react";
import { getPosts } from "../services/apiService";

export const usePosts = (page = 1, limit = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    getPosts(page, limit).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, [page, limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, fetchPosts };
};
