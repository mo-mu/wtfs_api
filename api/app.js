import express from 'express';
import SwaggerExpress from 'swagger-express-mw';
import SwaggerUI from 'swagger-tools/middleware/swagger-ui';

import mongoose from 'mongoose';
import util from 'util';

import { db_address } from './const.json';

mongoose.Promise = Promise;
mongoose.connect(util.format('mongodb://%s', db_address));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected');
});

const app = express();
const API_VERSION = 'v1';

const config = {
  appRoot: __dirname, // required config'
  swaggerFile: util.format('api/swagger/%s.yaml', API_VERSION),
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  swaggerExpress.runner.swagger.basePath = util.format('/api/%s', API_VERSION);
  app.use(SwaggerUI(swaggerExpress.runner.swagger, { // eslint-disable-line new-cap
    swaggerUi: '/docs', // swagger ui web page
    apiDocs: util.format('/%s', API_VERSION), // api document in yaml format
  }));

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(util.format('Serve on port %d', port));
  });
});

export default app;
