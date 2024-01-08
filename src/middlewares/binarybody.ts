import { Next } from 'koa';
import { Context } from '../types.js';

export async function binaryBody(ctx: Context, next: Next): Promise<any> {
  if (typeof ctx.headers['content-length'] !== 'string') {
    return next();
  }

  const length = parseInt(ctx.headers['content-length']);
  if (length === 0) {
    return next();
  }

  ctx.request.body = await new Promise((resolve, reject) => {
    const buffer = Buffer.allocUnsafe(length);
    let len = 0;

    ctx.req.on('data', (chunk: Buffer) => {
      chunk.copy(buffer, len);
      len += chunk.length;

      if (len == length) {
        resolve(buffer);
      }
    });

    ctx.req.on('close', () => {
      if (len < length) {
        reject(new Error('socket hanged up unexceptly.'));
      }
    });
  });

  return next();
}
