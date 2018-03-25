import restify from 'restify';
import routes from './routes';

const server = restify.createServer({ name: 'api' });
server.use(restify.plugins.bodyParser());
routes(server);
server.listen(3000);
module.exports = server;
