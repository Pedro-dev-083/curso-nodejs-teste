import {
  afterEach, beforeEach, describe, expect,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let servidor;
beforeEach(() => {
  const porta = 3000;
  servidor = app.listen(porta);
});

afterEach(() => {
  servidor.close();
});

describe('Testando a rota login (POST)', () => {
  it('O login deve possuir um email e senha para se autenticar', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatório."');
  });

  it('O login deve validar se o usuário está cadastrado', async () => {
    const loginMock = {
      email: 'pedroo@email.com',
      senha: '123',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(201)
      .then((res) => {
        expect(res.body.message);
      });
  });

  it('O login deve validar e-mail e senha incorreto', async () => {
    const loginMock = {
      email: 'pedroo@email.com',
      senha: '1233',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario ou senha invalido."');
  });

  it('O login deve validar se está sendo retornado um accessToken', async () => {
    const loginMock = {
      email: 'pedroo@email.com',
      senha: '123',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(201)
      .then((res) => {
        expect(res.body.accessToken);
      });
  });
});
