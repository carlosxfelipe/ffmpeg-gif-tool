# Conversor de Vídeo para GIF

Este projeto converte um trecho de um vídeo em um arquivo GIF utilizando o FFmpeg.

## Requisitos

- [Deno](https://deno.com/) instalado (\>= 1.40)
- [FFmpeg](https://ffmpeg.org/) instalado e disponível no `PATH`\
  (se preferir, você pode passar o caminho absoluto do `ffmpeg` no código)

## Como usar

1. Clone o repositório.

2. Execute o script principal com as permissões necessárias:

   ```bash
   deno task start
   ```

3. Insira os dados solicitados no terminal:

   - **Nome do arquivo de vídeo** (com extensão)
   - **Tempo inicial** -- em segundos (ex: `2`)
   - **Duração** -- em segundos (ex: `6`)
   - **Largura do GIF** -- a altura será ajustada automaticamente
   - **Recorte** -- escolha entre:
     - `completo` (padrão)
     - `cima` (metade superior)
     - `baixo` (metade inferior)

## Observações

- A duração final do GIF pode ser **menor do que a solicitada** por alguns motivos:
  - Se o vídeo original tiver uma **duração menor** que a informada.
  - Se o vídeo tiver uma **baixa taxa de quadros (FPS)**, e você estiver gerando um GIF com
    `fps=15`, o FFmpeg pode repetir ou eliminar quadros para manter a fluidez, resultando em um GIF
    mais curto.
  - GIFs não mantêm controle exato de tempo como vídeos; a **duração é baseada na quantidade de
    quadros e no intervalo entre eles**.

Se quiser um GIF com duração mais próxima do original, ajuste o `fps` do filtro para combinar com o
do vídeo de entrada.

## Licença

MIT
