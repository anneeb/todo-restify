const path = require('path');
const glob = require('glob');
const swaggerJSDoc = require('swagger-jsdoc');
const pkg = require('../../../package.json');

module.exports = () => {
  // scan for all routes and other candidate files
  const apiPaths = glob.sync('../*/+(routes|model*).js', { cwd: __dirname });
  const schemaPaths = glob.sync('../../schema/*.json', { cwd: __dirname })
    .concat(glob.sync('../*/schema.+(js|json)', { cwd: __dirname }));

  const apis = [];

  // for each resource file, add the full path to the apis list
  apiPaths.forEach((route) => {
    const filepath = path.resolve(__dirname, route);
    apis.push(filepath);
  });

  // use swagger-jsdoc to build the API descriptor blob
  const spec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: 'Todo Restify',
        version: pkg.version,
        description: pkg.description,
      },
      host: 'localhost:3000',
      basePath: '/',
    },
    apis
  });

  schemaPaths.forEach((route) => {
    const filepath = path.resolve(__dirname, route);
    const schemaDefs = require(filepath);
    Object.assign(spec.definitions, schemaDefs);
  });

  return spec;
};
