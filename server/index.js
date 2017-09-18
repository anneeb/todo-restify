const restify = require('restify');
const pkg = require('../package.json');
const createRoutes = require('./routes.js');

function createServer(db, config) {
  if (!db) {
    throw new Error("no database provided");
  }

  let server = restify.createServer({
    name: pkg.name
  });

  const corsHeaders = [
    "authorization",
    "withcredentials",
    "x-requested-with",
    "x-forwarded-for",
    "x-real-ip",
    "x-customheader",
    "user-agent",
    "keep-alive",
    "host",
    "origin",
    "referrer",
    "accept",
    "connection",
    "upgrade",
    "content-type",
    "dnt",
    "if-modified-since",
    "cache-control"
  ];

  server.use(restify.plugins.jsonBodyParser());
  server.use(restify.plugins.queryParser());

  server.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', corsHeaders.join(","));
    next();
  });

  server.opts(/.*/, function (req, res, next) {
    res.send(204);
    next();
  });

  server.get('/', (req, res) => {
    res.send(200, { name: pkg.name, version: pkg.version });
  });

  server.use(function (req, res, next) {
    req.ctx = {};
    req.db = db;
    return next();
  });

  createRoutes(server, { config });

  return server;
}

module.exports = createServer;
