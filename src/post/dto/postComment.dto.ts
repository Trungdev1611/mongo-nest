import { IsOptional } from "class-validator"

export class PostCommentDTOFilter {
    @IsOptional()
    search: string

    @IsOptional()
    content: string
  
    @IsOptional()
    title: string
}