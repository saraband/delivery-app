import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import graphQLHttp from 'express-graphql';
import path from 'path';
import bodyParser from 'body-parser';
import log from './log';
import schema from './schemas';

const app = express();
app.disable('x-powered-by-x');

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
  res.sendFile(path.resolve(__dirname, '../../dist/_index.html'));
});

app.listen(3000, () => {
  console.log('\n');
  log.server('Server started on port 3000');
});
