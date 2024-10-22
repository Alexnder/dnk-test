import { Body, Controller, Post, BadRequestException, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PageService } from './page.service';
import { CreatePageRequest } from './page/dto/create-page.dto';
import { AbstractPage, PageType1, PageType2, PageType3 } from './page/page.entity';

@ApiTags('Pages')
@Controller('api/pages')
export class AppController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a page of a specific type' })
  @ApiBody({ type: CreatePageRequest })
  @ApiResponse({
    status: 200,
    description: 'Page created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request parameters',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async createPage(@Body() body: CreatePageRequest) {
    let page: AbstractPage;

    switch (body.type) {
      case 1:
        page = new PageType1(body.name, body.type, body.property1);
        break;
      case 2:
        page = new PageType2(body.name, body.type, body.property2);
        break;
      case 3:
        page = new PageType3(body.name, body.type, body.property3);
        break;
      default:
        throw new BadRequestException('Invalid type');
    }

    try {
      page.validate();
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return this.pageService.createPage(page);
  }
}