const jsonServer = require("json-server");

var path = require("path");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

const router = jsonServer.router(path.join(__dirname, "db.json"));
const db = router.db.getState();

const server = jsonServer.create();
server.use(middlewares);

server.use(router);
server.listen(port, () => {
    console.log("JSON Server is running");
});
