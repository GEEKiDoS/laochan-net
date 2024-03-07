import 'reflect-metadata';

import Koa, { DefaultState } from 'koa';
import { InjectionToken, Provider, container } from 'tsyringe';

import { ILaochanContext } from './types.js';
import { DefaultService } from './services/default.js';
import { Logger } from '@cordisjs/logger';
import { crypto } from './middlewares/crypto.js';
import { binaryBody } from './middlewares/binarybody.js';
import { parseKxml } from './middlewares/parseKxml.js';
import { decompress } from './middlewares/decompress.js';
import config from './utils/config.js';

function tryResolve<T>(token: InjectionToken<T>): T | undefined {
  if (!container.isRegistered(token)) return undefined;

  return container.resolve(token);
}

function register<T>(
  token: InjectionToken<T>,
  provider: Provider<T> | { new(...args: any[]): T },
): T {
  if (container.isRegistered(token)) return container.resolve(token);

  // @ts-expect-error: noob tsc
  return container.register(token, provider).resolve(token);
}

async function main(): Promise<void> {
  const logger = new Logger('main');

  const app = new Koa<DefaultState, ILaochanContext>()
    .use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        logger.error(
          'unexcepted error: %s',
          JSON.stringify(e, Object.getOwnPropertyNames(e), 2),
        );

        ctx.status = e.status ?? 500;
        ctx.body = `${e.stack ?? 'Internal Error'}`;
      }
    })
    .use(binaryBody)
    .use(crypto)
    .use(decompress)
    .use(parseKxml)
    .use(async (ctx, next) => {
      if (typeof ctx.query.f !== 'string') {
        throw new Error('invaild service');
      }

      if (typeof ctx.query.model !== 'string') {
        throw new Error('invaild model');
      }

      let [serviceName, method] = ctx.query.f.split('.');

      ctx.model = ctx.query.model;
      ctx.service = {
        name: serviceName,
        method,
      };
      
      ctx.body = ctx.body[ctx.service.name];
      ctx.logger = ctx.service
        ? register(`logger:${ctx.service.name}`, {
          useValue: new Logger(ctx.service.name),
        })
        : logger;

      let service: object | undefined = ctx.service
        ? tryResolve(ctx.service.name)
        : container.resolve(DefaultService);

      if (service === undefined) {
        try {
          let module: any = null;

          try {
            module = await import(
              `./services/${ctx.service.name}/index.js`
            );
          } catch {
            module = await import(
              `./services/${ctx.service.name}.js`
            );
          }
          
          service = register(ctx.service.name, {
            useClass: module.default,
          });
        } catch (e) {
          logger.error(
            `load service error %s`,
            JSON.stringify(e, Object.getOwnPropertyNames(e), 2),
          );
        }
      }

      logger.info(
        '%s.$s [%s]: request = %s',
        ctx.service.name,
        ctx.service.method,
        ctx.pcbid,
        JSON.stringify(ctx.request.body),
      );

      if (service === undefined || !(method in service)) {
        logger.warn(`unimplemented method ${ctx.service.method} in ${ctx.service.name}`);

        service = container.resolve(DefaultService);
        method = 'default';
      }

      ctx.body = await service[method](ctx);
      ctx.status = 200;

      logger.info('%s [server]: status = %d', ctx.service, ctx.status);
      return await next();
    });

  app.listen(config.port);
}

main();
