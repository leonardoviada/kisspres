import { Request, Response }    from 'express';
import { controller, get, use } from './decorators';
import { requireAuth }          from '../requireAuth';

@controller('')
export class RootController {

  @get('/')
  @use(requireAuth)
  getRoot(req: Request, res: Response) {
    if (req.session?.loggedIn)
      res.send(`
        <div>
          <h1>Home</h1>
          <h4>You're successfully logged in</h4>
        
            <a href="auth/logout">
                <button>Logout</button>
            </a>         
        </div>
  `);
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Hi there');
  };
}