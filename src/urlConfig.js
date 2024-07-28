const BASE_URL = import.meta.env.VITE_BASE_URL;

const urlConfig = {
  LOGIN_URL: `${BASE_URL}/api/auth/login`,
  SIGNUP_URL: `${BASE_URL}/api/auth/signup`,
  LOGOUT_URL: `${BASE_URL}/api/auth/logout`,
  GET_PRODUCTS_URL: `${BASE_URL}/api/products`,
  GET_CATEGORIES: `${BASE_URL}/api/products/categories`,
  GET_IMAGE_URL: `${BASE_URL}`,
  REVIEW_URL: `${BASE_URL}/api/reviews`
};

export default urlConfig;
