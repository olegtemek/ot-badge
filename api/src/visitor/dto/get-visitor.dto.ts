import { IsNotEmpty, IsString } from 'class-validator';

export class GetVisitorDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  repo: string;
}
