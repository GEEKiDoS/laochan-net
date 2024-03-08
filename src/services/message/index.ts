import { serviceKxml } from '../../decorators/to-kxml.js';

const resp = serviceKxml('message');

export default class {
  @resp('get')
  async get(): Promise<object> {
    return {
      $status: 0,
      $expire: 60,
    };
  }
}
