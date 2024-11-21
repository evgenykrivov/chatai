import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ERole } from '../types';
import { transformStringToAnotherCase } from '../transforms';

export class SignUpDto {
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

  @IsEnum(ERole)
  @IsDefined()
  @Transform(transformStringToAnotherCase)
  @ApiProperty({
    example: ERole.USER,
    description: 'The role of an user',
    enum: ERole,
  })
  role: ERole;
}
