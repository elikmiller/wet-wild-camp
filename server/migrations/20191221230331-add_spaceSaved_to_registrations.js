module.exports = {
  async up(db, client) {
    return db
      .collection("registrations")
      .updateMany(
        { spaceSaved: { $exists: false } },
        { $set: { spaceSaved: false } }
      );
  },

  async down(db, client) {
    return;
  }
};
