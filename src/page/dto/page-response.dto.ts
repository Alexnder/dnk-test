import { ApiProperty } from '@nestjs/swagger';

export class PageType1Dto {
  @ApiProperty({ example: 'Page 1', description: 'Name of the page' })
  name: string;

  @ApiProperty({ example: 1, description: 'Type of the page' })
  type: number;

  @ApiProperty({ example: 'Data for type 1', description: 'Specific property for page type 1' })
  property1: string;
}

export class PageType2Dto {
  @ApiProperty({ example: 'Page 2', description: 'Name of the page' })
  name: string;

  @ApiProperty({ example: 2, description: 'Type of the page' })
  type: number;

  @ApiProperty({ example: 'Data for type 2', description: 'Specific property for page type 2' })
  property2: string;
}

export class PageType3Dto {
  @ApiProperty({ example: 'Page 3', description: 'Name of the page' })
  name: string;

  @ApiProperty({ example: 3, description: 'Type of the page' })
  type: number;

  @ApiProperty({ example: 'Data for type 3', description: 'Specific property for page type 3' })
  property3: string;
}

export class PageResponseDto {
  @ApiProperty({ example: true, description: 'Indicates if the operation was successful' })
  success: boolean;

  @ApiProperty({
    description: 'Data specific to the requested page type',
    oneOf: [{ $ref: '#/components/schemas/PageType1Dto' }, { $ref: '#/components/schemas/PageType2Dto' }, { $ref: '#/components/schemas/PageType3Dto' }],
  })
  data: any;

  @ApiProperty({
    example: '2024-10-22T12:00:00Z',
    description: 'Timestamp when the response was generated',
  })
  timestamp: string;
}