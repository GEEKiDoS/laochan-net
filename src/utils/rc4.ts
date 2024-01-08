import { createHash } from 'crypto';
import rc4 from 'arc4';

const EAMUSE_RC4_KEY = '69D74627D985EE2187161570D08D93B12455035B6DF0D8205DF5';

export function rc4Transfrom(keyHex: string, data: Buffer): Buffer {
  const key = createHash('md5')
    .update(keyHex + EAMUSE_RC4_KEY, 'hex')
    .digest();

  return rc4('arc4', key).encodeBuffer(data);
}
