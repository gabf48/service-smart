export default function AppVersion() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION || "dev";

  return (
    <div
      data-testid="app-version"
       title={`Version ${version}`}
      style={{
        position: "fixed",
        right: "16px",
        bottom: "16px",
        zIndex: 2147483647,
        background: "#000",
        color: "#0f0",
        padding: "8px 12px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: 700,
        border: "1px solid rgba(255,255,255,0.2)",
        pointerEvents: "none",
      }}
    >
      APP_VERSION:{version}
    </div>
  );
}