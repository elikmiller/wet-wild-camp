const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
dotenvExpand(dotenv.config());
const { up, status, database } = require("migrate-mongo");

async function migrate() {
  const db = await database.connect();
  const migrationStatus = await status(db);
  if (
    migrationStatus.filter(status => status.appliedAt === "PENDING").length > 0
  ) {
    console.log("Running new database migrations...");
    const migrated = await up(db);
    migrated.forEach(fileName => console.log("Migrated:", fileName));
  } else {
    console.log("Database up to date.");
  }
  return await db.close();
}

exports.migrate = migrate;
