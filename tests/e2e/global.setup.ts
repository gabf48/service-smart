export default async function globalSetup() {
  console.log("────────────────────────────");
  console.log("Environment:", process.env.PLAYWRIGHT_BASE_URL);
  console.log("Build:", process.env.NEXT_PUBLIC_APP_VERSION);
  console.log("────────────────────────────");
}