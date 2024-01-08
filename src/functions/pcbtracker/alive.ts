import { kxml } from '../../decorators/render-kxml.js';
import { ILaochanService } from '../../types.js';
import { singleton } from 'tsyringe';

@singleton()
export default class implements ILaochanService {
  @kxml('pcbtracker/alive')
  async process(): Promise<object> {
    return {
      status: 0,
      expire: 3600,
      time: Math.floor(new Date().valueOf() / 1000),
      ecEnable: 1,
    };
  }
}
