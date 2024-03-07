import { kxml } from "../../decorators/to-kxml.js";

export default class {
    @kxml()
    common() {
        return {
            IIDX31streaming: {
                $expire: Math.floor(new Date().valueOf() / 1000) + 259200,
                cm_info: {},
            }
        };
    }
}
