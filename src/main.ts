import "reflect-metadata";

import Koa, { DefaultState } from 'koa';
import { InjectionToken, Provider, container } from "tsyringe";

import { ILaochanContext, ILaochanService } from './types.js';
import { DefaultService } from "./functions/default.js";
import { Logger } from "@cordisjs/logger";
import { crypto } from "./middlewares/crypto.js";
import { binaryBody } from "./middlewares/binarybody.js";
import { parseKxml } from "./middlewares/parseKxml.js";

function tryResolve<T>(token: InjectionToken<T>): T | undefined {
  if (!container.isRegistered(token))
    return undefined;

  return container.resolve(token);
}

function register<T>(token: InjectionToken<T>, provider: Provider<T> | { new(...args: any[]): T }): T {
  if (container.isRegistered(token))
    return container.resolve(token);

  // @ts-ignore
  return container.register(token, provider)
    .resolve(token);
}

async function main() {

  const logger = new Logger('main');

  const app = new Koa<DefaultState, ILaochanContext>()
    .use(binaryBody)
    .use(crypto)
    .use(parseKxml)
    .use(async (ctx, next) => {
      if (typeof ctx.query.f !== 'string') {
        throw new Error('invaild service');
      }

      if (typeof ctx.query.model !== 'string') {
        throw new Error('invaild model');
      }

      ctx.model = ctx.query.model;
      ctx.service = ctx.query.f;
      ctx.logger = ctx.service ? register(`logger:${ctx.service}`, {
        useValue: new Logger(ctx.service),
      }) : logger;

      let service: ILaochanService | undefined = ctx.service ?
        tryResolve(ctx.service) : container.resolve(DefaultService);

      if (service === undefined) {
        try {
          const module = await import(`./functions/${ctx.service.replace('.', '/')}.js`);
          service = register(ctx.service, {
            useClass: module.default,
          });
        } catch { }
      }

      if (service === undefined) {
        logger.warn(`unimplemented service ${ctx.service}`);
        service = container.resolve(DefaultService);
      }

      logger.info('%s [%s]: request = %s', ctx.service, ctx.pcbid, JSON.stringify(ctx.request.body));

      try {
        ctx.body = await service.process(ctx);
        ctx.status = 200;
      } catch (e) {
        logger.error('unexcepted error: %s', JSON.stringify(e, Object.getOwnPropertyNames(e), 2));

        ctx.status = e.status ?? 500;
        ctx.body = `${e.stack ?? 'Internal Error'}`;
      }

      logger.info('%s [server]: status = %d', ctx.service, ctx.status);
      return await next();
    });

  app.listen(10573);
}

main();
