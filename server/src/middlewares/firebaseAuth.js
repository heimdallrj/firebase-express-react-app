const admin = require('firebase-admin');

const verifyToken = (idToken) => admin.auth().verifyIdToken(idToken);

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    console.log('+', authorization);
    await verifyToken(token);

    // Proceed since token verified
    next();
  } else {
    return res.status(401).send({ code: 401, message: 'Unauthorized' });
  }
};
