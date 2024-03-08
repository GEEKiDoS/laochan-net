import { Context } from '../types.js';
import { kxml } from '../decorators/to-kxml.js';

export class DefaultService {
  @kxml()
  async default(ctx: Context) {
    return {
      [ctx.service.name]: {
        $method: ctx.service.method,
        status: '0',
      }
    }
  }
}
