module.exports = {
  up(db) {
    return db
      .collection("registrations")
      .updateMany(
        { deleted: { $exists: false } },
        { $set: { deleted: false } }
      );
  },

  down(db) {
    return;
  }
};
