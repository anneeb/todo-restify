const config = require('./config');
const pkg = require('./package.json');

const db = require('./server/db')(config.db);
const createServer = require('./server');

const server = createServer(db, config);

server.listen(config.service.port, () => {
  console.log(`${pkg.name} v${pkg.version} listening on ${config.service.port}`);
});

module.exports = { config, db, createServer };
