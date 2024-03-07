import { kxml } from '../../decorators/to-kxml.js';
import { singleton } from 'tsyringe';

@singleton()
export default class {
  @kxml()
  async get(): Promise<object> {
    return {
      message: {
        $status: 0,
        $expire: 60,
        $method: 'get',
      }
    };
  }
}
