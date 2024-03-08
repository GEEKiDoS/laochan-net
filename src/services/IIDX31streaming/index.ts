import { serviceKxml } from "../../decorators/to-kxml.js";

const resp = serviceKxml('IIDX31streaming');

export default class {
  @resp('common')
  common() {
    return {
      $expire: Math.floor(new Date().valueOf() / 1000) + 259200,
      cm_info: {},
    };
  }
}
