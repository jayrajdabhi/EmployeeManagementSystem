const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

const conn = mongoose.connect(
  "mongodb+srv://dabhijayraj200498:FqKOiFMh4AXaHBir@cluster0.0pfx1gq.mongodb.net/Employee?retryWrites=true&w=majority"
);


console.log(`Database connected`);

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3500, console.log("Database on port 3500"));
