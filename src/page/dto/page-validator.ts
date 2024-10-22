import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsTypeValid(property: string, typeValue: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTypeValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property, typeValue],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName, requiredTypeValue] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return relatedValue === requiredTypeValue ? value !== undefined && value !== null && value !== '' : true;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName, requiredTypeValue] = args.constraints;
          return `${args.property} is required when ${relatedPropertyName} is ${requiredTypeValue}`;
        }
      },
    });
  };
}