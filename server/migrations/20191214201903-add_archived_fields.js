module.exports = {
  async up(db, client) {
    await db
      .collection("camps")
      .updateMany({ archived: { $exists: false } }, { $set: { "archived": false } });
    await db
      .collection("registrations")
      .updateMany({ archived: { $exists: false } }, { $set: { "archived": false } });
    await db
      .collection("payments")
      .updateMany({ archived: { $exists: false } }, { $set: { "archived": false } });
    return Promise.resolve();
  },

  async down(db) {
    return;
  }
};
