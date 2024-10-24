import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPageRequest {
  @ApiProperty({
    description: 'Type of the page',
    example: 1,
    enum: [1, 2, 3],
  })
  @IsIn([1, 2, 3])
  type: number;
}