import { singleton } from 'tsyringe';
import config from '../../utils/config.js';
import { kxml } from '../../decorators/to-kxml.js';

@singleton()
export default class {
  @kxml()
  async get() {
    const selfServices = [
      'services', 'dlstatus', 'cardmng',
      'eacoin', 'userdata', 'userid', 'pcbtracker', 'pcbevent',
      'message', 'facility', 'apsmanager', 'sidmgr', 'package',
      'uploaders', 'local', 'local2', 'lobby',
    ]

    return {
      services: {
        $expire: 43200,
        $method: 'get',
        $mode: 'operation',
        $product_domain: 1,
        $statuc: 0,
        item: [
          {
            $name: 'keepalive',
            $url: 'ping://127.0.0.1/?pa=127.0.0.1&ia=127.0.0.1&ga=127.0.0.1ma=127.0.0.1&t1=2&t2=15&rt=2',
          },
          {
            $name: 'ntp',
            $url: config.ntpUrl,
          },
          ...selfServices.map(v => ({
            $name: v,
            $url: config.selfUrl,
          }))
        ]
      }
    }
  }
}
