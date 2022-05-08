import express from 'express';
import config from 'config';
import connect from './db/connect';
import log from './utils/logger';
import routes from './routes';
const PORT = config.get<number>('port');

const app = express();
//middleware
app.use(express.json());
const start = async () => {
  try {
    //connection to DB
    await connect();
    //set port
    app.listen(PORT, () => {
      log.info(`App is running on port::${PORT}.....`);
    });
    //setup routes
    routes(app);
  } catch (error) {}
};

start();
