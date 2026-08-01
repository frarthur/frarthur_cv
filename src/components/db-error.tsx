export default function DbError() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--eerie-black-2, #1a1a1a)", flexDirection: "column", gap: 20 }}>
      <h1 style={{ color: "#e74c3c", fontSize: 24, fontWeight: 700 }}>Base de donnees inaccessible</h1>
      <p style={{ color: "var(--light-gray-70)", fontSize: 14, maxWidth: 400, textAlign: "center" }}>Impossible de charger les donnees du portfolio depuis Supabase. Verifie ta connexion ou le statut du projet.</p>
      <button onClick={() => window.location.reload()} style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: "var(--orange-yellow-crayola)", color: "#000", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Reessayer</button>
    </div>
  );
}
