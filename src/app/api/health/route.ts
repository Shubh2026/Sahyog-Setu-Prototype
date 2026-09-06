export async function GET() {
  return Response.json({ ok: true, database: "not configured" });
}
