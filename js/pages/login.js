function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Login</h1>
    <form id="loginForm">
      <label>Email: <input type="email" id="email" required></label>
      <label>Password: <input type="password" id="password" required></label>
      <button type="submit">Login</button>
    </form>
    <p>No account? <a href="/registration" onclick="event.preventDefault(); navigate('/registration')">Register</a></p>
  `;

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const data = await api.login({ email, password });
      store.setToken(data.token);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  });
}

function navigate(path) {
  window.history.pushState({}, '', path);
  route();
}