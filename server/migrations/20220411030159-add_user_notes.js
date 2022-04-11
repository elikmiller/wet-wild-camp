module.exports = {
  async up(db, client) {
    return db
      .collection("users")
      .updateMany(
        { notes: { $exists: false } },
        { $set: { notes: "" } }
      );
  },

  async down(db, client) {
    return db
      .collection("users")
      .updateMany(
        { notes: { $exists: true } },
        { $unset: { notes: "" } }
      )
  }
};
