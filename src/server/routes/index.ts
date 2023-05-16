import { Router } from 'express';
import { CidadedesController, PessoasController } from './../controllers/';


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

//RoutersOfPersons
router.get('/cidades',
  PessoasController.getAllValidation,
  PessoasController.getAll);


router.post('/cidades',
  PessoasController.createValidation,
  PessoasController.create );


router.get('/cidades/:id',
  PessoasController.getByIdValidation,
  PessoasController.getById
);

router.put('/cidades/:id',
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);

router.delete('/cidades/:id',
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);


export { router };