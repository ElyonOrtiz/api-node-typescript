import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - GetAll' , () => {

  let accessToken = '';

  beforeAll(async () => {
    await testServer
      .post('/cadastrar')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'elyon.tes@gmail.com',
        senha: '12345678'
    })
    const singIn = await testServer
     .post('/entrar')
     .set({ authorization: `Bearer ${accessToken}` })
     .send({email: 'elyon.tes@gmail.com', senha: '12345678'})

    accessToken = singIn.body.accessToken
  })

  it ('Busque todos os registros' , async () => {


    const res1 = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Porto Velho' });    

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/cidades')  
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);

  });
});