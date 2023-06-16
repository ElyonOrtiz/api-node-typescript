import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Delete', () => {
  let cidadeId: number| undefined = undefined;
  beforeAll( async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste'});

    cidadeId = resCidade.body;
  });
  it ('Cria Registro' , async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({  
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId, });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const deleteCid = await testServer
      .delete(`/pessoas/${res1.body}`)
      .send();

    expect(deleteCid.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it ('Tenta apagar registro que não existe' , async () => {
    const res1 = await testServer
      .delete('/pessoas/9999')
      .send();
    
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});