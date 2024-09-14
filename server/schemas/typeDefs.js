const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Product {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
    }
    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }
    type User {
        _id: ID
        username: String
        email: String
        orders: [Order]
    }
    type Checkout {
        session: ID
    }
    type Auth {
        token: ID
        user: User
    }
    type Query {
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        user: User
        order(_id: ID!): Order
         orders(username: String): [Order]
        checkout(products: [ID]!): Checkout
    }
    type Mutation {
        addUser(
            username: String!
            email: String!
            password: String!
        ): Auth
        addOrder(products: [ID]!): Order
        updateUser(
            username: String
            email: String
            password: String
        ): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;