import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateController } from './controller/state.controller';
import { StateService } from './services/state.service';
import { State, StateSchema } from './schemas/state.schema';

@Module({
  imports: [
   
  MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
  ],
  controllers: [StateController],
  providers: [ StateService],
})
export class StateModule { }
