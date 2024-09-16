// connection.js
const mongoose = require ('mongoose');

// Establish a connection to the database, which takes two arguments, first connecting the string & second connecting the option object  
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/impractical-trenders', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('Successfully connected to MongoDB'))
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

// Log database errors after connection
mongoose.connection.on('error', err => {
    console.error ('MongoDB connection error:', err);
});

// Closes Mongoose connection when the Node process ends
process.on('SIGINT', () => {
    mongoose.connection.close (() => {
        console.log ('MongoDB connection closed through app termination');
        process.exit(0);
    });
});

// Export the connection object to use on server.js
module.exports = mongoose.connection; 