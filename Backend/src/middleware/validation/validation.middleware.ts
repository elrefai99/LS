import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError, ValidatorOptions } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../../Utils/api.errors.utils';

export function validationMiddleware<T>(type: new () => T): (req: Request, res: Response, next: NextFunction) => void {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const dto: any = plainToClass(type, req.body);
    const hasAtLeastOneProperty = Object.keys(dto).some(key => dto[key] !== undefined);

    if (!hasAtLeastOneProperty) {
      next(new ApiError("At least one property must be present in the request body.", 400))
      res.status(400).json({ code: 400, status: "Bad Request", message: "At least one property must be present in the request body." })
    }

    const validatorOptions: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true
    };

    try {
      await validateOrReject(dto, validatorOptions);
      req.body = dto;
      next();
    } catch (errors) {
      if (errors instanceof Array && errors[0] instanceof ValidationError) {
        const validationErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
        next(new ApiError(`${validationErrors[0]}`, 400));
        res.status(400).json({ code: 400, status: "Bad Request", message: validationErrors[0] })
      } else {
        next(new ApiError(`${errors}`, 500));
        res.status(500).json({ code: 500, status: "Internal Server Error", message: errors })
      }
    }
  };
}
