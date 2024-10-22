import { BadRequestException, Injectable } from '@nestjs/common';
import { PageDto } from './dto/page.dto';

@Injectable()
export class PageService {
  createPage(type: number, pageData: Partial<PageDto & { property1?: string; property2?: string; property3?: string }>): PageDto {
    switch (type) {
      case 1:
        return { name: pageData.name, property1: pageData.property1 } as PageDto;
      case 2:
        return { name: pageData.name, property2: pageData.property2 } as PageDto;
      case 3:
        return { name: pageData.name, property3: pageData.property3 } as PageDto;
      default:
        throw new BadRequestException('Invalid type');
    }
  }
}