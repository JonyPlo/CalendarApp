import calendarApi from '../../src/api/calendarApi'

describe('Tests in calendarApi', () => {
  test('should have a default configuration', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })

  test('should have x-token header in all requests', async () => {
    const user = {
      email: 'test@gmail.com',
      password: 'asd12345',
    }
    const token = 'ABC-123-XYZ'

    localStorage.setItem('token', token)

    const res = await calendarApi.post('/auth', user)

    expect(res.config.headers['x-token']).toBe(token)
  })
})
