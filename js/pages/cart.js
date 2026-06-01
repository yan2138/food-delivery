function getLocalCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveLocalCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Shopping Cart</h1>
    <div id="cartList">Loading...</div>
    <div id="cartTotal" style="margin: 15px 0; font-size: 18px; font-weight: bold;"></div>
    <button id="checkoutBtn" style="background: #ff6b00; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
      Checkout
    </button>
    <p><a href="/" onclick="event.preventDefault(); navigate('/')">Back to Menu</a></p>
  `;
  loadLocalCart();
}

function loadLocalCart() {
  const cart = getLocalCart();
  const listEl = document.getElementById('cartList');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cart.length === 0) {
    listEl.innerHTML = '<p>Your cart is empty</p>';
    totalEl.innerHTML = '';
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = '0.5';
    return;
  }

  let total = 0;
  listEl.innerHTML = '';

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.style.border = '1px solid #eee';
    div.style.padding = '15px';
    div.style.margin = '10px 0';
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ${item.price} RUB</p>
      <p>Quantity:
        <button onclick="changeQuantity(${index}, -1)" style="padding: 5px 10px; margin: 0 5px;">-</button>
        ${item.quantity}
        <button onclick="changeQuantity(${index}, 1)" style="padding: 5px 10px; margin: 0 5px;">+</button>
      </p>
      <p>Subtotal: ${(item.price * item.quantity).toFixed(2)} RUB</p>
      <button onclick="removeItem(${index})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
        Remove
      </button>
    `;
    listEl.appendChild(div);
  });

  totalEl.innerHTML = `Total: ${total.toFixed(2)} RUB`;
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
    cart.splice(index, 1);
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