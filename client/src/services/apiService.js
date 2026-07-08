import axios from 'axios';

const apiClient = axios.create({
  baseURL: `https://server-bellaamore.vercel.app/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token JWT a las requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth services
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (e) {
    console.error("Error en loginUser:", e);
    return {
      error: true,
      message: e.response?.data?.message || e.response?.data?.errors?.[0]?.msg || (e.code === 'ERR_NETWORK' ? 'El servidor no está disponible. ¿Servidor apagado?' : e.message) || 'Error al iniciar sesión',
    };
  }
};

export const registerUser = async (userData) => {
  try {
    console.log('Enviando petición a:', apiClient.defaults.baseURL + '/auth/register');
    console.log('Datos:', userData);
    
    const response = await apiClient.post('/auth/register', userData);
    console.log('Respuesta:', response.data);
    return response.data;
  } catch (e) {
    console.error("Error en registerUser:", e);
    console.error("Error response:", e.response);
    const errorMsg = e.response?.data?.errors?.[0]?.msg || e.response?.data?.message || (e.code === 'ERR_NETWORK' ? 'El servidor no está disponible. ¿Servidor apagado?' : e.message) || 'Error al registrar usuario';
    return {
      error: true,
      message: errorMsg,
    };
  }
};

export const updateUserService = async (userData) => {
  try {
    const formData = new FormData();

    Object.keys(userData).forEach(key => {
      if (key === 'profilePicture' && userData[key]) {
        formData.append('profilePicture', userData[key]);
      } else if (userData[key] !== undefined && userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    });

    const response = await apiClient.put('/auth/updateProfile', formData);
    return response.data;
  } catch (e) {
    const errorMsg = e.response?.data?.errors?.[0]?.msg || e.response?.data?.message || 'Error al actualizar perfil';
    return {
      error: true,
      message: errorMsg,
    };
  }
};

export const getPosts = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/posts?page=${page}&limit=${limit}`);
    return response.data.posts || [];
  } catch (error) {
    const message = error.response?.data?.message || 'Error al obtener publicaciones';
    return {
      error: true,
      message,
      posts: [],
    };
  }
};

export const createCommentService = async (postId, content) => {
  try {
    console.log(postId, content)
    const response = await apiClient.post(`/comments`, { text: content, post: postId });
    console.log(response.data)
    return response.data;

  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error al agregar comentario",
    };
  }
};

export const deleteCommentService = async (commentId) => {
  try {
    const response = await apiClient.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error al eliminar comentario",
    };
  }
};

export const getPostById = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error al obtener publicación",
    };
  }
};

export const createPostService = async (postData) => {
  try {
    const response = await apiClient.post("/posts", postData);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error al crear publicación",
    };
  }
};

export const deletePostService = async (postId) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error al eliminar publicación",
    };
  }
};

export const getProducts = async (category) => {
  try {
    const url = category ? `/products?category=${category}` : `/products`;
    const response = await apiClient.get(url);
    if (response.data.success) {
      console.log('Productos obtenidos de la API:', response.data.products);
      return response.data.products;
    }
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      error: true,
      message: error.response?.data?.message || 'Error al crear producto',
    };
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiClient.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      error: true,
      message: error.response?.data?.message || 'Error al actualizar producto',
    };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      error: true,
      message: error.response?.data?.message || 'Error al eliminar producto',
    };
  }
};

// Order services
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      error: true,
      message: error.response?.data?.message || 'Error al crear pedido',
    };
  }
};

export const getOrders = async (status) => {
  try {
    const url = status ? `/orders?status=${status}` : `/orders`;
    const response = await apiClient.get(url);
    if (response.data.success) {
      return response.data.orders;
    }
    return [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await apiClient.get(`/orders/${orderId}`);
    if (response.data.success) {
      return response.data.order;
    }
    return null;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await apiClient.put(`/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      error: true,
      message: error.response?.data?.message || 'Error al actualizar estado del pedido',
    };
  }
};

export const getUserOrders = async () => {
  try {
    const response = await apiClient.get('/orders/my-orders');
    if (response.data.success) {
      return response.data.orders;
    }
    return [];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
};