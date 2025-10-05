import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString() name: string;

  @IsEmail() email: string;

  @IsString() @MinLength(6) password: string;

  @IsIn(['contributor','volunteer']) role: 'contributor'|'volunteer';
}
