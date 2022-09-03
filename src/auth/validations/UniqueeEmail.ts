import { Inject, Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { UserService } from "src/user/user.service";

@ValidatorConstraint({ name: "isEmailUserAlreadyExist", async: true })
@Injectable()
export class IsEmailUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject(UserService) protected readonly userService: UserService
  ) {}

  async validate(text: string) {
    return !(await this.userService.userExists({
      email: text
    }));
  }
}

export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUserAlreadyExistConstraint
    });
  };
}
