import fs from 'fs';
import path from 'path';

// Minimal standalone GIF89a encoder in pure JavaScript (no external npm dependencies needed)
class GifEncoder {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.frames = [];
  }

  addFrame(pixels, palette, delayMs = 100) {
    this.frames.push({ pixels, palette, delay: Math.round(delayMs / 10) });
  }

  encode() {
    const buffer = [];
    const writeString = (str) => {
      for (let i = 0; i < str.length; i++) buffer.push(str.charCodeAt(i));
    };
    const writeWord = (val) => {
      buffer.push(val & 0xff, (val >> 8) & 0xff);
    };

    // Header: GIF89a
    writeString('GIF89a');

    // Logical Screen Descriptor
    writeWord(this.width);
    writeWord(this.height);
    const globalPalette = this.frames[0].palette;
    const colorTableSize = Math.max(2, Math.ceil(Math.log2(globalPalette.length)));
    const actualPaletteSize = 1 << colorTableSize;
    
    // GCT Flag: 1, Color Res: 7, Sort: 0, Size: colorTableSize - 1
    buffer.push(0x80 | 0x70 | (colorTableSize - 1));
    buffer.push(0); // Background Color Index
    buffer.push(0); // Pixel Aspect Ratio

    // Global Color Table
    for (let i = 0; i < actualPaletteSize; i++) {
      if (i < globalPalette.length) {
        const [r, g, b] = globalPalette[i];
        buffer.push(r, g, b);
      } else {
        buffer.push(0, 0, 0);
      }
    }

    // Netscape Application Extension for infinite looping
    buffer.push(0x21, 0xff, 0x0b);
    writeString('NETSCAPE2.0');
    buffer.push(0x03, 0x01);
    writeWord(0); // loop count = 0 (infinite)
    buffer.push(0x00);

    // Encode each frame
    for (const frame of this.frames) {
      // Graphic Control Extension
      buffer.push(0x21, 0xf9, 0x04);
      buffer.push(0x04); // Disposal method: do not dispose
      writeWord(frame.delay); // Delay time
      buffer.push(0x00); // Transparent color index
      buffer.push(0x00); // Block terminator

      // Image Descriptor
      buffer.push(0x2c);
      writeWord(0); // Left
      writeWord(0); // Top
      writeWord(this.width);
      writeWord(this.height);
      buffer.push(0x00); // No local color table

      // LZW Compression (simple uncompressed/flat stream LZW)
      const minCodeSize = Math.max(2, colorTableSize);
      buffer.push(minCodeSize);

      // Write sub-blocks of pixel data
      const clearCode = 1 << minCodeSize;
      const eoiCode = clearCode + 1;
      
      const subBlock = [];
      const flushBlock = () => {
        if (subBlock.length > 0) {
          buffer.push(subBlock.length, ...subBlock);
          subBlock.length = 0;
        }
      };

      // Simple uncompressed LZW bit packer
      let curBit = 0;
      let curVal = 0;
      let codeSize = minCodeSize + 1;
      let nextCode = eoiCode + 1;

      const emitCode = (code) => {
        curVal |= (code << curBit);
        curBit += codeSize;
        while (curBit >= 8) {
          subBlock.push(curVal & 0xff);
          if (subBlock.length === 254) flushBlock();
          curVal >>= 8;
          curBit -= 8;
        }
      };

      emitCode(clearCode);

      for (let i = 0; i < frame.pixels.length; i++) {
        emitCode(frame.pixels[i]);
        if (nextCode < 4096) {
          nextCode++;
          if (nextCode > (1 << codeSize) && codeSize < 12) {
            codeSize++;
          }
        } else {
          emitCode(clearCode);
          codeSize = minCodeSize + 1;
          nextCode = eoiCode + 1;
        }
      }

      emitCode(eoiCode);
      if (curBit > 0) {
        subBlock.push(curVal & 0xff);
      }
      flushBlock();
      buffer.push(0x00); // Block terminator
    }

    // Trailer
    buffer.push(0x3b);
    return Buffer.from(buffer);
  }
}

