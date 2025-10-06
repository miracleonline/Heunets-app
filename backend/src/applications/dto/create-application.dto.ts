import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  readonly applicantName: string;

  @IsString()
  @IsNotEmpty()
  readonly course: string;

  @IsString()
  @IsOptional()
  readonly status?: string;

  @IsString()
  @IsNotEmpty()
  readonly message: string;
}
