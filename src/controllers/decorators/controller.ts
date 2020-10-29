import 'reflect-metadata';
import { AppRouter }                                       from '../../AppRouter';
import { MetadataKeys }                                    from './MetadataKeys';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Methods }                                         from './Methods';

const bodyValidators = (keys: string[]): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(442).send('invalid request');
    return;
  }

  for (let key of keys) {
    if (!req.body[key]) {
      res.status(422).send(`missing ${ key } property`);
      return;
    }
  }

  next();
};

export const controller = (routePrefix: string) => (target: any) => {
  const router = AppRouter.getInstance();
  let routes = [];
  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];

    const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
    const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
    const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];

    const validator = bodyValidators(requiredBodyProps);

    if (path) {
      router[method](`${ routePrefix }${ path }`, ...middlewares, validator, routeHandler);
      routes.push(`[${ method.toUpperCase() } ${ routePrefix }${ path }]`);
    }
  }
  console.log(routes);
};