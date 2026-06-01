function navigate(path) {
  window.history.pushState({}, '', path);
  route();
}

function validateRegistration(data) {
  const errors = [];

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.push('Please enter a valid email');
  }

  if (!data.password || data.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (data.phone && data.phone.trim() !== '') {
    const phone = data.phone.replace(/\D/g, '');
    if (phone.length < 10) {
      errors.push('Please enter a valid phone number');
    }
  }

  return errors;
}

function renderRegistration() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Register</h1>
    <form id="regForm" style="display: flex; flex-direction: column; gap: 15px; max-width: 400px; margin: 20px 0;">
      <label>
        Full Name:
        <input type="text" id="fullName" required style="padding: 8px; width: 100%;">
      </label>
      <label>
        Email:
        <input type="email" id="email" required style="padding: 8px; width: 100%;">
      </label>
      <label>
        Password:
        <input type="password" id="password" required style="padding: 8px; width: 100%;" placeholder="At least 8 characters">
      </label>
      <label>
        Phone (optional):
        <input type="tel" id="phone" style="padding: 8px; width: 100%;" placeholder="e.g. +7XXXXXXXXXX">
      </label>
      <button type="submit" style="padding: 10px; background: #ff6b00; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Register
      </button>
    </form>
    <p>Already have an account? <a href="/login" onclick="event.preventDefault(); navigate('/login')">Login</a></p>
    <div id="errorMsg" style="color: red; margin-top: 10px;"></div>
  `;

  document.getElementById('regForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorDiv = document.getElementById('errorMsg');
    errorDiv.textContent = '';

    const data = {
      fullName: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value,
      phone: document.getElementById('phone').value.trim() || null
    };

    const validationErrors = validateRegistration(data);
    if (validationErrors.length > 0) {
      errorDiv.textContent = 'Error: ' + validationErrors.join('; ');
      return;
    }

    try {
      await api.register(data);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      let errorMsg = 'Registration failed';
      if (err.message.includes('400')) {
        errorMsg += ': Invalid data format';
      } else if (err.message.includes('409')) {
        errorMsg += ': Email already exists';
      } else {
        errorMsg += ': ' + err.message;
      }
      errorDiv.textContent = errorMsg;
    }
  });
}