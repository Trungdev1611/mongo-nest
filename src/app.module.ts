import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { PostModule } from './post/Post.module';
console.log(`process.env.MONGODB_URI`, process.env.MONGODB_URI)
@Module({
  //mongoose.connect('mongodb://username:password@host:port/database?options...'); 27017 is default
  imports: [
       MongooseModule.forRoot('mongodb://localhost:27017/nest?replicaSet=rs0'),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
