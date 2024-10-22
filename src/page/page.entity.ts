export abstract class AbstractPage {
  constructor(
    public readonly name: string,
    public readonly type: number,
  ) {}

  abstract validate(): void;

  abstract create(): any;
}

export class PageType1 extends AbstractPage {
  private readonly property1: string;

  constructor(name: string, type: number, property1: string) {
    super(name, type);
    this.property1 = property1;
  }

  validate(): void {
    if (!this.property1) {
      throw new Error('property1 is required for type 1');
    }
  }

  create() {
    return { name: this.name, type: this.type, property1: this.property1 };
  }
}

export class PageType2 extends AbstractPage {
  private readonly property2: string;

  constructor(name: string, type: number, property2: string) {
    super(name, type);
    this.property2 = property2;
  }

  validate(): void {
    if (!this.property2) {
      throw new Error('property2 is required for type 2');
    }
  }

  create() {
    return { name: this.name, type: this.type, property2: this.property2 };
  }
}

export class PageType3 extends AbstractPage {
  private readonly property3: string;

  constructor(name: string, type: number, property3: string) {
    super(name, type);
    this.property3 = property3;
  }

  validate(): void {
    if (!this.property3) {
      throw new Error('property3 is required for type 3');
    }
  }

  create() {
    return { name: this.name, type: this.type, property3: this.property3 };
  }
}