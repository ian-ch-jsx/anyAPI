const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Monster = require('../lib/models/Monster');

describe('anyAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('gets a list of monsters', async () => {
    const expected = [
      { id: '1', species: 'werewolf', category: 'animal' },
      { id: '2', species: 'vampire', category: 'humanoid' },
    ];
    const res = await request(app).get('/api/v1/monsters').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('creates a monster', async () => {
    const expected = {
      species: 'zombie',
      category: 'humanoid',
    };
    const res = await request(app).post('/api/v1/monsters').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a monster by id', async () => {
    const expected = await Monster.findById(1);
    const res = await request(app).get(`/api/v1/monsters/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates a monster by id', async () => {
    const expected = {
      id: expect.any(String),
      species: 'werewolf',
      category: 'undead',
    };
    const res = await request(app)
      .patch('/api/v1/monsters/1')
      .send({ category: 'undead' });

    expect(res.body).toEqual(expected);
  });
});
