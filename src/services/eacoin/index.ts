import { serviceKxml } from "../../decorators/to-kxml.js";
import { v } from "../../utils/kxml-value.js";

const resp = serviceKxml('eacoin');

export default class {
  @resp('checkin')
  checkin() {
    return {
      $status: 0,
      balance: v.s32(114514),
      sessid: v.str('0000000000000000'),
      acstatus: v.u8(0),
      sequence: v.s16(1),
      acid: v.str('0000000000000000'),
      acname: v.str('0000000000000000'),
    }
  }

  @resp('consume')
  consume() {
    return {
      $status: 0,
      autocharge: v.u8(0),
      acstatus: v.u8(0),
      balance: v.u8(114514),
    }
  }
}
