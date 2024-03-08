import { serviceKxml } from "../../decorators/to-kxml.js";
import { Context } from "../../types.js";

interface GetPCDataCall {
  ccode: string,
  cid: string,
  ctype: string,
  did: string,
  lid: string,
  pid: string,
  rid: string,
}

const resp = serviceKxml('IIDX31pc');

export default class {
  @resp('common')
  async common() {
    return {
      system_voice_phase: {
        $phase: 0,
      },
      ir: {
        $beat: 0,
      },
      vip_pass_black: {},
      common_evnet: {
        $flg: -1,
      },
      play_video: {},
      music_retry: {},
      display_asio_logo: {},
      lane_gacha: {},
      tourism_booster: {},
      cm_movie_info: {
        $type: 3,
      },
      monthly_mranking: {
        $__type: 'u16',
        __value: [],
      },
      total_mranking: {
        $__type: 'u16',
        __value: [],
      },
      hitchart: [{
        $kind: 0,
        $period: 0,
        ranking: [{
          $music_id: 31021,
          $rank: 1
        }]
      }],
      $expire: 180,
    };
  }

  @resp('get')
  get(ctx: Context) {
    const { cid } = ctx.body as GetPCDataCall;
    return {
      pcdata: this.getPlayerPcData(cid),
      bind_eaappli: {},
      secret: {
        flg1: {
          $__type: 's64',
          __value: [-1, -1, 1048575],
        },
        flg2: {
          $__type: 's64',
          __value: [-1, -1, 0],
        },
        flg3: {
          $__type: 's64',
          __value: [-1, -1, 0],
        },
        flg4: {
          $__type: 's64',
          __value: [-1, -1, 0],
        },
      },
      favorite: {
        sp_mlist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        sp_clist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        dp_mlist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        dp_clist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
      },
      extra_favorite: [{
        $folder_id: 0,
        sp_mlist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        sp_clist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        dp_mlist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        dp_clist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
      }, {
        $folder_id: 0,
        sp_mlist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        sp_clist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        dp_mlist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
        dp_clist: {
          $__type: 'bin',
          __value: Buffer.alloc(1, 0),
        },
      }],
      grade: {
        $dgid: -1,
        $sgid: -1,
        g: {
          $__type: 'u8',
          __value: [0, 13, 3, 58],
        }
      },
      skin: {
        $__type: 's16',
        __value: new Array(20).fill(0),
      },
      tdjskin: {
        $__type: 's16',
        __value: [0, 0, 0, 0],
      },
      qprodata: {
        $__type: 'u32',
        __value: [0, 0, 0, 0, 0],
      },
      spdp_rival: {
        $flg: 1,
      },
      rlist: {},
      ex: {},
      secret_course_data: {},
      weekly: {
        $mid: 31048,
        $wid: 2041,
      },
      weekly_score: [],
      visitor: {
        $anum: 1,
        $pnum: 1,
        $snum: 1,
        $vs_flg: 0,
      },
      step: {

      }
    }
  }


  private getPlayerPcData(id: string) {
    const data = {
      d_auto_adjust: 0,
      d_auto_scrach: 0,
      d_camera_layout: 0,
      d_classic_hispeed: 0,
      d_disp_judge: 0,
      d_gauge_disp: 0,
      d_ghost_score: 0,
      d_gno: 0,
      d_graph_score: 0,
      d_gtype: 0,
      d_hispeed: 0.000000,
      d_judge: 0,
      d_judgeAdj: 0,
      d_lane_brignt: 0,
      d_liflen: 0,
      d_notes: 0.000000,
      d_opstyle: 0,
      d_pace: 0,
      d_sdlen: 0,
      d_sdtype: 0,
      d_sorttype: 0,
      d_sub_gno: 0,
      d_timing: 0,
      d_timing_split: 0,
      d_tsujigiri_disp: 0,
      d_visualization: 0,
      dach: 0,
      dp_opt: 1048577,
      dp_opt2: 1048577,
      dpnum: 0,
      gpos: 0,
      id: 0,
      idstr: '00000000',
      mode: 3,
      name: 'MK_',
      ngrade: 0,
      pid: 48,
      player_kind: 0,
      pmode: 0,
      rtype: 0,
      s_auto_adjust: 1,
      s_auto_scrach: 0,
      s_camera_layout: 0,
      s_classic_hispeed: 0,
      s_disp_judge: 1,
      s_gauge_disp: 0,
      s_ghost_score: 0,
      s_gno: 0,
      s_graph_score: 0,
      s_gtype: 1,
      s_hispeed: 7.888014,
      s_judge: 0,
      s_judgeAdj: -22,
      s_lane_brignt: 0,
      s_liflen: 90,
      s_notes: 28.497925,
      s_opstyle: 2,
      s_pace: 0,
      s_sdlen: 258,
      s_sdtype: 1,
      s_sorttype: 0,
      s_sub_gno: 0,
      s_timing: 1,
      s_timing_split: 1,
      s_tsujigiri_disp: 0,
      s_visualization: 0,
      sach: 49,
      sp_opt: 17180950528,
      spnum: 2,
      cardid: id,
    };

    return Object.fromEntries(
      Object.entries(data).map(v => ['$' + v[0], v[1]])
    );
  }
}
