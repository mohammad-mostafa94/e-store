const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(con => {
            console.log(`Mongodb connected with our HOST: ${con.connection.host}:5000`)
        })
    } catch (error) {
        console.log("error====", error.message);
    }
}

module.exports = connectDatabase;