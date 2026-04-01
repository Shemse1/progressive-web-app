const args = process.argv.slice(2);
const pkgArgs = args.find((it) => it.startsWith("--package=")) || [];
const pkgName = pkgArgs.split("=")[1] || "no-release";

const headerPattern = new RegExp(`^(\\w+)\\((${pkgName})\\):\\s+(.*)$`);

module.exports = {
  tagFormat: pkgName + "-v${version}",
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        parserOpts: {
          headerPattern,
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        writerOpts: {
          headerPartial: `## 🚀 ${pkgName}` + "-v{{version}}({{date}})\n\n",
          transform: (_commit, context) => {
            const commit = { ..._commit };
            if (!commit.scope) return;

            // Add PR link if available
            if (commit.pullRequest && commit.pullRequest.number) {
              commit.pr = `([#${commit.pullRequest.number}](${context.repository}/pull/${commit.pullRequest.number}))`;
            }

            // Generate short hash with link
            if (commit.hash) {
              commit.shortHash = `([\`${commit.hash.substring(0, 7)}\`](${
                context.repository
              }/commit/${commit.hash}))`;
            }

            if (commit.type === "feat") {
              commit.type = "✨ Features";
            } else if (commit.type === "fix") {
              commit.type = "🐛 Bug Fixes";
            } else {
              commit.type = "🛠️ Other Changes";
            }

            return commit;
          },

          // Define the commit message format in release notes
          commitPartial: "- **{{subject}}**{{pr}} {{shortHash}}\n",
        },
        parserOpts: {
          headerPattern,
        },
      },
    ],
    [
      "@semantic-release/npm",
      { npmPublish: true, pkgRoot: `packages/${pkgName}` },
    ],
    "@semantic-release/github",
    // [
    //   "@semantic-release/git",
    //   {
    //     message:
    //       `chore(release): Bump ${pkgName} to ` +
    //       "v${nextRelease.version} [skip ci]",
    //   },
    // ],
  ],
};
