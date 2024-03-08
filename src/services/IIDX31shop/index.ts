import { serviceKxml } from "../../decorators/to-kxml.js";

const resp = serviceKxml('IIDX31shop');

export default class {
  @resp('getname')
  async getname() {
    return {
      $cls_opt: 14400,
      $expire: 0,
      $opname: '原神, 启动',
      $pid: 30,
    };
  }

  @resp('sentinfo')
  async sentinfo() {
    return {
      $status: 0,
    };
  }
}
