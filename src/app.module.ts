import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';

@Module({
  //mongoose.connect('mongodb://username:password@host:port/database?options...'); 27017 is default
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
