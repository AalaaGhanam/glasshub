import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsBase64Image(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isBase64Image',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (typeof value !== 'string') {
              return false;
            }
            const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
            return base64Regex.test(value);
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be a valid base64-encoded image`;
          },
        },
      });
    };
  }