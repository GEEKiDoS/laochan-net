import { kxml } from "../../decorators/render-kxml.js";
import { ILaochanService } from "../../types.js";
import { singleton } from "tsyringe";

@singleton()
export default class implements ILaochanService {
  @kxml('facility/get')
  async process() {
    return {
      status: 0,
      location: {
        id: 'EA000000',
        type: 0,
        country: 'JP',
        region: 'JP-0',
        name: 'LaoChan Test',
        countryName: 'LaoChan',
        countryJName: '老禅',
        regionName: 'BianYu',
        regionJName: '變魚',
        customerCode: 'LaoChan',
        companyCode: 'LaoChan',
        latitude: 0,
        longitude: 0,
        accuracy: 0,
      },
      line: {
        id: '0',
        class: 8,
        upClass: 8,
        rtt: 22,
      },
      portfw: {
        globalIp: '127.0.0.1',
        globalPort: 5700,
        privatePort: 5700,
      },
      public: {
        flag: 0,
        name: 'LaoChan Test',
        latitude: '0',
        longitude: '0',
      },
      share: {
        url: '老禅 LaoChan LaoChan 老禅',
        eapass: 365,
        eacoin: {
          notchAmount: 0,
          notchCount: 0,
          supplyLimit: 100000,
        }
      },
      calendar: {
        year: 2024,
        holiday: [0, 1, 8, 41, 53, 79, 118, 122, 123, 124, 197, 222, 260, 265, 281, 306, 326, 365, 372, 406, 407, 418, 444, 484, 488, 489, 490, 491, 561, 588, 589, 624, 630, 631, 652, 672, 673, 692],
      }
    };
  }
}
