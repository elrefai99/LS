import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError, ValidatorOptions } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationQueryMiddleware<T>(type: new () => T): (req: Request, res: Response, next: NextFunction) => void {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const dto: any = plainToClass(type, req.query);

    // Check if at least one property is present in the request query
    const hasAtLeastOneProperty = Object.keys(dto).some(key => dto[key] !== undefined);

    if (!hasAtLeastOneProperty) {
      return res.status(400).json({ code: 400, status: "Bad Request", message: "At least one property must be present in the request query." });
    }

    // Custom validator options to whitelist only provided properties
    const validatorOptions: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true
    };

    try {
      await validateOrReject(dto, validatorOptions);
      req.query = dto;
      next();
    } catch (errors) {
      if (errors instanceof Array && errors[0] instanceof ValidationError) {
        const validationErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
        res.status(400).json({ code: 400, status: "Bad Request", message: validationErrors[0] });
      } else {
        next(errors);
      }
    }
  };
}
