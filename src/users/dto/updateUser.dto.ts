import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDto {
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsOptional()
    displayName?: string;
  
    @IsString()
    @IsOptional()
    avatarUrl?: string;
}
