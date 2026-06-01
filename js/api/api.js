const API_BASE = 'https://food-delivery.int.kreosoft.space/api';

async function request(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (store.token) {
    headers['Authorization'] = `Bearer ${store.token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

const api = {
  login: (data) => request('/account/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => request('/account/register', { method: 'POST', body: JSON.stringify(data) }),

  getUserInfo: () => request('/account/profile'),
  getProfile: () => request('/account/profile'),
  updateProfile: (data) => request('/account/profile', { method: 'PUT', body: JSON.stringify(data) }),

  getDishes: (params) => {
    const query = new URLSearchParams(params).toString();
    return request(`/dishes?${query}`);
  },
  getDishDetail: (id) => request(`/dishes/${id}`),
  rateDish: (id, rating) => request(`/dishes/${id}/rate`, { method: 'POST', body: JSON.stringify({ rating }) }),

  getCart: () => request('/cart'),
  addToCart: (dishId, amount = 1) => request('/cart/dish', { 
    method: 'POST', 
    body: JSON.stringify({ dishId, amount }) 
  }),
  removeFromCart: (dishId) => request(`/cart/dish/${dishId}`, { method: 'DELETE' }),

  getOrders: () => request('/order'),
  createOrder: (data) => request('/order', { method: 'POST', body: JSON.stringify(data) }),
  confirmOrder: (id) => request(`/order/${id}/status`, { method: 'POST' })
};

window.api = api;