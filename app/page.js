export default function Home() {
  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔥 Clube Exclusivo</h1>

        <p style={styles.subtitle}>
          Entre no grupo privado e desbloqueie conteúdos exclusivos todos os dias.
        </p>

        <div style={styles.benefits}>
          <p>✅ Acesso imediato</p>
          <p>✅ Conteúdo diário</p>
          <p>✅ Comunidade ativa</p>
        </div>

        <a
          href="https://t.me/+lDPzzGePx99kMDE9"
          target="_blank"
          style={styles.button}
        >
          ENTRAR NO TELEGRAM
        </a>

        <p style={styles.warning}>
          ⚠️ Vagas limitadas
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #000000, #7f1d1d, #000000)",
    color: "white",
    fontFamily: "Arial"
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)"
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#facc15"
  },
  subtitle: {
    marginTop: "10px",
    color: "#d1d5db"
  },
  benefits: {
    marginTop: "20px",
    textAlign: "left"
  },
  button: {
    display: "block",
    marginTop: "20px",
    background: "#facc15",
    color: "black",
    padding: "12px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold"
  },
  warning: {
    marginTop: "15px",
    fontSize: "12px",
    color: "#9ca3af"
  }
};
