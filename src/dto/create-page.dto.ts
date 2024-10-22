import { IsString, IsNotEmpty, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from './page.dto';

// DTO для обработки POST запроса
export class CreatePageRequest extends PageDto {
  @ApiProperty({
    description: 'Type of the page',
    example: 1,
    enum: [1, 2, 3],
  })
  @IsNotEmpty()
  type: number;

  @ApiPropertyOptional({
    description: 'Property specific to type 1',
    example: 'Property for type 1',
  })
  @ValidateIf((o) => o.type === 1)
  @IsString()
  @IsNotEmpty()
  property1?: string;

  @ApiPropertyOptional({
    description: 'Property specific to type 2',
    example: 'Property for type 2',
  })
  @ValidateIf((o) => o.type === 2)
  @IsString()
  @IsNotEmpty()
  property2?: string;

  @ApiPropertyOptional({
    description: 'Property specific to type 3',
    example: 'Property for type 3',
  })
  @ValidateIf((o) => o.type === 3)
  @IsString()
  @IsNotEmpty()
  property3?: string;
}