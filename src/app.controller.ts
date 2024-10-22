import { Body, Controller, Post, BadRequestException, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PageService } from './page.service';
import { validateOrReject } from 'class-validator';
import { CreatePageRequest } from './dto/create-page.dto';

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
    try {
      await validateOrReject(body);  // Валидация всех данных
    } catch (errors) {
      throw new BadRequestException('Invalid request data');
    }

    const { type, name, property1, property2, property3 } = body;

    // Создаем страницу в зависимости от типа
    return this.pageService.createPage(type, { name, property1, property2, property3 });
  }
}