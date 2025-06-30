import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Post } from "./Post.schema";

@Schema()
export class Comment {
    @Prop({required: true})
    content: string

    @Prop({default: Date.now})
    created_at: Date
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
    post: Post

}

export const CommentSchema = SchemaFactory.createForClass(Comment)
export type CommentDocument = Comment & Document