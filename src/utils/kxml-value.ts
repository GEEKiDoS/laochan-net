export type ValueTypes = 's8' |
  'u8' |
  's16' |
  'u16' |
  's32' |
  'u32' |
  's64' |
  'u64' |
  'float' |
  'double' |
  'b' | 'bool' |
  'bin' | 'binary' |
  'ip4' |
  'str' | 'string' |
  'time';

function vg(type: ValueTypes) {
  return (value: unknown, attrs?: object) => {
    const result = {
      $__type: type,
      __value: value,
    };

    if (attrs) {
      for (const key in attrs) {
        result['$' + key] = attrs[key];
      }
    }

    return attrs;
  };
}

export const v: Record<ValueTypes, (value: unknown, attrs?: object) => object> = {
  s8: vg('s8'),
  u8: vg('u8'),
  s16: vg('s16'),
  u16: vg('u16'),
  s32: vg('s32'),
  u32: vg('u32'),
  s64: vg('s64'),
  u64: vg('u64'),
  float: vg('float'),
  double: vg('double'),
  b: vg('b'),
  bool: vg('bool'),
  bin: vg('bin'),
  binary: vg('binary'),
  ip4: vg('ip4'),
  str: vg('str'),
  string: vg('string'),
  time: vg('time'),
}
