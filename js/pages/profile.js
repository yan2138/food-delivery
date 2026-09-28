function renderProfile() {
  console.log("Profile and Orders pages loaded at 9/28"); 
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>👤 Profile</h1>
    <div id="userInfo">Loading...</div>
    <p><a href="/orders" onclick="event.preventDefault(); navigate('/orders')">My Orders</a></p>
    <button id="logoutBtn" style="background:#dc3545;color:white;border:none;padding:10px 20px;border-radius:4px;cursor:pointer">
      Logout
    </button>
    <p><a href="/" onclick="event.preventDefault(); navigate('/')">Back to Menu</a></p>
  `;

  loadProfileInfo();

  document.getElementById('logoutBtn').onclick = () => {
    store.logout();
    alert("Logged out successfully");
    navigate("/login");
  };
}

async function loadProfileInfo() {
  const infoEl = document.getElementById('userInfo');
  try {
    const user = await api.getProfile();
    infoEl.innerHTML = `
      <p><strong>Full Name:</strong> ${user.fullName || 'Not set'}</p>
      <p><strong>Email:</strong> ${user.email || '-'}</p>
      <p><strong>Phone:</strong> ${user.phone || 'Not set'}</p>
      <p><strong>Gender:</strong> ${user.gender || 'Not set'}</p>
      <p><strong>Address:</strong> ${user.address || 'Not set'}</p>
      <p><strong>Birth Date:</strong> ${user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Not set'}</p>
    `;
  } catch (err) {
    
    infoEl.innerHTML = `
      <p style="color: red;">Failed to load profile: ${err.message}</p>
      <button onclick="loadProfileInfo()" style="padding: 8px 16px; cursor: pointer;">Retry</button>
    `;
  }
}