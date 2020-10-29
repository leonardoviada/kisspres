import { Request, Response }     from 'express';
import { controller, get, post } from './decorators';
import { validate }              from './decorators/validate';

@controller('/auth')
export class LoginController {

  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <div>
        <h1>Login</h1>
        <form action="/auth/login" method="POST">
            <div>
                <label for="email">email</label>
                <input type="text" name="email">
            </div>
            <div>
                <label for="password">password</label>
                <input type="password" name="password">
            </div>
            <input type="submit">
        </form>
      </div>
  `);
  };

  @post('/login')
  @validate('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email === 'dev@revodigital.it' && password === 'Asmara2020!') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  };

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect('/auth/login');
  }

}

