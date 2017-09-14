"use strict";
const path = require("path");
const glob = require("glob");
const routes = glob.sync("resources/*/routes.js", { cwd: __dirname });

function createRoutes (server, options) {
  routes.forEach(function (route) {
    const filepath = path.resolve(__dirname, route);
    require(filepath)(server, options);
  });
  return server;
}

module.exports = createRoutes;
