import { Next } from 'koa';
import { Context } from '../types.js';
import { lz77Decode } from '../utils/lz77.js';

export async function decompress(ctx: Context, next: Next): Promise<any> {
  if (!(ctx.request.body instanceof Buffer)) {
    return next();
  }

  if (typeof ctx.request.headers['x-compress'] !== 'string') {
    return next();
  }

  // no compression for response
  ctx.set('X-Compress', 'none');

  if (ctx.request.headers['x-compress'] == 'none') {
    return next();
  }

  if (ctx.request.headers['x-compress'] != 'lz77') {
    throw new Error('unsupported compression mehotd');
  }

  ctx.request.body = lz77Decode(ctx.request.body);
  return next();
}
