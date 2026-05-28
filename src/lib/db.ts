export async function saveAudit(id: string, auditData: any, email?: string, company?: string) {
  try {
    const neonUrl = import.meta.env.VITE_NEON_URL;
    if (!neonUrl) return false;

    // Neon supports a simple HTTP query endpoint
    // Connection string format: postgresql://user:password@host/dbname
    const match = neonUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/(.+)/);
    if (!match) return false;

    const [, user, password, host, db] = match;
    const endpoint = `https://${host}/sql`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(`${user}:${password}`),
        "Neon-Pool-Opt-In": "true",
      },
      body: JSON.stringify({
        query: "INSERT INTO audits (id, audit_data, email, company) VALUES ($1, $2::jsonb, $3, $4) ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, company = EXCLUDED.company",
        params: [id, JSON.stringify(auditData), email ?? null, company ?? null],
      }),
    });

    return res.ok;
  } catch (e) {
    console.error("DB save failed (non-critical):", e);
    return false;
  }
}