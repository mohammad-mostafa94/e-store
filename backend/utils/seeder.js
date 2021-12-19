const Product = require('../models/product');
const dotenv = require('dotenv');
const connection = require('../config/database');

const products = require('../data/products');
// const { connect } = require('mongoose');
const connectDatabase = require('../config/database');

// dotenv file path
dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('All Product deleted successfully');

        await Product.insertMany(products);
        console.log('All Product inserted successfully');

        process.exit();
    }
    catch (err) {
        console.error(err.message);
        process.exit();
    }
}

seedProducts();