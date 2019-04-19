const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlresolvers = require('./graphql/resolvers/index');
const graphqlSchema = require('./graphql/schema/index');

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlresolvers,
    graphiql: true
  })
);


const atlasUrl = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-gxoow.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`  

mongoose
  .connect(
    `mongodb://mongo:27017/${process.env.MONGO_DB}`
  )
  .then(() => { 
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
