const db = require('../config/connection');
const { User, Product, Order } = require('../models');
const bcrypt = require('bcrypt');

db.once('open', async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Create products with comments
    const products = await Product.insertMany([
      {
        name: 'Tool Chair',
        description:
          'This new product is an office chair with tools attached to the sides so you can repair anything',
        image: 'tool-chair.jpg',
        price: 199.99,
        quantity: 30,
        comments: [
          {
            commentText: 'This chair saved me so much time when repairing things around the office!',
            username: 'John Doe',
            createdAt: new Date(),
          },
          {
            commentText: 'A bit pricey, but the convenience is worth it.',
            username: 'Jane Smith',
            createdAt: new Date(),
          },
        ],
      },
      {
        name: 'Cushion Speaker',
        description: 'A rest cushion that has a hidden speaker, to listen to music or relax without the need for headphones.',
        image: 'cushion-speaker.jpeg',
        quantity: 200,
        price: 29.99,
        comments: [
          {
            commentText: 'Great for relaxing without disturbing others!',
            username: 'Jane Smith',
            createdAt: new Date(),
          },
        ],
      },
      {
        name: 'Solar Hat',
        description: 'A hat with a small solar-powered fan that keeps you cool on sunny days.',
        image: 'solar-hat.jpeg',
        quantity: 150,
        price: 39.99,
        comments: [
          {
            commentText: 'This is a lifesaver on hot days!',
            username: 'John Doe',
            createdAt: new Date(),
          },
        ],
      },
      {
        name: 'Umbrella',
        description: 'An umbrella that includes a waterproof speaker, allowing you to listen to music or receive calls in the rain.',
        image: 'Umbrella.jpg',
        quantity: 200,
        price: 80,
        comments: [
          {
            commentText: 'Super useful during rainy days, keeps me entertained!',
            username: 'Jane Smith',
            createdAt: new Date(),
          },
        ],
      },
      {
        name: 'Bacpack Table',
        description: 'A backpack for camping or picnics includes a folding cutting board and basic cooking utensils.',
        image: 'bacpack-table.jpeg',
        quantity: 80,
        price: 60,
        comments: [
          {
            commentText: 'Perfect for picnics, I love the convenience!',
            username: 'John Doe',
            createdAt: new Date(),
          },
        ],
      },
      {
        name: 'Pijama Clock',
        description: 'Pijamas with gentle vibrations that wake you up without needing an audible alarm, for a more "natural" awakening.',
        image: 'pijama-clock.jpeg',
        quantity: 500,
        price: 25.99,
        comments: [
          {
            commentText: 'Wakes me up without annoying sounds, highly recommend!',
            username: 'Jane Smith',
            createdAt: new Date(),
          },
        ],
      },
    ]);

    console.log('Products with comments seeded!');

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
