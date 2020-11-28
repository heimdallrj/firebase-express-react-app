const request = require('supertest')('http://localhost:3001/api');
const expect = require('chai').expect;

const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29uc3RydXlvLWNvZGluZy1jaGFsbGVuZ2UiLCJhdWQiOiJjb25zdHJ1eW8tY29kaW5nLWNoYWxsZW5nZSIsImF1dGhfdGltZSI6MTYwNjU5NzA4NSwidXNlcl9pZCI6IjVpRW0xSHZJeHViTGFpS080eWowTnBtdnEwRjIiLCJzdWIiOiI1aUVtMUh2SXh1YkxhaUtPNHlqME5wbXZxMEYyIiwiaWF0IjoxNjA2NTk3MDg1LCJleHAiOjE2MDY2MDA2ODUsImVtYWlsIjoiY29kaW5nLWNoYWxsZW5nZUBjb25zdHJ1eW8uZGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiY29kaW5nLWNoYWxsZW5nZUBjb25zdHJ1eW8uZGUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.gsZg3yv0YAtBeTTPUIMgEzSS8yj052jaF14CXztpilRJiiPmkEosqoedzb3kADlJVjKFR4vwsCjo-sdh_y8jARjVSDQeltGhDpPIcSvztW51aoT1DaqSJyFLjoV57LN3SM_uUkSNzJWRVWMgzii8gHdrL3wGLmurqj8wbNt8bQRXHQS0OLCFc3mVs3_iDaUzIZolRy4zGCzq-LBFmTsu-j6HYkpwvV6aLWqztg7omSt-XVhw9R_IOPRyaOeAC6qpS1pWXPsn6oPD0Pfvbli278eJWWCGpFSUqHarB9s2kyN3-9yI9SpvXRN711nTTqxXWIY4fFz_CJXASkWEHlIwUw';

describe('GET /orders', function () {
  it('requires authentication', async function () {
    const response = await request.get('/orders');

    expect(response.status).to.eql(401);
  });

  it('get orders data', async function () {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer token=${token}`);

    expect(response.status).to.eql(200);
  });
});

describe('GET /orders/:id', function () {
  it('requires authentication', async function () {
    const response = await request.get('/orders/1');

    expect(response.status).to.eql(401);
  });
});
