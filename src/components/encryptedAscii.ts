export const ENCRYPTED_SCAN_CHARS = Array.from(
  '@#%&$><|/\\+=01ABCDEF!"#$%&' + "'" + '()*+,-./:;<=>?@[\\]^_' + String.fromCharCode(96) + '{|}~',
);

// Shared canvas renderer for the Mission Log transition and the end-of-page vault.
export function drawEncryptedAsciiGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
) {
  ctx.clearRect(0, 0, width, height);

  const fontSize = 14;
  const columnWidth = fontSize * 0.65;
  const columns = Math.ceil(width / columnWidth);
  const rows = Math.ceil(height / fontSize);

  ctx.font = fontSize + "px 'Roboto Mono', 'Courier New', monospace";
  ctx.textBaseline = 'top';

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = column * columnWidth;
      const y = row * fontSize;
      const centerX = columns / 2;
      const centerY = rows / 2;
      const distance = Math.sqrt(
        Math.pow((column - centerX) / columns, 2) + Math.pow((row - centerY) / rows, 2),
      );
      let alpha = 0;

      if (progress < 0.5) {
        const appearProgress = progress * 2;
        const noise = ((column * 17 + row * 31 + Math.floor(progress * 100)) % 100) / 100;
        if (noise < appearProgress) {
          alpha = 0.08 + appearProgress * 0.3;
          ctx.fillStyle = noise < appearProgress * 0.45
            ? 'rgba(223, 88, 56, ' + (alpha + 0.2) + ')'
            : 'rgba(228, 222, 215, ' + alpha + ')';
        }
      } else {
        const decryptProgress = (progress - 0.5) * 2;
        const characterDecrypt = Math.max(0, Math.min(1, decryptProgress * 1.8 - distance));
        if (characterDecrypt > 0.85) {
          const fadeOut = Math.max(0, 1 - (characterDecrypt - 0.85) * 6.5);
          ctx.fillStyle = 'rgba(223, 88, 56, ' + (fadeOut * 0.4) + ')';
          alpha = fadeOut;
        } else if (characterDecrypt > 0.3) {
          ctx.fillStyle = 'rgba(223, 88, 56, ' + (0.3 + characterDecrypt * 0.5) + ')';
          alpha = 1;
        } else {
          ctx.fillStyle = 'rgba(228, 222, 215, ' + (0.1 + Math.random() * 0.08) + ')';
          alpha = 1;
        }
      }

      if (alpha > 0.01) {
        const character = ENCRYPTED_SCAN_CHARS[Math.floor(Math.random() * ENCRYPTED_SCAN_CHARS.length)];
        ctx.fillText(character, x, y);
      }
    }
  }
}
