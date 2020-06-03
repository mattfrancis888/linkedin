// const jsonServer = require("json-server");

// var path = require("path");
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 4000;

// const router = jsonServer.router(path.join(__dirname, "db.json"));
// const db = router.db.getState();

// const expressGraphQL = require("express-graphql");
// const schema = require("./schema");

// const server = jsonServer.create();
// server.use(middlewares);

// server.use(router);
// server.use(
//     "/graphql",
//     expressGraphQL({
//         schema,
//         graphiql: true,
//     })
//     //graphiql is the development tool for grahql elements
// );
// server.listen(port, () => {
//     console.log("JSON Server is running");
// });

const cors = require("cors");
const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema");
const app = express();

app.use(cors());
app.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true,
    })
    //graphiql is the development tool for grahql elements
);
app.listen(4000, () => {
    console.log("Listening");
});
