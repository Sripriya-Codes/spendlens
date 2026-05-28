export async function saveAudit(id: string, auditData: any, email?: string, company?: string) {
  try {
    const neonUrl = import.meta.env.VITE_NEON_URL;
    // Parse connection string to get fetch endpoint
    // Format: postgresql://user:pass@host/db
    const url = new URL(neonUrl.replace("postgresql://", "https://"));
    const endpoint = `https://${url.hostname}/sql`;
    const credentials = btoa(`${url.username}:${url.password}`);
    
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`,
        "Neon-Connection-String": neonUrl,
      },
      body: JSON.stringify({
        query: "INSERT INTO audits (id, audit_data, email, company) VALUES ($1, $2::jsonb, $3, $4) ON CONFLICT (id) DO NOTHING",
        params: [id, JSON.stringify(auditData), email || null, company || null],
      }),
    });
    return true;
  } catch (e) {
    console.error("DB save failed (non-critical):", e);
    return false;
  }
}