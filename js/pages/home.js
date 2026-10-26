function getLocalCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveLocalCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 新增：全局变量，用于记录当前的分类和搜索词
let currentCategory = 'All';
let currentSearch = '';

function renderHome() {
  // 更新时间戳，对应 YAN-12 任务
  console.log("Home page loaded with category filter at 10/26");
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Food Delivery</h1>
    <div style="margin-bottom: 20px;">
      <!-- 原有的搜索输入框 -->
      <input type="text" id="searchInput" placeholder="Search dishes..." 
             style="padding: 10px; width: 100%; max-width: 400px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; margin-bottom: 10px;">
      
      <!-- 新增：分类过滤按钮 -->
      <div id="categoryFilters" style="display: flex; gap: 10px;">
        <button class="cat-btn" data-cat="All" style="padding: 8px 16px; cursor: pointer; background: #ff6b00; color: white; border: none; border-radius: 4px;">All</button>
        <button class="cat-btn" data-cat="Meat" style="padding: 8px 16px; cursor: pointer; background: #eee; border: none; border-radius: 4px;">Meat</button>
        <button class="cat-btn" data-cat="Vegetable" style="padding: 8px 16px; cursor: pointer; background: #eee; border: none; border-radius: 4px;">Vegetable</button>
      </div>
    </div>
    <div id="dishList">Loading...</div>
    <hr>
    <p>
      <a href="/cart" onclick="event.preventDefault(); navigate('/cart')">Cart</a> |
      <a href="/profile" onclick="event.preventDefault(); navigate('/profile')">Profile</a>
    </p>
  `;
  
  // 搜索框事件（更新全局变量并重新渲染）
  document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    loadDishes();
  });

  // 新增：分类按钮点击事件
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // 重置所有按钮样式
      document.querySelectorAll('.cat-btn').forEach(b => {
        b.style.background = '#eee';
        b.style.color = 'black';
      });
      // 高亮当前点击的按钮
      e.target.style.background = '#ff6b00';
      e.target.style.color = 'white';
      
      // 更新当前分类并重新渲染菜品
      currentCategory = e.target.getAttribute('data-cat');
      loadDishes();
    });
  });

  loadDishes(); 
}

function loadDishes() {
  const container = document.getElementById('dishList');

  // 新增：给所有菜品加上了 category（分类）属性
  const dishes = [
    { id: 1, name: 'Kung Pao Chicken', price: 38, description: 'Classic Sichuan dish with spicy chicken and peanuts', category: 'Meat' },
    { id: 2, name: 'Scrambled Eggs with Tomato', price: 22, description: 'Simple and delicious home-style food', category: 'Vegetable' },
    { id: 3, name: 'Braised Pork', price: 45, description: 'Tender and fatty pork with rich flavor', category: 'Meat' },
    { id: 4, name: 'Garlic Broccoli', price: 18, description: 'Healthy and fresh vegetable dish', category: 'Vegetable' },
    { id: 5, name: 'Shredded Pork in Fish Sauce', price: 32, description: 'Classic Chinese dish with savory taste', category: 'Meat' }
  ];

  // 新增：双重过滤逻辑（同时满足分类和搜索词）
  const filteredDishes = dishes.filter(dish => {
    const matchCategory = currentCategory === 'All' || dish.category === currentCategory;
    const matchSearch = dish.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

  container.innerHTML = '';

  // 处理没有匹配结果的情况
  if (filteredDishes.length === 0) {
    container.innerHTML = '<p style="color: #888;">No dishes found matching your criteria.</p>';
    return;
  }

  // 渲染菜品列表
  filteredDishes.forEach(dish => {
    const item = document.createElement('div');
    item.style.border = '1px solid #eee';
    item.style.padding = '15px';
    item.style.margin = '10px 0';
    item.style.borderRadius = '6px'; 
    item.innerHTML = `
      <h3>${dish.name}</h3>
      <p style="color: #888; font-size: 14px; margin-top: -10px;">Category: ${dish.category}</p>
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