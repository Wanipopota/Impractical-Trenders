
const db = require('../config/connection');
const { User, Product } = require('../models');

db.once('open', async () => {
  await Product.deleteMany();
  const products = await Product.insertMany([
    {
      name: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Canned Coffee',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
      image: 'canned-coffee.jpg',
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Toilet Paper',
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in.',
      image: 'toilet-paper.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Handmade Soap',
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis.',
      image: 'soap.jpg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Set of Wooden Spoons',
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut.',
      image: 'wooden-spoons.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Camera',
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex.',
      image: 'camera.jpg',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Tablet',
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu.',
      image: 'tablet.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'Tales at Bedtime',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'bedtime-book.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Spinning Top',
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Set of Plastic Horses',
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui.',
      image: 'plastic-horses.jpg',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Teddy Bear',
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui.',
      image: 'teddy-bear.jpg',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Alphabet Blocks',
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet.',
      image: 'alphabet-blocks.jpg',
      price: 9.99,
      quantity: 600
    }
  ]);
  console.log('products seeded');
  await User.deleteMany();
  await User.create({
    username: 'PamelaWashington',  // Updated to match typedef
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[1]._id]
      }
    ]
  });
  await User.create({
    username: 'ElijahHolt',  // Updated to match typedef
    email: 'eholt@testmail.com',
    password: 'password12345'
  });
  await User.create({
    username: 'SophiaReed',  // New user
    email: 'sophia@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[2]._id, products[3]._id]
      }
    ]
  });
  console.log('users seeded');
  process.exit(0);
});