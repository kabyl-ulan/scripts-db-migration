import cron from "node-cron";
import { dbQuery } from "../../config/db";

export function refreshMv() {
  cron.schedule(
    "0 1 * * *", // каждый день в 01:00
    async () => {
      console.log("CRON: Refresh materialized view started...");

      const sql = `REFRESH MATERIALIZED VIEW CONCURRENTLY mv_university_specialties`;

      try {
        await dbQuery(sql);

        console.log("CRON: Refresh completed successfully.");
      } catch (err) {
        console.error("CRON ERROR refreshing MV:", err);
      }
    },
    { timezone: "Asia/Bishkek" }
  );
}
