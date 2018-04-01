import restify from 'restify';
import routes from './routes';

const server = restify.createServer({ name: 'api' });
server.use(restify.plugins.bodyParser());
routes(server);
server.listen(5000);
module.exports = server;
