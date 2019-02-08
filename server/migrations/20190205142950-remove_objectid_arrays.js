module.exports = {
  async up(db) {
    await db
      .collection("camps")
      .update({}, { $unset: { campers: 1, waitlist: 1 } });
    await db.collection("campers").update({}, { $unset: { registrations: 1 } });
    await db
      .collection("users")
      .update({}, { $unset: { campers: 1, registrations: 1, payments: 1 } });
    return Promise.resolve();
  },

  down(db) {
    return;
  }
};
