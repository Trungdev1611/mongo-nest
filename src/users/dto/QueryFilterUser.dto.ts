import { IsOptional, IsString } from "class-validator";
import { PaginateAndFilterDto } from "src/common/PaginateAndFilter.dto";

export class QueryFilterUserDTO extends PaginateAndFilterDto {
    @IsString()
    @IsOptional()
    username: string
}
