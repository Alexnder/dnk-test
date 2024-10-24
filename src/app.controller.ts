import { Body, Controller, Post, BadRequestException, HttpCode, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { PageService } from './page.service';
import { GetPageRequest } from './page/dto/create-page.dto';
import { DataInterceptor } from './data.interceptor';
import { PageResponseDto, PageType1Dto, PageType2Dto, PageType3Dto } from './page/dto/page-response.dto';

@ApiTags('Pages')
@ApiExtraModels(PageType1Dto, PageType2Dto, PageType3Dto)
@UseInterceptors(DataInterceptor)
@Controller('api/pages')
export class AppController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Fetch a page of a specific type' })
  @ApiBody({ type: GetPageRequest })
  @ApiResponse({
    status: 200,
    description: 'Page data retrieved successfully',
    type: PageResponseDto,
    schema: {
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          oneOf: [
            { $ref: '#/components/schemas/PageType1Dto' },
            { $ref: '#/components/schemas/PageType2Dto' },
            { $ref: '#/components/schemas/PageType3Dto' },
          ],
        },
        timestamp: { type: 'string', example: '2024-10-22T12:00:00Z' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request parameters',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async createPage(@Body() body: GetPageRequest) {
    const { type } = body;
    if (![1, 2, 3].includes(type)) {
      throw new BadRequestException('Invalid type');
    }

    const page = this.pageService.getPageByType(type);

    try {
      page.validate();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return page;
  }
}