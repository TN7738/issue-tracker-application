const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());
connectDB();

const port = 5000;

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(port, console.log(`App is running on port ${port}`));
