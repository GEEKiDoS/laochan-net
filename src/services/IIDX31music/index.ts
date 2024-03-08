import { serviceKxml } from "../../decorators/to-kxml.js";
// import { v } from "../../utils/kxml-value.js";

const resp = serviceKxml('IIDX31music');

export default class {
  @resp('crate')
  async crate() {
    return {
      $expire: 1800,
      c: [
        // v.s32('114514', { mid: 11451 }),
      ],
    };
  }

  @resp('reg')
  async reg() {
    return {
      $clid: 0,
      $crate: 0,
      $frate: 0,
      $mid: 0,
      $rankside: 0,
      $status: 0,
      shopdata: {
        $rank: 252,
      },
      ranklist: {
        $total_user_num: 1,
        data: [{
          $clflg: 4,
          $dgrade: -1,
          $sgrade: -1,
          $iidx_id: '114514',
          $myFlg: '0',
          $name: 'MK_',
          $opname: '雷窝',
          $pid: 0,
          $rnum: 0,
          $score: 0,
          $update: 0,
          $body: 0,
          $face: 0,
          $hair: 0,
          $hand: 0,
          $head: 0,
        }]
      }
    }
  }
}
