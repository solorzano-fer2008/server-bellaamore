import { useEffect, useState } from "react";
import { getPosts } from "../services/apiService";

export const usePosts = (page = 1, limit = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPosts(page, limit).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, [page, limit]);

  return { posts, loading };
};
