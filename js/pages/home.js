function getLocalCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveLocalCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderHome() {

  console.log("Home page loaded with search filter at 10/14");
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Food Delivery</h1>
    <div style="margin-bottom: 20px;">
      <!-- 新增：搜索输入框 -->
      <input type="text" id="searchInput" placeholder="Search dishes..." 
             style="padding: 10px; width: 100%; max-width: 400px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
    </div>
    <div id="dishList">Loading...</div>
    <hr>
    <p>
      <a href="/cart" onclick="event.preventDefault(); navigate('/cart')">Cart</a> |
      <a href="/profile" onclick="event.preventDefault(); navigate('/profile')">Profile</a>
    </p>
  `;
  
  
  document.getElementById('searchInput').addEventListener('input', (e) => {
    loadDishes(e.target.value);
  });

  loadDishes(); 
}


function loadDishes(searchTerm = '') {
  const container = document.getElementById('dishList');

  const dishes = [
    { id: 1, name: 'Kung Pao Chicken', price: 38, description: 'Classic Sichuan dish with spicy chicken and peanuts' },
    { id: 2, name: 'Scrambled Eggs with Tomato', price: 22, description: 'Simple and delicious home-style food' },
    { id: 3, name: 'Braised Pork', price: 45, description: 'Tender and fatty pork with rich flavor' },
    { id: 4, name: 'Garlic Broccoli', price: 18, description: 'Healthy and fresh vegetable dish' },
    { id: 5, name: 'Shredded Pork in Fish Sauce', price: 32, description: 'Classic Chinese dish with savory taste' }
  ];

  
  const filteredDishes = dishes.filter(dish => 
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  container.innerHTML = '';

  
  if (filteredDishes.length === 0) {
    container.innerHTML = '<p style="color: #888;">No dishes found matching your search.</p>';
    return;
  }

  
  filteredDishes.forEach(dish => {
    const item = document.createElement('div');
    item.style.border = '1px solid #eee';
    item.style.padding = '15px';
    item.style.margin = '10px 0';
    item.style.borderRadius = '6px'; 
    item.innerHTML = `
      <h3>${dish.name}</h3>
      <p>Price: ${dish.price} RUB</p>
      <p>${dish.description}</p>
      <button onclick="addToCart(${dish.id}, '${dish.name}', ${dish.price})" 
              style="background: #ff6b00; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
        Add to Cart
      </button>
    `;
    container.appendChild(item);
  });
}

window.addToCart = function (id, name, price) {
  const cart = getLocalCart();
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  saveLocalCart(cart);
  alert(`${name} added to cart!`);
};