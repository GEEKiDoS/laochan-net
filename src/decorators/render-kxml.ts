import pug from 'pug';
import { to_bin } from "@kamyu/kbinxml";

export function kxml(templatePath: string): MethodDecorator {
  const template = pug.compileFile('templates/' + templatePath + '.pug');

  return function (_target, _propertyKey, descriptor) {
    const orig = descriptor.value as Function;
    descriptor.value = async function (...args: any[]) {
      const obj = await orig.apply(this, args);
      const xml = '<?xml version="1.0" encoding="SHIFT_JIS"?>' + template(obj);
      console.log(xml);
      const kxml = to_bin(xml);

      return Buffer.from(kxml.data);
    } as unknown as any;
  }
}
