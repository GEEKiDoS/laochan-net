import _ from 'lodash';
import { to_bin } from '@kamyu/kbinxml';

function serializeValue(value: any, type: string): string {
    if (
        [
            's8',
            'u8',
            's16',
            'u16',
            's32',
            'u32',
            's64',
            'u64',
            'float',
            'double',
        ].includes(type)
    ) {
        return value.toString();
    }

    if (['b', 'bool'].includes('type')) {
        return value ? '1' : '0';
    }

    if (['bin', 'binary'].includes(type)) {
        if (!(value instanceof Buffer)) {
            throw new Error('binary with non-buffer value');
        }

        return value.toString('hex');
    }

    if (['ip4', 'str', 'string'].includes(type)) {
        return value;
    }

    if (type == 'time') {
        if (value instanceof Date) {
            return Math.floor(value.valueOf() / 1000).toString();
        }

        if (typeof value === 'number') {
            return value.toString();
        }

        throw new Error('time with not date or number');
    }

    throw new Error(`unsupported type ${type}`);
}

function serializeObject(obj: Object, name: string, linePrefix: string = '') {
    let output = `${linePrefix}<${name}`;

    const entries = Object.entries(obj);
    const attrs = entries
        .filter(v => v[0].startsWith('$'))
        .map(v => [v[0].substring(1), v[1]]);

    for (const attr of attrs) {
        output += ` ${attr[0]}="${_.escape(attr[1])}"`;
    }

    // handle kxml value shit
    const value = entries.find(v => v[0] == '__value');

    if (value && value[1] instanceof Array) {
        output += ` __count="${value[1].length}"`;
    }

    output += '>';

    if (value) {
        const type = attrs.find(v => v[0] == '__type');

        if (!type) {
            // or normal xml innerXml?
            throw new Error(`value with no type in ${name}`);
        }

        output += (value[1] instanceof Array ? value[1] : [value[1]])
            .map(v => serializeValue(v, type[1]))
            .join(' ');
    } else {
        const elements = entries
            .filter(v => !v[0].startsWith('$'));

        if (elements.length) {
            output += '\n';

            for (const element of elements) {
                if (element[1] instanceof Array) {
                    for (const item of element[1])
                        output += serializeObject(item, element[0], linePrefix + '  ');

                    continue;
                }

                output += serializeObject(element[1], element[0], linePrefix + '  ');
            }

            output += linePrefix;
        }
    }

    return output + `</${name}>\n`;
}

export function kxml(topName: string = 'response', encoding: 'UTF-8' | 'SHIFT_JIS' = 'UTF-8'): MethodDecorator {
    return function (_target, _propertyKey, descriptor) {
        const orig = descriptor.value as Function;
        descriptor.value = async function (...args: any[]) {
            const obj = await orig.apply(this, args);
            const xml =
                `<?xml version="1.0" encoding="${encoding}"?>` + serializeObject(obj, topName);
            const kxml = to_bin(xml);

            return Buffer.from(kxml.data);
        } as unknown as any;
    };
}


console.log(serializeObject({
    $attr: 'attr1',
    sb: {
        $attr: 'attr2',
        $__type: 'str',
        __value: 'sba',
    },
    sb1: {
        $attr: 'attr3',
        nested: {
            $attr: 'attr4',
            $__type: 's32',
            __value: [1, 1, 4, 5, 1, 4],
        }
    },
    array: [{
        $attr: 'test'
    }, {
        $attr: 'test2'
    }, {
        $attr: 'test3'
    }, {
        $attr: 'test4'
    }, {
        $attr: 'test5'
    }]
}, 'test'))

