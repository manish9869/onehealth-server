import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { UploadsController } from "./controller/upload.controller";
import { FILE_FOLDERS } from "src/common/common";

@Module({
  imports: [
    MulterModule.register({
      dest: FILE_FOLDERS.MEDIA_FILES, // Destination folder for uploaded files
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}
