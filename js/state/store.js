const store = {
  token: localStorage.getItem('token') || null,
  user: null,
  cart: [],
  filters: { categories: [], vegetarian: false, sorting: '', page: 1 },

  isAuth() {
    return !!this.token;
  },
  getToken() {
    return this.token;
  },

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  },

  logout() {
    this.token = null;
    this.user = null;
    this.cart = [];
    localStorage.removeItem('token');
    window.history.pushState({}, '', '/login');
    route();
  }
};