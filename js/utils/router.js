const routes = {
  '/': renderHome,
  '/index.html': renderHome,
  '/login': renderLogin,
  '/registration': renderRegistration,
  '/cart': renderCart,
  '/profile': renderProfile,
  '/orders': renderOrders
};

function route() {
  const path = window.location.pathname;
  const app = document.getElementById('app');

  app.innerHTML = '';

  const protectedPaths = ['/', '/index.html', '/cart', '/profile', '/orders'];

  if (!store.isAuth() && protectedPaths.includes(path)) {
    navigate('/login');
    return;
  }

  const page = routes[path];
  if (page) {
    page();
  } else {
    app.innerHTML = '<h1>404 页面不存在</h1>';
  }
}

window.navigate = function(path) {
  window.history.pushState({}, '', path);
  route();
};

window.addEventListener('popstate', route);

document.addEventListener('DOMContentLoaded', route);