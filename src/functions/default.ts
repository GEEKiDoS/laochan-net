import { singleton } from 'tsyringe';
import { Context, ILaochanService } from '../types.js';
import { kxml } from '../decorators/to-kxml.js';

@singleton()
export class DefaultService implements ILaochanService {
  @kxml()
  async process(ctx: Context) {
    const [module, method] = ctx.service.split('.');

    return {
      [module]: {
        $method: method,
        status: '0',
      }
    }
  }
}
