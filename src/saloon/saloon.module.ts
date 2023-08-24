import { Module } from '@nestjs/common';
import { SaloonController } from './controllers/saloon.controller';
import { SaloonService } from './services/saloon.service';
import { Saloon, SaloonSchema } from "../schemas/saloon.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadService } from '../../utils/file-upload/file-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Saloon.name, schema: SaloonSchema }]),
    SaloonModule],
  controllers: [SaloonController],
  providers: [SaloonService, FileUploadService]
})
export class SaloonModule { }
