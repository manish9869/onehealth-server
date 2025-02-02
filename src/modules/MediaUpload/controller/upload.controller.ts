import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { unlink } from "fs";
import { diskStorage } from "multer";
import { FILE_FOLDERS } from "src/common/common";

@Controller("media")
export class UploadsController {
  @Post("upload")
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: FILE_FOLDERS.MEDIA_FILES,
        filename: (req, file, cb) => {
          console.log("file", file);
          const timestamp = new Date().getTime(); // Create timestamp for unique filenames
          const fileExtension = file.originalname.split(".").pop(); // Extract file extension
          const filename = `${timestamp}.${fileExtension}`; // Create filename
          cb(null, filename);
        },
      }),
    })
  )
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log("files", files);
    if (files.length > 0) {
      const SERVER_URL = process.env.SERVER_URL;
      const uploadedFiles = files.map((file) => ({
        filename: file.filename,
        path: `${SERVER_URL}/${FILE_FOLDERS.SERVER_LOCATION}/${file.filename}`,
        extension: file.originalname.split(".").pop(),
      }));
      return uploadedFiles;
    } else {
      return { message: "No File Selected" };
    }
  }

  @Delete(":filename")
  async deleteFile(@Param("filename") filename: string) {
    try {
      const filePath = `${FILE_FOLDERS.MEDIA_FILES}/${filename}`;
      return new Promise((resolve, reject) => {
        unlink(filePath, (error) => {
          if (error) {
            reject({ error: "Failed to delete file", details: error.message });
          } else {
            resolve({ message: "File deleted successfully" });
          }
        });
      });
    } catch (error) {
      return { error: "Failed to delete file", details: error };
    }
  }
}
