import { kxml } from '../../decorators/render-kxml.js';
import { ILaochanService } from '../../types.js';
import { singleton } from 'tsyringe';

@singleton()
export default class implements ILaochanService {
  @kxml('message/get')
  async process(): Promise<object> {
    return {
      status: 0,
      expire: 60,
    };
  }
}
