import express from 'express';
import routes from './routes';

//inicia o express da aplicação
const app = express();
app.use(express.json());
app.use(routes);

export default app;
