"use strict";
const knex = require("knex");
const path = require("path");
const glob = require("glob");
const resources = glob.sync("resources/*/{db.js,db/index.js}", { cwd: __dirname });

// export a function that turns config into a DB instance
module.exports = (config) => {
  // create knex DB client
  const knexClient = knex({
    client: "mysql",
    connection: {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database
    }
  });

  // we will use TransactionWrapper to encapsulate transactions
  function TransactionWrapper(trx) {
    this._trx = trx;
    this._methodCache = {};
  }

  // build DB resource from knex application across all resource subdirectories
  const Resources = resources.reduce(function (map, resource) {
    const filepath = path.resolve(__dirname, resource);

    const requirement = require(filepath);       // db => map of methods
    const appliedRequirement = requirement(knexClient);  // map of methods

    // for each db function, add the function's name as an accessor to
    // TransactionWrapper's prototype, allowing for the function to be
    // dynamically resolved from a recreated parent requirement.
    for (let accessorName in appliedRequirement) {
      const descriptor = {
        get: function() {
          // memoize applied requirement per-transaction
          if (this._methodCache[accessorName] === undefined) {
            this._methodCache = Object.assign(this._methodCache, requirement(this._trx));
          }
          return this._methodCache[accessorName];
        }
      };
      Object.defineProperty(TransactionWrapper.prototype, accessorName, descriptor);
    }

    // apply the map of db funcs and keep rolling
    return Object.assign(map, appliedRequirement);
  }, { knexClient });

  Resources.transaction = transactBody => {
    return knexClient.transaction(trx => {
      return transactBody(new TransactionWrapper(trx));
    });
  };

  return Resources;
};
