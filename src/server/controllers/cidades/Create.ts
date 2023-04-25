import { RequestHandler }  from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ICidade{
  nome: string;
  estado: string;
}


export const createValidation = validation( (getschema) => ({
  body: getschema<ICidade>(yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3)
  }),)  
}));






export const create: RequestHandler = async(req, res) => {
  
  console.log(req.body);

  return res.send(create);
};