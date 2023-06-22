import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Create' , () => {
  
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

  it ('tenta criar registro sem token de acesso', async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'caxias do sul'})

      expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
      expect(res1.body).toHaveProperty('errors.default')
    
  })


  it ('Criar registro' , async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome:'Caxias do Sul'});
    

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });


  it ('Criar registro com nome muito curto', async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Ca' });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

 
});