import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { ObjectSchema } from 'joi'
import { invalidDataError } from '../errors/invalidDataError'

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction)=> void;

export function validateBody<T> (schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'body')
};

export function validadeParams<T> (schame: ObjectSchema<T>): ValidationMiddleware {
  return validate(schame, 'params')
};

export function validateQuery<T> (schame: ObjectSchema<T>):ValidationMiddleware {
  return validate(schame, 'query')
};

function validate (schema: ObjectSchema, type: 'body' | 'params' | 'query') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], { abortEarly: false })

    if (!error) {
      next()
    } else {
      const details = error.details.map(e => e.message)
      res.status(httpStatus.BAD_REQUEST).send(invalidDataError(details))
    };
  }
};
