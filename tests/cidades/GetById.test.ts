import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Cidades - getById', ()=> {

  let accessToken = '';

  beforeAll(async () => {
    await testServer
      .post('/cadastrar')
      .send({
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'elyon.tes@gmail.com',
        senha: '12345678'
    })
    const singIn = await testServer
     .post('/entrar')
     .send({email: 'elyon.tes@gmail.com', senha: '12345678'})

    accessToken = singIn.body.accessToken
  })

  it('Busca registro por id', async () => {

    const res1 = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Colorado do Oestes'});

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/cidades/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');
  });

  it('Tenta buscar registro que não existe', async ()=> {
    const res1 = await testServer
      .get('/cidades/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});