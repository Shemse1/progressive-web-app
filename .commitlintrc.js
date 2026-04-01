const fs = require("fs");
const path = require("path");

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", ["sentence-case"]],
    "scope-enum": async () => {
      const scopes = await getScopesFromGit();
      return [2, "always", scopes];
    },
    "scope-case": [2, "always", "kebab-case"],
    "scope-empty": async () => {
      const scopes = await getScopesFromGit();
      if (scopes.length === 0) return [0];

      return [2, "never", scopes];
    },
  },
};

async function getScopesFromGit() {
  const { execSync } = require("child_process");
  const changedFiles = execSync("git diff --cached --name-only")
    .toString()
    .split("\n");

  const scopes = new Set();
  changedFiles.forEach((file) => {
    const match = file.match(/^packages\/([^\/]+)/);
    if (match && fs.lstatSync(path.join("packages", match[1])).isDirectory())
      scopes.add(match[1]);
  });

  return Array.from(scopes);
}
