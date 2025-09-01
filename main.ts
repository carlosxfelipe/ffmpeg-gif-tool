import { convertToGif } from './convert.ts';
import { basename, dirname, extname, join } from 'jsr:@std/path';

async function main() {
  const inputPath = prompt('Nome do arquivo de vídeo: ');
  if (!inputPath) {
    console.error('Arquivo não informado.');
    return;
  }

  const startTimeStr = prompt('Segundos iniciais (ex: 2): ');
  const durationStr = prompt('Duração em segundos (ex: 6): ');
  const scaleStr = prompt('Largura (ex: 480): ');
  const cropOption = prompt('Recorte (cima, baixo, completo): ') ?? 'completo';

  const startTime = Number(startTimeStr);
  const duration = Number(durationStr);
  const scale = Number(scaleStr);

  if (
    isNaN(startTime) || isNaN(duration) || isNaN(scale)
  ) {
    console.error('Valores inválidos para tempo ou escala.');
    return;
  }

  const outputPath = join(
    dirname(inputPath),
    `${basename(inputPath, extname(inputPath))}.gif`,
  );

  await convertToGif({
    inputPath,
    outputPath,
    startTime,
    duration,
    scale,
    cropOption,
  });
}

main();
