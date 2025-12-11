import sharp from "sharp";

export interface ResizeOptions {
  /** Буфер исходного изображения */
  input: Buffer;
  /** Ширина выходного изображения (px) */
  width?: number;
  /** Высота выходного изображения (px) */
  height?: number;
  /** Путь к файлу без расширения, куда будет сохранён результат */
  outputPath: string;
}

/**
 * Выполняет ресайз/конверсию изображения через Sharp
 * @param options Параметры ресайза
 * @returns true при успехе, false при ошибке
 */
export async function resizeImage(options: ResizeOptions): Promise<boolean> {
  const { input, width, height, outputPath } = options;

  try {
    const destination = `${outputPath}`;
    await sharp(input)
      .resize(width, height, {
        fit: sharp.fit.outside,
        withoutEnlargement: true,
      })
      .toFile(destination);
    return true;
  } catch (error: unknown) {
    console.error("❌ resizeImage error:", (error as Error).message);
    return false;
  }
}

export default { resizeImage };
