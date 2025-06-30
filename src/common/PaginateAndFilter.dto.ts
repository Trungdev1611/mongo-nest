import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginateAndFilterDto {
@IsOptional()
@Type(() => Number)
  page: number = 1;

@IsOptional()
@Type(() => Number)
pageSize: number = 10

@IsOptional()
filter: Record<string, any> = {}
}
