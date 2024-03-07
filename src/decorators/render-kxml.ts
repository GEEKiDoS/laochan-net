import pug from 'pug';
import { to_bin } from '@kamyu/kbinxml';

export function kxmlTemplate(
  templatePath: string,
  encoding: 'UTF-8' | 'SHIFT_JIS' = 'UTF-8',
): MethodDecorator {
  const template = pug.compileFile('templates/' + templatePath + '.pug');

  return function (_target, _propertyKey, descriptor) {
    const orig = descriptor.value as Function;
    descriptor.value = async function (...args: any[]) {
      const obj = await orig.apply(this, args);
      const xml =
        `<?xml version="1.0" encoding="${encoding}"?>` + template(obj);
      const kxml = to_bin(xml);

      return Buffer.from(kxml.data);
    } as unknown as any;
  };
}
