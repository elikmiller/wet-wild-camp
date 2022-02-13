module.exports = {
  async up(db, client) {
    return db
      .collection("registrations")
      .updateMany(
        { notes: { $exists: false } },
        { $set: { notes: "" } }
      );
  },

  async down(db, client) {
    return db
      .collection("registrations")
      .updateMany(
        { notes: { $exists: true } },
        { $unset: { notes: "" } }
      )
  }
};
