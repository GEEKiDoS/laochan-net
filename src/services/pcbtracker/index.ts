import { kxml } from '../../decorators/to-kxml.js';
import { singleton } from 'tsyringe';

@singleton()
export default class {
  @kxml()
  async process(): Promise<object> {
    return {
      pcbtracker: {
        $ecenable: 1,
        $expire: 3600,
        $method: 'alive',
        $status: 0,
        $time: Math.floor(new Date().valueOf() / 1000),
      }
    };
  }
}
