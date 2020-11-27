const admin = require("firebase-admin");
const uniqid = require("uniqid");

const ds = admin.firestore();
const usersRef = ds.collection("users");

const Users = {
  create: async (doc) => {
    const userId = uniqid();
    const docModified = { ...doc, uid: userId };
    await usersRef.doc(userId).set(docModified);
    return docModified;
  },
  findAll: async () => {
    const snapshot = await usersRef.get();
    return snapshot.docs.map((doc) => doc.data());
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
};

module.exports = Users;
