import "dotenv/config";
import dns from "node:dns";

// Some local networks (often on Windows) can't resolve Atlas "mongodb+srv" SRV records.
// Set DNS_SERVERS=8.8.8.8,1.1.1.1 in .env for local dev. Not needed on Render.
if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}
