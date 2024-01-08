export function lz77Decode(data: Buffer): Buffer {
  let offset = 0;
  const output: number[] = [];

  while (offset < data.length) {
    const flag = data[offset];
    offset += 1;

    for (let bit = 0; bit < 8; bit++) {
      if (flag & (1 << bit)) {
        output.push(data[offset]);
        offset += 1;

      } else {
        if (offset >= data.length)
          break;

        const lookbackFlag = data.readUInt16BE(offset);
        const lookbackLength = (lookbackFlag & 0x000f) + 3;
        const lookbackOffset = lookbackFlag >> 4;

        offset += 2;
        if (lookbackFlag == 0)
          break;

        for (let i = 0; i < lookbackLength; i++) {
          let loffset = output.length - lookbackOffset;

          if (loffset <= 0 || loffset >= output.length) {
            output.push(0);
          } else {
            output.push(output[loffset]);
          }
        }
      }
    }
  }

  return Buffer.from(output);
}
