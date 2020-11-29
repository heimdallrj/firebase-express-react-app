const admin = require('firebase-admin');
const uniqid = require('uniqid');

const ds = admin.firestore();
const ordersRef = ds.collection('orders');

/** TODO
 * Here, in both `orders.js` and `users.js`
 * has some code logic duplication which can simplify further.
 *
 * Wrting a single firebase collection handler and
 * reuse it as required is the best appraoch here.
 *
 * Keep this as it is for now.
 */

const Orders = {
  create: async (doc) => {
    const orderId = uniqid();
    const docModified = { ...doc, uid: orderId };
    await ordersRef.doc(orderId).set(docModified);
    return docModified;
  },
  findAll: async () => {
    // TODO Should impliment pagination
    const snapshot = await ordersRef.get();
    return snapshot.docs.map((doc) => doc.data());
  },
  findOne: async (id) => {
    const doc = await ordersRef.doc(id).get();
    if (!doc.exists) return null;
    return doc.data();
  },
  update: async (id, doc) => {
    await ordersRef.doc(id).set(doc, { merge: true });
    return { id, ...doc };
  },
  delete: async (id) => {
    await ordersRef.doc(id).delete();
  },
};

module.exports = Orders;
