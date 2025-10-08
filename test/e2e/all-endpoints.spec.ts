import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';


describe('Testes automáticos de todos os endpoints', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Deve testar todos os endpoints automaticamente', async () => {
    const server = app.getHttpServer();

    // Pegando todos os controladores
    const controllers = Reflect.getMetadataKeys(AppModule.prototype)
      .filter(key => key.toString().includes('controllers'));

    // Para simplificação: você pode listar os controladores manualmente aqui
    const endpoints = [
      { method: 'get', path: '/users' },
      { method: 'post', path: '/auth/login', body: { email: 'teste@teste.com', password: '123456' } },
      // adicione mais endpoints conforme sua API
    ];

    for (const endpoint of endpoints) {
      const req = request(server)[endpoint.method](endpoint.path);
      if (endpoint.body) req.send(endpoint.body);
      const res = await req;
      expect(res.status).toBeLessThan(500); // ao menos não crashou
    }
  });
});
