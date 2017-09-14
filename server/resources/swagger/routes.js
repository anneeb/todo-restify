const generateDocs = require('./docs');

/**
 * This endpoint documents itself and everything else!
 *
 * @swagger
 * /swagger.json:
 *   get:
 *     tags: [ Documentation ]
 *     summary: Retrieves the Swagger.js documentation for Properties
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success!
 */

module.exports = (server) => {
  const docs = generateDocs();

  const swaggerPath = {
    path: '/swagger.json',
    name: 'swagger API descriptor',
  };

  server.get(swaggerPath, (req, res, next) => {
    res.send(200, docs);
    return next();
  });

};
