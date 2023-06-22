import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';




describe ('Cidades - updateById', () => {

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

  it('Atualiza registrto', async () => {


    const res1 =  await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Colorado do Oeste'});

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualiza = await testServer
      .put(`/cidades/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Vilhena'});

    expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
   
  });

  it('Tenta Atualizar Registro que Não existe', async () => {
    const res1 = await testServer
      .put('/cidades/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Ouro Preto'});

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});