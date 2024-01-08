import { singleton } from "tsyringe";
import { Context, ILaochanService } from "../types.js";
import dedent from 'dedent-js'
import { to_bin } from "@kamyu/kbinxml";

@singleton()
export class DefaultService implements ILaochanService {
  async process(ctx: Context) {
    const tmp = ctx.service.split('.');
    const module = tmp[0];
    const method = tmp[1];

    const xml = dedent`
      <?xml version="1.0" encoding="SHIFT_JIS"?>
      <response>
        <${module} method="${method}" status="0"/>
      </response>
    `;

    return Buffer.from(to_bin(xml).data);
  }
}
