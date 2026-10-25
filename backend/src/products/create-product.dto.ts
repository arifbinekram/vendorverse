import { Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
  Max,
  MaxLength,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(160)
  title!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2048)
  @Matches(/^(https?:\/\/|\/images\/)[^\s]+$/i, {
    message: "image must be an http(s) URL or a path under /images/.",
  })
  image!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  imageBg?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  price!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  originalPrice!: number;

  @IsString()
  @MinLength(2)
  @MaxLength(80)
  @Matches(/[\p{L}\p{N}]/u)
  category!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/[\p{L}\p{N}]/u)
  vendorName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/[\p{L}\p{N}]/u)
  store!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  location!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  stockQuantity!: number;

  @IsOptional()
  @IsBoolean()
  isMall?: boolean;

  @IsOptional()
  @IsBoolean()
  freeDelivery?: boolean;

  @IsOptional()
  @IsBoolean()
  isFlashSale?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  soldPercent?: number;
}
