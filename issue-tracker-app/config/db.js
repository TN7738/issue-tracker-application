const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(
        "mongodb+srv://tjtejas77:VtK1JsE7XLuM2LVn@cluster0.uferb.mongodb.net/issues_db?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log(`MongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
