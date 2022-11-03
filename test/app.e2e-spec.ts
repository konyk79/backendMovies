import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return movies', async () => {
    return await request(app.getHttpServer())
      .get('/movies')
      .query({ title: 'Red Jasmine', year: '2022', type: 'movie' })
      .expect(200)
      .then((data) => {
        const { Response, Search } = data.body;
        expect(Response).toEqual('True');
        expect(Search).toBeDefined();
      });
  }, 10000);
  it('should return Error = Too many results.', async () => {
    return await request(app.getHttpServer())
      .get('/movies')
      .query({ title: 'Re', year: '2022', type: 'movie' })
      .then((data) => {
        const { status } = data;
        const { Response, Search, Error } = data.body;
        expect(status).toEqual(200);
        expect(Response).toEqual('False');
        expect(Search).toBeUndefined();
        expect(Error).toEqual('Too many results.');
      });
  }, 10000);
});
