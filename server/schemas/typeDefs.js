const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    username: String 
    email: String
    password: String
    orders: [Order]!
}
type Order {
    _id: ID
    purchaseDate: Date
    status: String
    total: Float
    products: [Product]
}
type Product {
    _id: ID
    name: String
    description: String
    image: String 
    price: Float
    quantity: Int
    category: String

}

type Query {
    users: [User]
    user(username: String!): User
    orders(username: String): [Order]
    orders(orderId: ID!): Order
}

type Mutation {
    adduser(username: String!, email: String!, password: String!)
    login(email: String!, password: String!)
    addProduct(name: String!, description: String, price: Float!, quantity: Int!, image: String, category: String): Product
    removeProduct(productId: ID!): Product
    addOrder(productId: ID!): Order
    removeOrder(order_Id: ID!): Order
}
`;

module.exports = typeDefs;