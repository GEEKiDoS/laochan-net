import { Next } from "koa";
import { Context } from "../types.js";
import { rc4Transfrom } from "../utils/rc4.js";

export async function crypto(ctx: Context, next: Next) {
  if (typeof ctx.req.headers['x-eamuse-info'] !== 'string') {
    return next();
  }

  if (!(ctx.request.body instanceof Buffer)) {
    return next();
  }

  {
    const eamuseInfo: string[] = ctx.req.headers['x-eamuse-info'].split('-');
    const version = eamuseInfo[0];
    const time = eamuseInfo[1];
    const salt = eamuseInfo[2];

    if (version !== '1') {
      throw new Error(`unsupported crypto version ${version}`);
    }

    const decrypted = rc4Transfrom(time + salt, ctx.request.body);
    ctx.request.body = decrypted;
  }

  await next();

  if (!(ctx.body instanceof Buffer)) {
    return;
  }

  const time = Math.floor(new Date().valueOf() / 1000).toString(16).padStart(8, '0');
  const salt = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');

  const encrypted = rc4Transfrom(time + salt, ctx.body);
  ctx.body = encrypted;

  ctx.set('X-Eamuse-Info', `1-${time}-${salt}`);
}
