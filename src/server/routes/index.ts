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
router.get('/pessoas',
  PessoasController.getAllValidation,
  PessoasController.getAll);


router.post('/pessoas',
  PessoasController.createValidation,
  PessoasController.create );


router.get('/pessoas/:id',
  PessoasController.getByIdValidation,
  PessoasController.getById
);

router.put('/pessosas/:id',
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);

router.delete('/pessoas/:id',
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);


export { router };