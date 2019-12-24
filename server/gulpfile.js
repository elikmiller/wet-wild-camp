const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
dotenvExpand(dotenv.config());
const { up, status, database } = require("migrate-mongo");

async function migrate() {
  const connection = await database.connect();
  const migrationStatus = await status(connection.db, connection.client);
  if (
    migrationStatus.filter(status => status.appliedAt === "PENDING").length > 0
  ) {
    console.log("Running new database migrations...");
    const migrated = await up(connection.db, connection.client);
    migrated.forEach(fileName => console.log("Migrated:", fileName));
  } else {
    console.log("Database up to date.");
  }
  return await connection.client.close();
}

exports.migrate = migrate;
