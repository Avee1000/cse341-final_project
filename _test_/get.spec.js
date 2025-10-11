const supertest = require('supertest');
const app = require('../server');

const request = supertest(app);

describe('API GET endpoints', () => {
  test('GET /users/api/cars - should return JSON and status 200, 201 or 404', async () => {
    const res = await request.get('/users/api/cars');
    expect(res.header['content-type']).toMatch(/application\/json/);
    expect([200, 201, 404]).toContain(res.statusCode);
  });

  test('GET /users/api/cars/:id - invalid id should return 400 or 404', async () => {
    const res = await request.get('/users/api/cars/invalid-id');
    expect(res.header['content-type']).toMatch(/application\/json/);
    expect([400, 404]).toContain(res.statusCode);
  });

  test('GET /users/api/type - should return JSON and status 200, 201 or 400', async () => {
    const res = await request.get('/users/api/type');
    expect(res.header['content-type']).toMatch(/application\/json/);
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  test('GET /users/accounts - should return JSON and status 200, 401 or 500', async () => {
    const res = await request.get('/users/accounts');
    expect(res.header['content-type']).toMatch(/application\/json/);
    expect([200, 401, 500]).toContain(res.statusCode);
  });

  test('GET /users/suggestions - should return JSON and appropriate status', async () => {
    const res = await request.get('/users/suggestions');
    expect(res.header['content-type']).toMatch(/application\/json/);
    expect([200, 400, 401, 500]).toContain(res.statusCode);
  });
});