import { IsEnum, IsOptional, IsString } from 'class-validator';
import { VisitorStyleEnum } from '../enum/visitor-style.enum';

export class OptionVisitorDto {
  @IsEnum(VisitorStyleEnum)
  @IsOptional()
  style: VisitorStyleEnum;
  @IsString()
  @IsOptional()
  iconColor: string;
  @IsString()
  @IsOptional()
  labelColor: string;
}
