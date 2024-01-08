import { Next } from "koa";
import { Context } from "../types.js";
import { to_xml } from "@kamyu/kbinxml";
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true,
  attributeNamePrefix: '$',
  removeNSPrefix: true,
  allowBooleanAttributes: true,
});

function parseValue(node: any) {
  const isArray = '$__count' in node;

  if (['s8', 'u8', 's16', 'u16', 's32', 'u32', 's64', 'u64', 'float', 'double'].includes(node.$__type)) {
      if (isArray) {
        return node['#text'].split(' ').map(v => new Number(v));
      }

      return new Number(node['#text']);
  }

  if(['b', 'bool'].includes(node.$__type)) {
    return !!parseInt(node['#text']);
  }

  if (['bin', 'binary'].includes(node.$__type)) {
    return Buffer.from(node['#text'], 'hex')
  }

  if(['ip4', 'str', 'string'].includes(node.$__type)) {
    return node['#text'];
  }

  if(node.$__type == 'time') {
    return new Date(parseInt(node['#text']) * 1000);
  }

  return {
    type: node.$__type,
    value: node['#text'],
  }
}

function kxmlToObject(node: any) {
  if (node instanceof Array) {
    return node.map(v => kxmlToObject(v));
  }

  if ('$__type' in node) {
    return parseValue(node);
  }

  const obj: object = {};

  for (const key in node) {
    if (key == '?xml') continue;
    const value = node[key];

    if (key.startsWith('$')) {
      obj[key.substring(1)] = value;
      continue;
    }

    obj[key] = kxmlToObject(node[key]);
  }

  return obj;
}

export async function parseKxml(ctx: Context, next: Next) {
  if (!(ctx.request.body instanceof Buffer)) {
    return next();
  }

  if ('x-dev' in ctx.request.headers) {
    ctx.request.body = JSON.parse(ctx.request.body.toString('utf-8'));
  } else {
    const xmlResult = to_xml(ctx.request.body);
    ctx.request.body = kxmlToObject(parser.parse(xmlResult.data));
  }

  const body = ctx.request.body as any;

  if ('call' in body) {
    ctx.pcbid = body.call.srcid;
  }

  return next();
}
