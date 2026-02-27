// app/build-info.ts
export const BUILD_INFO = {
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? "dev",
  gitSha: process.env.NEXT_PUBLIC_GIT_SHA ?? "local",
  buildDate: process.env.NEXT_PUBLIC_BUILD_DATE ?? "",
};