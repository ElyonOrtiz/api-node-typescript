import { Request, Response }  from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IParamsProps{
  id?: number;
}


export const getByIdValidation = validation( (getschema) => ({
  params: getschema<IParamsProps>(yup.object().shape({
    id: yup.number().required(),
  }))  
}));

export const getById  = async (req: Request<IParamsProps>, res:Response) => {
  
  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};