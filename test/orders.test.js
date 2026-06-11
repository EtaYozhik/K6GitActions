
const orders = require('../functions/orders'); 


describe('Orders', () => {

    // Define your expected order shapes
    const order1 = {
        id: 1, 
        customerId: 1, 
        items: ["shopping", "items"], 
        total: 100, 
        shippingAddress: "Shipping Address", 
        status: 'pending', 
        createdAt: expect.any(String)
    };
    
    const order2 = {
        id: 2, 
        customerId: 2, 
        items: ["shopping", "items", "but", "different"], 
        total: 67, 
        shippingAddress: "Shipping Address but different", 
        status: 'pending', 
        createdAt: expect.any(String)
    };

    test('add order', () => {
        orders.clearOrders();
        expect(orders.addOrder({customerId: 1, items: ["shopping", "items"], total: 100, shippingAddress: "Shipping Address"})).toEqual(order1);
    });

    test('add second order', () => {
        expect(orders.addOrder({customerId: 2, items: ["shopping", "items", "but", "different"], total: 67, shippingAddress: "Shipping Address but different"})).toEqual(order2);
    });

    test('get order by id', () => {
        expect(orders.getOrderById(1)).toEqual(order1);
    });
    
    test('get all orders', () => {
        expect(orders.getOrders()).toEqual([order1, order2]);
    }); 

    test('try printing the orders', () => {
        console.log(orders.getOrders());
    });
    
    test('test del orders', () => {
        expect(orders.delOrders(1)).toEqual([order2]);
    }); 

    test('try printing the orders but after removed', () => {
        console.log(orders.getOrders());
    });
});
