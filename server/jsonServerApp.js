const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json'); 
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3005;

server.use(middlewares);
server.use(router);

server.listen(port, '0.0.0.0', () => {
  console.log(router);
  console.log(`JSON Server is running on port ${port}`);
});