const admin = require('firebase-admin');
const uniqid = require('uniqid');

const ds = admin.firestore();
const usersRef = ds.collection('users');

/** TODO
 * Here, in both `orders.js` and `users.js`
 * has some code logic duplication which can simplify further.
 *
 * Wrting a single firebase collection handler and
 * reuse it as required is the best appraoch here.
 *
 * Keep this as it is for now.
 */

const Users = {
  create: async (doc) => {
    const userId = uniqid();
    const docModified = { ...doc, uid: userId };
    await usersRef.doc(userId).set(docModified);
    return docModified;
  },
  findOne: async (id) => {
    const doc = await usersRef.doc(id).get();
    if (!doc.exists) return null;
    return doc.data();
  },
  update: async (id, doc) => {
    await usersRef.doc(id).set(doc, { merge: true });
    return { id, ...doc };
  },
  delete: async (id) => {
    await usersRef.doc(id).delete();
  },
};

module.exports = Users;
