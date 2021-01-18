module.exports = {
  async up(db, client) {
    return db
      .collection("camps")
      .updateMany(
        { pickups: { $exists: false } },
        { $set: { pickups: ["north", "central", "south"] } }
      );
  },

  async down(db, client) {
    return;
  }
};
