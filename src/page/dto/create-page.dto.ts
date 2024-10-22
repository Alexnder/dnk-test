import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsTypeValid } from './page-validator';

export class CreatePageRequest {
  @ApiProperty({
    description: 'Type of the page',
    example: 1,
    enum: [1, 2, 3],
  })
  @IsIn([1, 2, 3])
  type: number;

  @ApiProperty({
    description: 'Name of the page',
    example: 'Homepage',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Property specific to type 1' })
  @IsTypeValid('type', 1, { message: 'property1 is required when type is 1' })
  @IsString()
  property1?: string;

  @ApiProperty({ description: 'Property specific to type 2' })
  @IsTypeValid('type', 2, { message: 'property2 is required when type is 2' })
  @IsString()
  property2?: string;

  @ApiProperty({ description: 'Property specific to type 3' })
  @IsTypeValid('type', 3, { message: 'property3 is required when type is 3' })
  @IsString()
  property3?: string;
}