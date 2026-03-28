import path from "path";

export const authDir = path.join(__dirname, "..", ".auth");

export const adminAuthFile = path.join(authDir, "admin.json");
export const userAuthFile = path.join(authDir, "user.json");