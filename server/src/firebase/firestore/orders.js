const admin = require('firebase-admin');
const uniqid = require('uniqid');

const ds = admin.firestore();
const ordersRef = ds.collection('orders');

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
};

module.exports = Orders;
