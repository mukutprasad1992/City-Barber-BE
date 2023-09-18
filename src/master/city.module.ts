import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schemas/city.schema';
import { CityController } from './controller/city.controller';
import { CityService } from './services/city.service';

@Module({
  imports: [
   
  MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  controllers: [CityController],
  providers: [ CityService],
})
export class CityModule { }
