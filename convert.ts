export async function convertToGif({
  inputPath,
  outputPath,
  startTime,
  duration,
  scale,
  cropOption,
  ffmpegPath = 'ffmpeg',
}: {
  inputPath: string;
  outputPath: string;
  startTime: number;
  duration: number;
  scale: number;
  cropOption: 'cima' | 'baixo' | 'completo' | string;
  ffmpegPath?: string;
}) {
  const palettePath = 'palette.png';

  let cropFilter = '';
  switch ((cropOption ?? '').toLowerCase()) {
    case 'cima':
      cropFilter = ',crop=in_w:in_h/2:0:0';
      break;
    case 'baixo':
      cropFilter = ',crop=in_w:in_h/2:0:in_h/2';
      break;
    case 'completo':
    default:
      cropFilter = '';
      break;
  }

  const vfBase = `fps=15,scale=${scale}:-1:flags=lanczos${cropFilter}`;

  const paletteArgs = [
    '-ss',
    String(startTime),
    '-t',
    String(duration),
    '-i',
    inputPath,
    '-vf',
    `${vfBase},palettegen`,
    '-y',
    palettePath,
  ];

  const paletteCmd = new Deno.Command(ffmpegPath, {
    args: paletteArgs,
    stdout: 'inherit',
    stderr: 'inherit',
  });

  const paletteStatus = await paletteCmd.spawn().status;
  if (!paletteStatus.success) {
    console.error('Erro ao gerar a paleta de cores.');
    return;
  }

  const gifArgs = [
    '-ss',
    String(startTime),
    '-t',
    String(duration),
    '-i',
    inputPath,
    '-i',
    palettePath,
    '-filter_complex',
    `${vfBase}[x];[x][1:v]paletteuse`,
    '-y',
    outputPath,
  ];

  const gifCmd = new Deno.Command(ffmpegPath, {
    args: gifArgs,
    stdout: 'inherit',
    stderr: 'inherit',
  });

  const gifStatus = await gifCmd.spawn().status;

  if (gifStatus.success) {
    console.log(`GIF criado com sucesso: ${outputPath}`);
    try {
      await Deno.remove(palettePath);
    } catch (err) {
      console.warn('Aviso: não foi possível remover palette.png', err);
    }
  } else {
    console.error('Erro na criação do GIF.');
  }
}
