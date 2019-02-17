import express from 'express';
import cors from 'cors';
import graphQLHttp from 'express-graphql';
import path from 'path';
import bodyParser from 'body-parser';
import schema from './schemas';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(cors());

/* GRAPHQL */
app.use('/graphql', graphQLHttp({
  schema,
  pretty: true,
  graphiql: true
}));

/* OTHERS MIDDLEWARES */
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

export default app;