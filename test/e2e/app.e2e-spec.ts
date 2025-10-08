import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('API E2E Test', () => {
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

  it('/users (GET) deve retornar 200', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
  });

  it('/auth/login (POST) deve autenticar', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'teste@teste.com', password: '123456' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
