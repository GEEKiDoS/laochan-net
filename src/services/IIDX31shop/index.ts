import { kxml } from "../../decorators/to-kxml.js";

export default class {
    @kxml()
    async getname() {
        return {
            IIDX31shop: {
                $cls_opt: 14400,
                $expire: 0,
                $opname: '原神, 启动',
                $pid: 30,
            }
        };
    }

    @kxml()
    async sentinfo() {
        return {
            IIDX31shop: {},
        };
    }
}
