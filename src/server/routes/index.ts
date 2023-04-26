import { Router } from 'express';
import { CidadedesController } from './../controllers/';


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

router.put('/cidades',
  CidadedesController.updateValidation,
  CidadedesController.updateById
);


export { router };