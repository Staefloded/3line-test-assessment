import request from 'supertest'
import app from '../index'
import { resetStore } from '../data/store'

beforeEach(() => resetStore())

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

describe('GET /api/roles', () => {
  it('returns 200 with activeRoles and tableRoles', async () => {
    const res = await request(app).get('/api/roles')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('activeRoles')
    expect(res.body).toHaveProperty('tableRoles')
    expect(Array.isArray(res.body.activeRoles)).toBe(true)
    expect(Array.isArray(res.body.tableRoles)).toBe(true)
  })

  it('returns 3 active roles', async () => {
    const res = await request(app).get('/api/roles')
    expect(res.body.activeRoles).toHaveLength(3)
  })

  it('returns 7 table roles', async () => {
    const res = await request(app).get('/api/roles')
    expect(res.body.tableRoles).toHaveLength(7)
  })
})

describe('GET /api/roles/user-roles', () => {
  it('returns active roles array', async () => {
    const res = await request(app).get('/api/roles/user-roles')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body.data[0]).toHaveProperty('name')
    expect(res.body.data[0]).toHaveProperty('lastActive')
  })
})

describe('GET /api/roles/table', () => {
  it('returns all table roles with no filters', async () => {
    const res = await request(app).get('/api/roles/table')
    expect(res.status).toBe(200)
    expect(res.body.data).toHaveLength(7)
    expect(res.body.total).toBe(7)
  })

  it('filters by status=ACTIVE', async () => {
    const res = await request(app).get('/api/roles/table?status=ACTIVE')
    expect(res.status).toBe(200)
    res.body.data.forEach((role: { status: string }) => {
      expect(role.status).toBe('ACTIVE')
    })
  })

  it('filters by status=INACTIVE', async () => {
    const res = await request(app).get('/api/roles/table?status=INACTIVE')
    expect(res.status).toBe(200)
    expect(res.body.data).toHaveLength(1)
    expect(res.body.data[0].name).toBe('Deputy sales personnel')
  })

  it('filters by type=DEFAULT', async () => {
    const res = await request(app).get('/api/roles/table?type=DEFAULT')
    expect(res.status).toBe(200)
    res.body.data.forEach((role: { type: string }) => {
      expect(role.type).toBe('DEFAULT')
    })
    expect(res.body.data).toHaveLength(3)
  })

  it('filters by type=CUSTOM', async () => {
    const res = await request(app).get('/api/roles/table?type=CUSTOM')
    expect(res.status).toBe(200)
    expect(res.body.data).toHaveLength(2)
  })

  it('filters by type=SYSTEM-CUSTOM', async () => {
    const res = await request(app).get('/api/roles/table?type=system-custom')
    expect(res.status).toBe(200)
    expect(res.body.data).toHaveLength(2)
  })
})

describe('GET /api/roles/table/:id', () => {
  it('returns a single role by id', async () => {
    const res = await request(app).get('/api/roles/table/1')
    expect(res.status).toBe(200)
    expect(res.body.data.name).toBe('Superadmin')
    expect(res.body.data.type).toBe('DEFAULT')
  })

  it('returns 404 for non-existent id', async () => {
    const res = await request(app).get('/api/roles/table/999')
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})

describe('POST /api/roles/user-roles', () => {
  it('creates a new active role and returns 201', async () => {
    const res = await request(app)
      .post('/api/roles/user-roles')
      .send({ name: 'Testadmin' })
    expect(res.status).toBe(201)
    expect(res.body.data).toHaveProperty('id')
    expect(res.body.data.name).toBe('Testadmin')
    expect(res.body.data).toHaveProperty('lastActive')
  })

  it('returns 400 when name is missing', async () => {
    const res = await request(app).post('/api/roles/user-roles').send({})
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('returns 400 when name is an empty string', async () => {
    const res = await request(app).post('/api/roles/user-roles').send({ name: '   ' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('new role id is greater than existing max id', async () => {
    const listBefore = await request(app).get('/api/roles/user-roles')
    const maxId = Math.max(...listBefore.body.data.map((r: { id: number }) => r.id))

    const res = await request(app)
      .post('/api/roles/user-roles')
      .send({ name: 'NewRole' })
    expect(res.body.data.id).toBeGreaterThan(maxId)
  })

  it('lastActive is formatted as MM/YYYY', async () => {
    const res = await request(app)
      .post('/api/roles/user-roles')
      .send({ name: 'DateRole' })
    expect(res.body.data.lastActive).toMatch(/^\d{2}\/\d{4}$/)
  })
})

describe('PUT /api/roles/user-roles/:id', () => {
  it('updates an existing role name and returns 200', async () => {
    const res = await request(app)
      .put('/api/roles/user-roles/1')
      .send({ name: 'SuperadminUpdated' })
    expect(res.status).toBe(200)
    expect(res.body.data.id).toBe(1)
    expect(res.body.data.name).toBe('SuperadminUpdated')
  })

  it('returns 400 when name is missing', async () => {
    const res = await request(app).put('/api/roles/user-roles/1').send({})
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('returns 400 when name is empty string', async () => {
    const res = await request(app).put('/api/roles/user-roles/1').send({ name: '   ' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('returns 404 for non-existent id', async () => {
    const res = await request(app).put('/api/roles/user-roles/9999').send({ name: 'Ghost' })
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})

describe('Unknown routes', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown')
    expect(res.status).toBe(404)
  })
})
