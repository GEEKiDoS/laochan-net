import { serviceKxml } from '../../decorators/to-kxml.js';

const resp = serviceKxml('pcbtracker');

export default class {
  @resp('alive')
  async alive(): Promise<object> {
    return {
      $ecenable: 1,
      $expire: 3600,
      $status: 0,
      $time: Math.floor(new Date().valueOf() / 1000),
    };
  }
}
