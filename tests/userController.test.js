const request = require('supertest');
const app = require('../app');  // Tu archivo principal de servidor

describe('User Registration', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'admin', password: '123456', role: 'admin' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
  });
});
