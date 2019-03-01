const config = {
  mongodb: {
    url: process.env.MONGO_URI,
    databaseName: process.env.MONGO_DATABASE,
    options: {
      useNewUrlParser: true
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog"
};
module.exports = config;
