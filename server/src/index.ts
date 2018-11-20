import {createServer, IncomingMessage, ServerResponse} from 'http';
import {routes} from './routes';

const port = 8041;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const [path] = (req.url || '').split('?');
  const routeName = `${req.method} ${path}`;
  const route = routes[routeName];

  if (route) {
    return route(req, res);
  }

  res.statusCode = 404;
  res.end();
});

server.listen(port);

console.log(`Server started. http://localhost:${port}`);
