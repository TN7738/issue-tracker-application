const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGDO_CONN_DEV);

    console.log(`MongoDB is connected ${conn.connection.host}`);
};

module.exports = connectDB;
