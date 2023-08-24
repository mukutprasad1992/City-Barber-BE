import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { ResetPasswordDto } from '../dto/resetPassword.dto';


@Injectable()
export class ResetPasswordService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
      ) {}
      async reset(resetPasswordDto: ResetPasswordDto): Promise<any> {
        const { email, password ,newPassword ,confirmNewPassword} = resetPasswordDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatched) {
          throw new UnauthorizedException('Invalid Current password');
        }
        if (newPassword!=confirmNewPassword){
            {
                throw new UnauthorizedException('Password MissMatch');
            }
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.save();
        return user;
      }


}
