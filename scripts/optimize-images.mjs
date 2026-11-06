import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const targets = [
  { dir: 'src/assets/landing', width: 1920 },
  { dir: 'src/assets/shop', width: 800 },
];

for (const { dir, width } of targets) {
  const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const input = path.join(dir, file);
    const output = input.replace(/\.(jpe?g|png)$/i, '.webp');
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(output);
    console.log(`${input} -> ${output}`);
  }
}