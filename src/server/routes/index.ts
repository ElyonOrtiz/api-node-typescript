import { Router } from 'express';
import { CidadedesController } from './../controllers/';
import { deleteById } from '../controllers/cidades/DeleteById';


const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, Dev!');
});

// RouterOfCidade
router.get('/cidades',
  CidadedesController.getAllValidation,
  CidadedesController.getAll);


router.post('/cidades',
  CidadedesController.createValidation,
  CidadedesController.create );


router.get('/cidades/:id',
  CidadedesController.getByIdValidation,
  CidadedesController.getById
);

router.put('/cidades/:id',
  CidadedesController.updateByIdValidation,
  CidadedesController.updateById
);

router.delete('/cidades/:id',
  CidadedesController.deleteByIdValidation,
  CidadedesController.deleteById
);


export { router };