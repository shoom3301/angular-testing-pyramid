const {createServer} = require('http');
const path = require('path');
const fs = require('fs');
const {Server} = require('node-static');
const proxyServer = require('http-proxy-middleware');
const proxyConfig = require('./proxy.conf');

const staticRoot = './dist/angular-testing-pyramid';
const staticServer = new Server(staticRoot);
const proxyPath = '/api';
const port = 8080;

createServer(function (req, res) {
  const isApiRequest = req.url.indexOf('/api') === 0;

  if (isApiRequest) {
    proxyServer(proxyPath, proxyConfig[proxyPath])(req, res);

    return;
  }

  const filePath = path.join(staticRoot, req.url);
  const isStaticRequest = fs.existsSync(filePath);

  if (!isStaticRequest) {
    req.url = '/';
  }

  staticServer.serve(req, res);
}).listen(port);
