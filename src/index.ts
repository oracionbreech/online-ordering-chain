import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

import router from './routes';

import { config } from 'dotenv';
config();
/**
 * Online ordering API Service.
 */

const port = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://quickmeal.netlify.app']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev', {}));

app.use(router);

export const server = http.createServer(app);

(async () => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    server.listen(port, () => console.info('Online ordering service is now running'));
  }
})();

export default app;
