function renderOrders() {
  // 更新时间戳到 10/23，对应 YAN-11 任务
  console.log("Orders page loaded with status badges at 10/23");
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
        // 根据状态分配不同颜色的徽章
        let badgeColor = '#6c757d'; // 默认灰色
        if (order.status === 'Delivered') badgeColor = '#28a745'; // 绿色
        else if (order.status === 'Cancelled') badgeColor = '#dc3545'; // 红色
        else if (order.status === 'Pending' || order.status === 'Ordered') badgeColor = '#ff6b00'; // 橙色
        
        return `
        <div style="border:1px solid #eee;padding:15px;margin:10px 0;border-radius:6px">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0;">Order #${order.id}</h3>
            <span style="background-color: ${badgeColor}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 14px; font-weight: bold;">
              ${order.status}
            </span>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;">
          <p>Created: ${new Date(order.orderTime).toLocaleString()}</p>
          <p>Delivery: ${new Date(order.deliveryTime).toLocaleString()}</p>
          <p>Total: ${order.price} RUB</p>
          <p>Address: ${order.address}</p>
        </div>
      `}).join('');
    } else {
      // 演示数据加上状态徽章
      listEl.innerHTML = `
        <div style="border:1px solid #eee;padding:15px;margin:10px 0;border-radius:6px">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0;">Order #1001 (Demo)</h3>
            <span style="background-color: #ff6b00; color: white; padding: 4px 10px; border-radius: 12px; font-size: 14px; font-weight: bold;">
              Ordered
            </span>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;">
          <p>Created: ${new Date().toLocaleString()}</p>
          <p>Delivery: ${new Date(Date.now() + 3600000).toLocaleString()}</p>
          <p>Total: 38 RUB</p>
          <p>Address: Default Address</p>
        </div>
      `;
    }
  } catch (err) {
    // 错误处理也加上徽章
    listEl.innerHTML = `
      <div style="border:1px solid #eee;padding:15px;margin:10px 0;border-radius:6px">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0;">Order #1001 (Demo)</h3>
            <span style="background-color: #ff6b00; color: white; padding: 4px 10px; border-radius: 12px; font-size: 14px; font-weight: bold;">
              Ordered
            </span>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;">
        <p>Created: ${new Date().toLocaleString()}</p>
        <p>Delivery: ${new Date(Date.now() + 3600000).toLocaleString()}</p>
        <p>Total: 60 RUB</p>
        <p>Address: Default Address</p>
      </div>
      <p style="color: red; margin-top: 10px;">Error loading orders: ${err.message}</p>
    `;
  }
}