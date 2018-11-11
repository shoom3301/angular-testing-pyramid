import {createServer, IncomingMessage, ServerResponse} from 'http';
import {routes} from './routes';

const server = createServer(dispatcher);
const port = 8041;

server.listen(port);

console.log(`Server started. http://localhost:${port}`);

function dispatcher(req: IncomingMessage, res: ServerResponse) {
  const [path] = (req.url || '').split('?');

  const route = `${req.method} ${path}`;

  if (routes[route]) {
    return routes[route](req, res);
  }

  res.statusCode = 404;
  res.end();
}
