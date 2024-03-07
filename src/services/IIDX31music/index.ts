import { kxml } from "../../decorators/to-kxml.js";

export default class {
    @kxml()
    async crate() {
        return {
            IIDX31music: {
                $expire: 1800,
                c: [
                    // {
                    //     $__type: 's32',
                    //     $mid: 11451,
                    //     __value: new Array(20).fill(-1),
                    // }
                ],
            }
        };
    }
}