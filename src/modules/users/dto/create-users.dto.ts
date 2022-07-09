import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDTO {

  @IsNumber()
  @ApiProperty()
  partnerId: number;

  @MaxLength(100, {
    message: 'Name is too long',
  })
  @IsString()
  @ApiProperty()
  name: string;



  @MaxLength(100, {
    message: 'Surname is too long',
  })
  @IsString()
  @ApiProperty()
  surname: string;


  
  @MaxLength(100, {
    message: 'Username is too long',
  })
  @IsString()
  @ApiProperty()
  username: string;


  @MinLength(8, {
    message: 'Password is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  @IsString()
  @ApiProperty()
  password: string;



  @MinLength(8, {
    message: 'Phone number is too short',
  })
  @MaxLength(13, {
    message: 'Phone number is too long',
  })
  @IsString()
  @ApiProperty()
  phone: string;



  @MaxLength(100, {
    message: 'Email address is too long',
  })
  @IsEmail()
  @ApiProperty()
  email: string;
  


}