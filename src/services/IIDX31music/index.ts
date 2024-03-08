import { serviceKxml } from "../../decorators/to-kxml.js";

const resp = serviceKxml('IIDX31music');

export default class {
  @resp('crate')
  async crate() {
    return {
      $expire: 1800,
      c: [
        // {
        //     $__type: 's32',
        //     $mid: 11451,
        //     __value: new Array(20).fill(-1),
        // }
      ],
    };
  }
}
