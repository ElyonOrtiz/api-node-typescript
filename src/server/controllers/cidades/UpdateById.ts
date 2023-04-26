import { Request, Response }  from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IParamsProps{
  id?: number;
}

interface IBodyProps {
     nome: string;
}


export const UpdateByIdValidation = validation( (getschema) => ({
  body: getschema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
  params: getschema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }))  
}));

export const  updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res:Response) => {
  
  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};