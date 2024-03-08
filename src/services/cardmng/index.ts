import { serviceKxml } from "../../decorators/to-kxml.js";
import { Context } from "../../types.js";

interface CardInquire {
  cardid: string,
  cardtype: string,
}

interface CardAuth {
  pass: string,
  refid: string,
}

interface GetRefId {
  cardid: string,
  passwd: string;
}

const resp = serviceKxml('cardmng');

export default class {
  @resp('authpass')
  authpass(ctx: Context) {
    const { refid, pass } = ctx.body as CardAuth;
    ctx.logger.info('auth %s with pass %s', refid, pass);

    return {
      $status: 0,
    };
  }

  @resp('getrefid')
  getrefid(ctx: Context) {
    const { cardid, passwd } = ctx.body as GetRefId;
    ctx.logger.info('registering %s with passwd %s.', cardid, passwd);

    return {
      $dataid: cardid,
      $refid: cardid,
    }
  }

  @resp('inquire')
  inquire(ctx: Context) {
    const { cardid, cardtype } = ctx.body as CardInquire;
    ctx.logger.info('card %s (type %d) inquire', cardid, cardtype);

    return {
      $binded: 1,
      $newflag: 0,
      $ecflag: 1,
      $expired: 0,
      $dataid: cardid,
      $refid: cardid,
      $status: 0,
    };
  }
}
