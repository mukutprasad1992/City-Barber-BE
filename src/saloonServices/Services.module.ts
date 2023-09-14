import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Services, ServicesSchema } from 'src/schemas/services.schema';
import { ServicesController } from './controller/services.controller';
import { SaloonServices } from './service/services.service';

@Module({
  imports: [
   
  MongooseModule.forFeature([{ name: Services.name, schema: ServicesSchema }]),
  ],
  controllers: [ServicesController],
  providers: [ SaloonServices],
})
export class ServicesModule { }
