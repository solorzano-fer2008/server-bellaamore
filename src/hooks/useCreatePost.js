import { useState } from "react";
import { createPostService } from "../services/apiService";

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const createPost = async (postData) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    const result = await createPostService(postData);
    if (result.error) {
      setError(result.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
    return result;
  };

  return { createPost, loading, error, success };
};
