const nowInThailand = new Date().toLocaleDateString("en-US", {
  timeZone: "Asia/Bangkok",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
export const [mb, db, yb] = nowInThailand.split("/");
