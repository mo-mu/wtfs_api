import express from 'express';
import SwaggerExpress from 'swagger-express-mw';
import SwaggerUI from 'swagger-tools/middleware/swagger-ui';
import util from 'util';
import bodyParser from 'body-parser';

import { sequelize } from './models';

const app = express();
const API_VERSION = 'v1';

const config = {
  appRoot: __dirname, // required config'
  swaggerFile: util.format('api/swagger/%s.yaml', API_VERSION),
};

app.use(bodyParser.json());

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  swaggerExpress.runner.swagger.basePath = util.format('/api/%s', API_VERSION);
  app.use(SwaggerUI(swaggerExpress.runner.swagger, { // eslint-disable-line new-cap
    swaggerUi: '/docs', // swagger ui web page
    apiDocs: util.format('/%s', API_VERSION), // api document in yaml format
  }));

  // install middleware
  swaggerExpress.register(app);

  sequelize.sync({ force: false }).then(() => {
    console.log('db connected');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(util.format('Serve on port %d', port));
    });
  });
});

export default app;
