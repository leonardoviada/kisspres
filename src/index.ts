import express       from 'express';
import bodyParser    from 'body-parser';
import cookieSession from 'cookie-session';

import './controllers/LoginController';
import './controllers/RootController';
import { AppRouter } from './AppRouter';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['ornitorinco'] }));

app.use(AppRouter.getInstance());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server in esecuzione su porta ${ PORT }`);
});