const app = require('./app');
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// setup config file
dotenv.config({ path: 'backend/config/config.env' })
// database connection
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server working at PORT: ${process.env.PORT} and Node ${process.env.NODE_ENV}`);
})