import { Injectable } from '@nestjs/common';
import { AbstractPage } from './page/page.entity';

@Injectable()
export class PageService {
  createPage(page: AbstractPage) {
    return page.create();
  }
}