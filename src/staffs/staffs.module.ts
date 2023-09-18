import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Services, ServicesSchema } from 'src/schemas/services.schema';
import { StaffsController } from './controller/staffs.controller';
import { StaffsService } from './service/satffs.servic';
import { Staffs, StaffsSchema } from 'src/schemas/staffs.schema';

@Module({
  imports: [
   
  MongooseModule.forFeature([{ name: Staffs.name, schema: StaffsSchema }]),
  ],
  controllers: [StaffsController],
  providers: [ StaffsService],
})
export class StaffsModule { }
