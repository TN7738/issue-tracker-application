const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");
const connectDB = require("../config/db");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.use(express.static(path.join(__dirname, "../../issue-tracker/build")));

connectDB();

const port = 5000;

app.listen(port, console.log(`App is running on port ${port}`));
