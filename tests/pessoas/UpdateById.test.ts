import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Update', () => {
  let cidadeId: number | undefined = undefined;
  beforeAll ( async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste'});

    cidadeId = resCidade.body;
  });
  it('Cria Registro', async ()=> {
    const res1 = await testServer
      .post('/pessoas')
      .send({ 
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId,
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/pessoas/${res1.body}`)
      .send({
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'testexato@gmail.com',
        cidadeId, });
  
    expect(resUpdate.statusCode).toEqual(StatusCodes.OK);
    expect(resUpdate.body).toHaveProperty('nome');
  });
  it ('Tenta Atualizar registro que não existe' , async () => {
    const res1 = await testServer
      .put('/pessoas/9999')
      .send({ 
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'testexato@gmail.com',
        cidadeId, });
      
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});

