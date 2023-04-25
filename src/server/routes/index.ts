import { Router } from 'express';
import { CidadedesController } from './../controllers';


const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, Dev!');
});

router.post('/cidades',
  CidadedesController.createValidation,
  CidadedesController.create );

export { router };