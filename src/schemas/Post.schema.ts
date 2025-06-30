import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Post {
    @Prop({required: true})
    title: string

    @Prop()
    content: string


}
export const PostSchema = SchemaFactory.createForClass(Post)
export type PostDocument = Post & Document;
export type PostTypeLean = {
    title: string,
    content: string
}