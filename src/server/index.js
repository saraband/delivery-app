import log from './log';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  log.endl();
  log.server(`Server started on port ${PORT}`);
});
