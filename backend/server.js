const app = require('./app');
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR:${err.message}`);
    console.log(`Full ERROR:${err.stack}`); // stack use for full form of error message
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
})

// setup config file
dotenv.config({ path: 'backend/config/config.env' })


// database connection
connectDatabase();



const server = app.listen(process.env.PORT, () => {
    console.log(`Server working at PORT: ${process.env.PORT} and Node ${process.env.NODE_ENV}`);
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise rejection");
    server.close(() => {
        process.exit(1);
    });
})