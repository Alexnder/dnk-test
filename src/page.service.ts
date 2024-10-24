import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractPage, PageType1, PageType2, PageType3 } from './page/page.entity';

@Injectable()
export class PageService {
  private pages = [
    { type: 1, name: 'Page 1', property1: 'Data for type 1' },
    { type: 2, name: 'Page 2', property2: 'Data for type 2' },
    { type: 3, name: 'Page 3', property3: 'Data for type 3' },
  ];

  getPageByType(type: number): AbstractPage {
    const pageData = this.pages.find(page => page.type === type);

    if (!pageData) {
      throw new NotFoundException(`Page with type ${type} not found`);
    }

    switch (type) {
      case 1:
        return new PageType1(pageData.name, pageData.type, pageData.property1);
      case 2:
        return new PageType2(pageData.name, pageData.type, pageData.property2);
      case 3:
        return new PageType3(pageData.name, pageData.type, pageData.property3);
      default:
        throw new NotFoundException('Invalid type');
    }
  }
}