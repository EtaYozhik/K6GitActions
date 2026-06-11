let orders = [];
let nextId = 1;

function clearOrders() {
  orders = [];
  nextId = 1;
}

function addOrder({ customerId, items, total, shippingAddress }) {
  const order = {
    id: nextId++,
    customerId,
    items,
    total,
    shippingAddress,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  return order;
}

function getOrderById(id) {
  return orders.find((order) => order.id === id);
}

function getOrders() {
  return [...orders];
}

function delOrders(id) {
  orders = orders.filter((order) => order.id !== id);
  return getOrders();
}

module.exports = {
  clearOrders,
  addOrder,
  getOrderById,
  getOrders,
  delOrders
};
