// server.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable this for development
  playground: true,    // Enable this for development
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return error;
  },
});

const startApolloServer = async () => {
  try {
    await db;
    await server.start();
    
    app.use(cors(corsOptions));
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware
    }));

    // Stripe webhook route (if needed)
    app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
      const sig = req.headers['stripe-signature'];
      // Add Stripe webhook handling logic here
    });

    // if we're in production, serve client/dist as static assets
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    } 

    await new Promise(resolve => db.once('open', resolve));
    
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('An unexpected error occurred');
});

startApolloServer().catch(error => {
  console.error('Failed to start server:', error);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});