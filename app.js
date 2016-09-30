import SwaggerExpress from 'swagger-express-mw';
import SwaggerUi from 'swagger-tools/middleware/swagger-ui';
import express from 'express';

const app = express();
module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // add swagger-ui (/docs)
  app.use(SwaggerUi(swaggerExpress.runner.swagger)); // eslint-disable-line
  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log('Server is listening on port', port);
  });
});
