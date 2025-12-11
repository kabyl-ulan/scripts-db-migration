import { UploadedFile } from "express-fileupload";

import File from "../utils/file";
import { resizeImage } from "../utils/image";

async function saveFile(filePath: string, sampleFile: UploadedFile) {
  try {
    await sampleFile.mv(filePath);
    return true;
  } catch (error: unknown) {
    console.error("❌ error FileService.saveFile: ", (error as Error).message);
    return false;
  }
}

async function saveImage(filePath: string, fileData: Buffer, width = 300) {
  const isSave = await resizeImage({
    input: fileData,
    outputPath: filePath,
    width,
  });
  return isSave;
}

async function removeFile(filePath: string) {
  File.deleteFile(filePath);
}

const FileService = {
  saveFile,
  saveImage,
  removeFile,
};

export default FileService;