// Generate an animated 8-frame 128x128 DomoSkills Mascot GIF
function generateMascotGif() {
  const W = 128;
  const H = 128;
  const encoder = new GifEncoder(W, H);

  // Palette: [0: Black, 1: Dark Gray, 2: Mid Gray, 3: Light Gray, 4: White, 5: Cyan Glow, 6: Eye Black, 7: Mouth Red/Dark]
  const palette = [
    [5, 5, 5],       // 0: #050505 background
    [18, 18, 18],    // 1: Body dark surface
    [38, 38, 38],    // 2: Body border/accent
    [100, 100, 100], // 3: Highlight line
    [255, 255, 255], // 4: White teeth / text
    [0, 240, 255],   // 5: Cyan terminal glow
    [0, 0, 0],       // 6: Deep eye black
    [15, 15, 20],    // 7: Mouth interior
  ];

  const totalFrames = 12;

  for (let f = 0; f < totalFrames; f++) {
    const pixels = new Uint8Array(W * H).fill(0);

    const setPixel = (x, y, colorIdx) => {
      if (x >= 0 && x < W && y >= 0 && y < H) {
        pixels[y * W + x] = colorIdx;
      }
    };

    const fillRect = (x, y, w, h, colorIdx) => {
      for (let py = y; py < y + h; py++) {
        for (let px = x; px < x + w; px++) {
          setPixel(px, py, colorIdx);
        }
      }
    };

    // Bobbing / breathing animation
    const bob = Math.round(Math.sin((f / totalFrames) * Math.PI * 2) * 2);
    const bodyTop = 26 + bob;
    const bodyW = 68;
    const bodyH = 74;
    const bodyLeft = (W - bodyW) / 2;

    // Body shadow
    fillRect(bodyLeft + 6, 106, bodyW - 12, 4, 1);

    // Feet
    fillRect(bodyLeft + 12, bodyTop + bodyH - 4, 16, 12 - bob, 2);
    fillRect(bodyLeft + bodyW - 28, bodyTop + bodyH - 4, 16, 12 - bob, 2);

    // Arms
    fillRect(bodyLeft - 8, bodyTop + 24, 8, 32, 2);
    fillRect(bodyLeft + bodyW, bodyTop + 20 - bob * 2, 8, 32, 2); // waving right arm!

    // Floating Skill Cube in Right Hand
    const cubeY = bodyTop + 10 - bob * 3;
    const cubeX = bodyLeft + bodyW + 4;
    fillRect(cubeX, cubeY, 16, 16, 2);
    fillRect(cubeX + 2, cubeY + 2, 12, 12, 1);
    // Draw `< >` in cube
    setPixel(cubeX + 5, cubeY + 7, 5);
    setPixel(cubeX + 4, cubeY + 8, 5);
    setPixel(cubeX + 5, cubeY + 9, 5);
    setPixel(cubeX + 9, cubeY + 7, 5);
    setPixel(cubeX + 10, cubeY + 8, 5);
    setPixel(cubeX + 9, cubeY + 9, 5);

    // Main Body Block (Domo-kun rectangular silhouette)
    fillRect(bodyLeft, bodyTop, bodyW, bodyH, 1);
    // Outer border
    for (let x = bodyLeft; x < bodyLeft + bodyW; x++) {
      setPixel(x, bodyTop, 3);
      setPixel(x, bodyTop + bodyH - 1, 2);
    }
    for (let y = bodyTop; y < bodyTop + bodyH; y++) {
      setPixel(bodyLeft, y, 3);
      setPixel(bodyLeft + bodyW - 1, y, 2);
    }

    // Domo Eyes (Blink at frames 4 & 5)
    const isBlinking = f === 4 || f === 5;
    const eyeY = bodyTop + 14;
    if (isBlinking) {
      fillRect(bodyLeft + 14, eyeY + 2, 8, 2, 4);
      fillRect(bodyLeft + bodyW - 22, eyeY + 2, 8, 2, 4);
    } else {
      fillRect(bodyLeft + 14, eyeY, 6, 6, 6);
      fillRect(bodyLeft + bodyW - 20, eyeY, 6, 6, 6);
      setPixel(bodyLeft + 15, eyeY + 1, 4); // eye gleam
      setPixel(bodyLeft + bodyW - 19, eyeY + 1, 4);
    }

    // Domo Iconic Rectangular Open Mouth
    const mouthLeft = bodyLeft + 10;
    const mouthTop = bodyTop + 26;
    const mouthW = bodyW - 20;
    const mouthH = 32;
    fillRect(mouthLeft, mouthTop, mouthW, mouthH, 7);

    // Sawtooth White Teeth (Top and Bottom)
    const toothCount = 5;
    const toothW = Math.floor(mouthW / toothCount);
    for (let t = 0; t < toothCount; t++) {
      const tx = mouthLeft + t * toothW;
      // Top tooth (pointing down)
      fillRect(tx + 1, mouthTop, toothW - 2, 4, 4);
      setPixel(tx + 2, mouthTop + 4, 4);

      // Bottom tooth (pointing up)
      fillRect(tx + 1, mouthTop + mouthH - 4, toothW - 2, 4, 4);
      setPixel(tx + 2, mouthTop + mouthH - 5, 4);
    }

    // Terminal prompt inside mouth: `> _` (blinking cursor)
    const promptY = mouthTop + 14;
    const promptX = mouthLeft + 12;
    // `>` symbol
    setPixel(promptX, promptY - 2, 4);
    setPixel(promptX + 1, promptY - 1, 4);
    setPixel(promptX + 2, promptY, 4);
    setPixel(promptX + 1, promptY + 1, 4);
    setPixel(promptX, promptY + 2, 4);

    // Blinking cursor `_`
    if (f % 4 < 2) {
      fillRect(promptX + 6, promptY + 2, 6, 2, 5); // cyan glowing cursor!
    }

    encoder.addFrame(pixels, palette, 100);
  }

  const gifBuffer = encoder.encode();
  const outPath = path.resolve('apps/web/public/assets/domoskills-mascot.gif');
  fs.writeFileSync(outPath, gifBuffer);
  console.log(`Generated Animated GIF Mascot saved to ${outPath} (${gifBuffer.length} bytes)!`);
}

generateMascotGif();
