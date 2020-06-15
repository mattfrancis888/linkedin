const jsonServer = require("json-server");

var path = require("path");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;

const router = jsonServer.router(path.join(__dirname, "db.json"));
const db = router.db.getState();

const expressGraphQL = require("express-graphql");
const schema = require("./schema");

const server = jsonServer.create();
server.use(middlewares);
server.use(jsonServer.bodyParser); //needed for other methods besides GET

server.get("/users", (req, res) => {
    res.status(200).jsonp(db.users);
});
server.get("/users/:id", (req, res) => {
    let result = db.users.find((user) => {
        return user.id == req.params.id;
    });
    res.status(200).jsonp(result);
});
server.post("/users", (req, res) => {
    if (req.method === "POST") {
        //Set auto increment ID
        const lastItem = db.users[db.users.length - 1];
        const incrementId = lastItem.id + 1;

        req.body.id = incrementId;

        db.users.push(req.body);
        //Must write to db in order to update db.json for local db.json
        //other wise it's stored in a cache database. Will be on database
        //for a while before it's deleted.
        //  router.db.write();
    }
    res.status(200).jsonp(req.body);
});

server.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true,
    })
    //graphiql is the development tool for grahql elements
);

server.use(router);
server.listen(port, () => {
    console.log("JSON Server is running");
});
// const port = process.env.PORT || 5000;
// const cors = require("cors");
// const express = require("express");
// const expressGraphQL = require("express-graphql");
// const schema = require("./schema");
// const app = express();

// app.use(cors());

// app.use(
//     "/graphql",
//     expressGraphQL({
//         schema,
//         graphiql: true,
//     })
//     //graphiql is the development tool for grahql elements
// );
// app.listen(port, () => {
//     console.log("Listening");
// });
