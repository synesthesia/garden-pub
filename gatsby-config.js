module.exports = {
  pathPrefix: ``,
  siteMetadata: {
    title: `My Digital Garden`,
  },
  plugins: [
    `@pauliescanlon/gatsby-mdx-embed`,
    {
      resolve: `gatsby-theme-garden`,
      options: {
        rootNote: "/readme",
        contentPath: `${__dirname}/notes`,
        ignore: [
          "**/_layouts/**",
          "**/.git/**",
          "**/.github/**",
          "**/.vscode/**",
          "**/netlify.toml",
          "**/*.sh",
          "**/.gitkeep",
          "**/Vagrantfile"
        ],
      },
    },
  ],
};
