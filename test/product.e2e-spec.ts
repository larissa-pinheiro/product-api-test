import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProductModule tests (e2e)', () => {
  let app: INestApplication;
  let productId: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new product', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        price: 100,
        sku: 'TEST-SKU',
      })
      .expect(201);

    productId = response.body.id;
  })

  it('should not create a product with duplicate SKU', async () => {
    await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        price: 100,
        sku: 'TEST-SKU',
      })
      .expect(409);
  });

  it('should list all products', async () => {
    return await request(app.getHttpServer())
      .get('/products')
      .send({})
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name', 'Test Product');
        expect(res.body[0]).toHaveProperty('price', 100);
        expect(res.body[0]).toHaveProperty('sku', 'TEST-SKU');
      });
  });

  it('should get a product by id', async () => {
    await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', productId);
        expect(res.body).toHaveProperty('name', 'Test Product');
        expect(res.body).toHaveProperty('price', 100);
        expect(res.body).toHaveProperty('sku', 'TEST-SKU');
      });
  });

  it('should update a product', async () => {
    await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .send({
        name: 'Updated Product',
        price: 150,
        sku: 'UPDATED-SKU',
      })
      .expect(200)
      .then(res => {
        expect('Updated Product').toEqual(res.body.name);
      })
  });

  it('should delete a product', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .expect(204);
  });
});