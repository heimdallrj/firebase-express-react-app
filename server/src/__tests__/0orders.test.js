const request = require('supertest')('http://localhost:3001/api');
const chai = require('chai');

const expect = chai.expect;

// Initialize firebase instance
const configureFirebase = require('../firebase');
configureFirebase();

const Orders = require('../firebase/firestore/orders');

const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29uc3RydXlvLWNvZGluZy1jaGFsbGVuZ2UiLCJhdWQiOiJjb25zdHJ1eW8tY29kaW5nLWNoYWxsZW5nZSIsImF1dGhfdGltZSI6MTYwNjU5NzA4NSwidXNlcl9pZCI6IjVpRW0xSHZJeHViTGFpS080eWowTnBtdnEwRjIiLCJzdWIiOiI1aUVtMUh2SXh1YkxhaUtPNHlqME5wbXZxMEYyIiwiaWF0IjoxNjA2NTk3MDg1LCJleHAiOjE2MDY2MDA2ODUsImVtYWlsIjoiY29kaW5nLWNoYWxsZW5nZUBjb25zdHJ1eW8uZGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiY29kaW5nLWNoYWxsZW5nZUBjb25zdHJ1eW8uZGUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.gsZg3yv0YAtBeTTPUIMgEzSS8yj052jaF14CXztpilRJiiPmkEosqoedzb3kADlJVjKFR4vwsCjo-sdh_y8jARjVSDQeltGhDpPIcSvztW51aoT1DaqSJyFLjoV57LN3SM_uUkSNzJWRVWMgzii8gHdrL3wGLmurqj8wbNt8bQRXHQS0OLCFc3mVs3_iDaUzIZolRy4zGCzq-LBFmTsu-j6HYkpwvV6aLWqztg7omSt-XVhw9R_IOPRyaOeAC6qpS1pWXPsn6oPD0Pfvbli278eJWWCGpFSUqHarB9s2kyN3-9yI9SpvXRN711nTTqxXWIY4fFz_CJXASkWEHlIwUw';

describe('GET /orders', function () {
  it('should requires authentication', async function () {
    const response = await request.get('/orders');

    expect(response.status).to.eql(401);
  });

  it('should authenticate properly', async function () {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer token=${token}`);

    expect(response.status).to.eql(200);
  });
});

// Support data
let orders, first, order, orderId;

const exampleOrder = {
  address: {
    city: 'Colombo',
    country: 'Sri Lanka',
    street: 'Colombo Plan Road',
    zip: '0003',
  },
  bookingDate: 1606506814,
  customer: {
    email: 'john@example.com',
    name: 'John Doe',
    phone: '0123456789',
  },
  title: 'New Order',
};

describe('Orders', function () {
  describe('Retrive orders', async () => {
    before(async () => {
      orders = await Orders.findAll();
      first = orders[0];
    });

    it('order response should be an array', async () => {
      expect(orders).to.be.a('array');
    });

    it('order response should not be empty', async () => {
      expect(orders.length).to.not.eql(0);
    });

    it('order item should be a valid object', async () => {
      expect(first).to.be.a('object');
      expect(first).to.have.property('title');
      expect(first).to.have.property('bookingDate');
      expect(first).to.have.property('address');
      expect(first).to.have.property('customer');
    });
  });

  describe('Create new order', async () => {
    before(async () => {
      order = await Orders.create(exampleOrder);
      orderId = order.uid;
    });

    it('should create an order correctly', async () => {
      expect(order).to.be.a('object');
      expect(order).to.have.property('uid');
      expect(order).to.have.property('title');
      expect(order).to.have.property('bookingDate');
      expect(order).to.have.property('address');
      expect(order).to.have.property('customer');
    });

    after(async () => {
      await Orders.delete(orderId);
    });
  });

  describe('Retrive specific order', async () => {
    let orderRetrived;

    before(async () => {
      order = await Orders.create(exampleOrder);
      orderId = order.uid;

      // Retrive
      orderRetrived = await Orders.findOne(orderId);
    });

    it('should retrive a specific order correctly', async () => {
      expect(orderRetrived).to.be.a('object');
      expect(orderRetrived).to.have.property('uid');
      expect(orderRetrived).to.have.property('title');
      expect(orderRetrived).to.have.property('bookingDate');
      expect(orderRetrived).to.have.property('address');
      expect(orderRetrived).to.have.property('customer');
    });

    after(async () => {
      await Orders.delete(orderId);
    });
  });

  describe('Update an order', async () => {
    before(async () => {
      order = await Orders.create(exampleOrder);
      orderId = order.uid;
    });

    it('should update correctly', async () => {
      expect(order.title).to.equal('New Order');
      expect(order.bookingDate).to.equal(1606506814);

      // Update the order
      await Orders.update(orderId, {
        title: 'New Order (updated)',
        bookingDate: 1606506811,
      });

      // Fetch updated order again
      const orderUpdated = await Orders.findOne(orderId);

      expect(orderUpdated.title).to.equal('New Order (updated)');
      expect(orderUpdated.bookingDate).to.equal(1606506811);
    });

    after(async () => {
      await Orders.delete(orderId);
    });
  });
});
