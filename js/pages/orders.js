function renderOrders() {
  console.log("Profile and Orders pages loaded at 9/28"); 
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>📦 My Orders</h1>
    <button onclick="loadOrdersWithFallback()" style="margin-bottom: 10px; padding: 8px 16px; cursor: pointer;">Refresh Orders</button>
    <div id="orderList">Loading...</div>
    <p><a href="/" onclick="event.preventDefault(); navigate('/')">Back to Menu</a></p>
  `;
  loadOrdersWithFallback();
}

async function loadOrdersWithFallback() {
  const listEl = document.getElementById('orderList');
  listEl.innerHTML = '<p>Loading orders...</p>';
  
  try {
    const orders = await api.getOrders();

    if (orders && orders.length > 0) {
      listEl.innerHTML = orders.map(order => {
        
        let statusColor = '#ff6b00';
        if (order.status === 'Delivered') statusColor = 'green';
        if (order.status === 'Cancelled') statusColor = 'red';
        
        return `
        <div style="border:1px solid #eee;padding:15px;margin:10px 0;border-radius:6px">
          <h3>Order #${order.id}</h3>
          <p>Created: ${new Date(order.orderTime).toLocaleString()}</p>
          <p>Delivery: ${new Date(order.deliveryTime).toLocaleString()}</p>
          <p>Status: <span style="color: ${statusColor}; font-weight: bold;">${order.status}</span></p>
          <p>Total: ${order.price} RUB</p>
          <p>Address: ${order.address}</p>
        </div>
      `}).join('');
    } else {
      
      listEl.innerHTML = `
        <div style="border:1px solid #eee;padding:15px;margin:10px 0;border-radius:6px">
          <h3>Order #1001 (Demo)</h3>
          <p>Created: ${new Date().toLocaleString()}</p>
          <p>Delivery: ${new Date(Date.now() + 3600000).toLocaleString()}</p>
          <p>Status: <span style="color: #ff6b00; font-weight: bold;">Ordered</span></p>
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
        <p>Status: <span style="color: #ff6b00; font-weight: bold;">Ordered</span></p>
        <p>Total: 60 RUB</p>
        <p>Address: Default Address</p>
      </div>
      <p style="color: red;">Error loading orders: ${err.message}</p>
    `;
  }
}