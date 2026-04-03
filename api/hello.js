export default function handler(req, res) {
  res.status(200).json({ 
      status: "ok",
      service: "github-streak-stats-api",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      endpoints: {
        stats: "/api/streak/stats?user=username",
        hello: "/api/hello"
      },
      message: "Hello, world from VERCEL API!",
      note: "For real GitHub Stats, use: /api/streak/stats?user=<username> endpoint."
     });
}