const db = require('../config/connection');
const { User, Product, Order } = require('../models');
const bcrypt = require('bcrypt');

db.once('open', async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Create products
    const products = await Product.insertMany([
      {
        name: 'Tool Chair',
        description:
          'This new product is an office chair with tools attached to the sides so you can repair anything',
        image: 'tool-chair.jpg',
        price: 199.99,
        quantity: 30
      },
      {
        name: 'Sample Product 2',
        description: 'This is the description for product 2.',
        image: 'product2.jpg',
        quantity: 200,
        price: 29.99,
      },
      {
        name: 'Sample Product 3',
        description: 'This is the description for product 3.',
        image: 'product3.jpg',
        quantity: 150,
        price: 39.99,
      },
    ]);

    console.log('Products seeded!');

    // Hash user passwords
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create users
    const users = await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        orders: [],
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: hashedPassword,
        orders: [],
      },
    ]);

    console.log('Users seeded!');

    // Create orders for the users
    const orders = await Order.insertMany([
      {
        products: [products[0]._id, products[1]._id],
        purchaseDate: new Date().toISOString(),
      },
      {
        products: [products[2]._id],
        purchaseDate: new Date().toISOString(),
      },
    ]);

    // Add orders to users
    await User.findByIdAndUpdate(users[0]._id, { $push: { orders: orders[0]._id } });
    await User.findByIdAndUpdate(users[1]._id, { $push: { orders: orders[1]._id } });

    console.log('Orders seeded!');

  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
});
