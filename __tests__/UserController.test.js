import request from 'supertest';
import express from 'express';
import { MemoryStore } from '../stores/MemoryStore.js';
import { UserService } from '../services/UserService.js';
import { UserController } from '../controllers/UserController.js';

let app;

beforeEach(() => {
  const store = new MemoryStore();
  const service = new UserService(store);
  const controller = new UserController(service);

  app = express();
  app.use(express.json());

  app.post('/api/users/batch', controller.createUsers);
  app.put('/api/users/batch', controller.updateUsers);
  app.delete('/api/users/batch', controller.deleteUsers);
  app.get('/api/users', controller.listUsers);
  app.get('/api/users/search', controller.searchUsers);
});

describe('User REST API - Batch Only', () => {
  test('POST /api/users/batch should create multiple users', async () => {
    const users = [
      { id: '1', name: 'Alice', email: 'alice@example.com' },
      { id: '2', name: 'Bob', email: 'bob@example.com' }
    ];
    const res = await request(app)
      .post('/api/users/batch')
      .send(users);
    expect(res.statusCode).toBe(201);
    expect(res.body.length).toBe(2);
  });

  test('GET /api/users should list all users', async () => {
    const users = [
      { id: '3', name: 'Charlie', email: 'charlie@example.com' },
      { id: '4', name: 'Dana', email: 'dana@example.com' }
    ];
    await request(app).post('/api/users/batch').send(users);

    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  test('PUT /api/users/batch should update users', async () => {
    await request(app).post('/api/users/batch').send([
      { id: '5', name: 'Eve', email: 'eve@old.com' }
    ]);

    const updatedUsers = [
      { id: '5', name: 'Eve Updated', email: 'eve@new.com' }
    ];

    const res = await request(app)
      .put('/api/users/batch')
      .send(updatedUsers);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].email).toBe('eve@new.com');
  });

  test('DELETE /api/users/batch should delete users', async () => {
    await request(app).post('/api/users/batch').send([
      { id: '6', name: 'Frank', email: 'frank@example.com' }
    ]);

    const res = await request(app)
      .delete('/api/users/batch')
      .send(['6']);
    expect(res.statusCode).toBe(204);

    const check = await request(app).get('/api/users');
    const deleted = check.body.find(u => u.id === '6');
    expect(deleted).toBeUndefined();
  });

  test('GET /api/users/search should find users by wildcard', async () => {
    await request(app).post('/api/users/batch').send([
      { id: '7', name: 'Grace', email: 'grace@domain.com' },
      { id: '8', name: 'Greg', email: 'greg@domain.com' }
    ]);

    const res = await request(app).get('/api/users/search?q=*gr*');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });
});
