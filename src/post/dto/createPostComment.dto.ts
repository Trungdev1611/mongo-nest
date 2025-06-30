import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreatePostCommentDTO {
    @IsNotEmpty()
    @IsString()
    content: string


}

export class PostCreateDTO {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string 

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostCommentDTO)
    comments: CreatePostCommentDTO[]
}