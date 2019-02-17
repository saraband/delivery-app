import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import graphQLHttp from 'express-graphql';
import path from 'path';
import bodyParser from 'body-parser';
import log from './log';
import schema from './schemas';
import helmet from 'helmet';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());

/* GRAPHQL */
app.use(cors());
app.use('/graphql', graphQLHttp({
  schema,
  pretty: true,
  graphiql: true
}));

/* LOGGING */
app.use(morgan('tiny'));

/* OTHERS MIDDLEWARES */
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(PORT, () => {
  log.endl();
  log.server(`Server started on port ${PORT}`);
});
