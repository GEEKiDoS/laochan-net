import { kxml } from "../../decorators/to-kxml.js";
import { Context } from "../../types.js";

interface CardInquire {
    cardid: string,
    cardtype: string,
}

interface CardAuth {
    pass: string,
    refid: string,
}

export default class {
    @kxml()
    inquire(ctx: Context) {
        const { cardid, cardtype } = ctx.body as CardInquire;
        ctx.logger.info('card %s (type %d) inquire', cardid, cardtype);

        return {
            cardmng: {
                $binded: 1,
                $dataid: cardid,
                $ecflag: 1,
                $expired: 0,
                $method: 'inquire',
                $newflag: 0,
                $refid: cardid,
                $status: 0,
            }
        };
    }

    @kxml()
    authpass(ctx: Context) {
        const { refid, pass } = ctx.body as CardAuth;
        ctx.logger.info('auth %s with pass %s', refid, pass);
        
        return {
            $cardmng: {
                method: 'authpass',
                status: 0,
            }
        };
    }
}
