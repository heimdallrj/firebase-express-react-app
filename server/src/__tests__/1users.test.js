const chai = require('chai');
const expect = chai.expect;

// Initialize firebase instance
// const configureFirebase = require('../firebase');
// configureFirebase();

const Users = require('../firebase/firestore/users');

// Support data
let user, userId;

const exampleUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '0123456789',
  password: 'pwd',
};

describe('Users', function () {
  describe('Retrive user', async () => {
    before(async () => {
      user = await Users.create(exampleUser);
      userId = user.uid;
    });

    it('user should retrive correctly', async () => {
      expect(user).to.be.a('object');
      expect(user.name).to.equal('John Doe');

      const retrivedUser = await Users.findOne(userId);
      expect(user.name).to.equal('John Doe');
      expect(user.email).to.equal('john@example.com');
    });

    after(async () => {
      await Users.delete(userId);
    });
  });
});
