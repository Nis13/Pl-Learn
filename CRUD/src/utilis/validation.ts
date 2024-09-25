/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance, ClassConstructor } from "class-transformer";
import { validate } from "class-validator";
export * from "class-validator";

export const validationPipe = async (
  schema: ClassConstructor<object>,
  requestObject: object
) => {
  const transformedClass = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass, {
    validationError: { target: false },
  });
  return errors;
};
