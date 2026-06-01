function renderOrders() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>📦 My Orders</h1>
    <div id="orderList">Loading...</div>
    <p><a href="/" onclick="event.preventDefault(); navigate('/')">Back to Menu</a></p>
  `;
  loadOrdersWithFallback();
}

async function loadOrdersWithFallback() {
  const listEl = document.getElementById('orderList');
  try {
    const orders = await api.getOrders();

    if (orders && orders.length > 0) {
      listEl.innerHTML = orders.map(order => `
        <div style="border:1px solid #eee;padding:15px;margin:10px 0;border-radius:6px">
          <h3>Order #${order.id}</h3>
          <p>Created: ${new Date(order.orderTime).toLocaleString()}</p>
          <p>Delivery: ${new Date(order.deliveryTime).toLocaleString()}</p>
          <p>Status: ${order.status}</p>
          <p>Total: ${order.price} RUB</p>
          <p>Address: ${order.address}</p>
        </div>
      `).join('');
    } else {
      listEl.innerHTML = `
        <div style="border:1px solid #eee;padding:15px;margin:10px 0;border-radius:6px">
          <h3>Order #1001 (Demo)</h3>
          <p>Created: ${new Date().toLocaleString()}</p>
          <p>Delivery: ${new Date(Date.now() + 3600000).toLocaleString()}</p>
          <p>Status: Ordered</p>
          <p>Total: 38 RUB</p>
          <p>Address: Default Address</p>
        </div>
      `;
    }
  } catch (err) {
    listEl.innerHTML = `
      <div style="border:1px solid #eee;padding:15px;margin:10px 0;border-radius:6px">
        <h3>Order #1001 (Demo)</h3>
        <p>Created: ${new Date().toLocaleString()}</p>
        <p>Delivery: ${new Date(Date.now() + 3600000).toLocaleString()}</p>
        <p>Status: Ordered</p>
        <p>Total: 60 RUB</p>
        <p>Address: Default Address</p>
      </div>
    `;
  }
}