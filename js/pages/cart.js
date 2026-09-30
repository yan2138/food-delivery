function getLocalCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveLocalCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  
  console.log("Cart page loaded at 9/30 - YAN-7 improvements");
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Shopping Cart</h1>
    <div id="cartList">Loading...</div>
    <div id="cartTotal" style="margin: 15px 0; font-size: 18px; font-weight: bold; padding: 10px; background: #f9f9f9; border-radius: 4px;"></div>
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <button id="checkoutBtn" style="background: #ff6b00; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; transition: opacity 0.3s;">
        Checkout
      </button>
      <!-- New: Clear Cart Button -->
      <button id="clearCartBtn" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
        Clear Cart
      </button>
    </div>
    <p><a href="/" onclick="event.preventDefault(); navigate('/')">Back to Menu</a></p>
  `;
  
  loadLocalCart();

  
  document.getElementById('clearCartBtn').onclick = () => {
    if (confirm('Are you sure you want to clear the entire cart?')) {
      saveLocalCart([]);
      loadLocalCart();
    }
  };
}

function loadLocalCart() {
  const cart = getLocalCart();
  const listEl = document.getElementById('cartList');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cart.length === 0) {
    
    listEl.innerHTML = '<p style="color: #888;">Your cart is empty.</p>';
    totalEl.innerHTML = 'Total: 0.00 RUB (0 items)';
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = '0.5';
    return;
  }

  let total = 0;
  let totalItems = 0;
  listEl.innerHTML = '';

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalItems += item.quantity;
    
    const div = document.createElement('div');
    div.style.border = '1px solid #eee';
    div.style.padding = '15px';
    div.style.margin = '10px 0';
    div.style.borderRadius = '6px'; 
    
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ${item.price} RUB</p>
      <p>Quantity:
        <button onclick="changeQuantity(${index}, -1)" style="background: #f0f0f0; border: 1px solid #ccc; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 16px; line-height: 1;">-</button>
        <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)" style="background: #f0f0f0; border: 1px solid #ccc; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 16px; line-height: 1;">+</button>
      </p>
      <p>Subtotal: ${(item.price * item.quantity).toFixed(2)} RUB</p>
      <button onclick="removeItem(${index})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
        Remove
      </button>
    `;
    listEl.appendChild(div);
  });

  totalEl.innerHTML = `Total (${totalItems} items): ${total.toFixed(2)} RUB`;
  checkoutBtn.disabled = false;
  checkoutBtn.style.opacity = '1';

  checkoutBtn.onclick = () => {
    alert('Order placed successfully! (Local demo mode)');
    saveLocalCart([]);
    navigate('/orders');
  };
}

window.changeQuantity = function(index, delta) {
  const cart = getLocalCart();
  cart[index].quantity += delta;
  
  if (cart[index].quantity <= 0) {
    if (confirm('Quantity is 0. Remove this item?')) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = 1;
    }
  }
  
  saveLocalCart(cart);
  loadLocalCart();
};

window.removeItem = function(index) {
  if (!confirm('Remove this item?')) return;
  const cart = getLocalCart();
  cart.splice(index, 1);
  saveLocalCart(cart);
  loadLocalCart();
};