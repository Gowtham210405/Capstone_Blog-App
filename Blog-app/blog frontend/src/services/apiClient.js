import axios from "axios";

// API URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://capstone-blog-app.onrender.com";

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // VERY IMPORTANT for cookies
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - Please login again");
    }
    return Promise.reject(error);
  }
);

// ================= COMMON API =================
export const commonAPI = {
  login: (credentials) =>
    apiClient.post("/common-api/login", credentials),

  logout: () =>
    apiClient.get("/common-api/logout"),

  checkAuth: () =>
    apiClient.get("/common-api/check-auth"),
};

// ================= USER API =================
export const userAPI = {
  register: (userData) =>
    apiClient.post("/user-api/users", userData),

  getAllArticles: () =>
    apiClient.get("/user-api/articles"),

  getArticleById: (id) =>
    apiClient.get(`/user-api/article/${id}`),

  postComment: (articleId, commentObj) =>
    apiClient.post(`/user-api/comment/${articleId}`, commentObj),
};

// ================= AUTHOR API =================
export const authorAPI = {
  register: (userData) =>
    apiClient.post("/author-api/users", userData),

  createArticle: (articleData) =>
    apiClient.post("/author-api/article", articleData),

  getAuthorArticles: (authorId) =>
    apiClient.get(`/author-api/articles/${authorId}`),

  getArticleById: (id) =>
    apiClient.get(`/author-api/article/${id}`),

  updateArticle: (id, articleData) =>
    apiClient.put(`/author-api/article/${id}`, articleData),

  deleteArticle: (id) =>
    apiClient.delete(`/author-api/article/${id}`),

  restoreArticle: (id) =>
    apiClient.put(`/author-api/article/${id}/restore`),
};

export default apiClient;