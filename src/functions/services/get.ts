import { kxml } from "../../decorators/render-kxml.js";
import { ILaochanService } from "../../types.js";
import { singleton } from "tsyringe";

@singleton()
export default class implements ILaochanService {
  @kxml('services/get')
  async process() {
    return {
      keepaliveUrl: 'ping://127.0.0.1/?pa=127.0.0.1&ia=127.0.0.1&ga=127.0.0.1ma=127.0.0.1&t1=2&t2=15&rt=2',
      ntpUrl: 'ntp://pool.ntp.org',
      selfUrl: 'http://localhost:10573',
    };
  }
}
