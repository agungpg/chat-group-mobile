import { useState } from "react";
import { AnyObject, ObjectSchema, ValidationError } from "yup";

export const useValidation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const validate = async <T extends AnyObject>(scheme: ObjectSchema<T>, data: unknown) => {
    try {
      setIsLoading(true);
      await scheme.validate(data, { abortEarly: false });
      return null;
    } catch (err) {
      if (err instanceof ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach(({ path, message }) => {
          if (path) fieldErrors[path] = message;
        });
        return fieldErrors;
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    validate,
    isLoading
  };
};
