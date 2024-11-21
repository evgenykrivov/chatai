import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(25, {
    message: 'Maximum length equals 25 symbols',
  })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({
    minLength: 3,
    maxLength: 50,
  })
  password: string;
}
