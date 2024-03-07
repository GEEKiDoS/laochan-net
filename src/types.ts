import { Logger } from '@cordisjs/logger';
import { DefaultState, ParameterizedContext } from 'koa';

export interface ILaochanContext {
  model?: string;
  service?: {
    name: string,
    method: string,
  };
  pcbid?: string;
  logger: Logger;

  request: {
    body: Buffer | object | undefined;
  };
}

export type Context = ParameterizedContext<DefaultState, ILaochanContext, any>;
