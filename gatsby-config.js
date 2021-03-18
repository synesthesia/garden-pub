module.exports = {
  pathPrefix: ``,
  siteMetadata: {
    title: `My Digital Garden`,
  },
  plugins: [
     {
       resolve: `gatsby-plugin-manifest`,
       options: {
         name: `Synesthesia Digital Garden`,
         short_name: `Digital Garden`,
         start_url: `/`,
         background_color: `#00843D`,
         theme_color: `#00843D`,
         // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
         // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
         display: `standalone`,
         icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
       },
     },
    {
      resolve: `@synesthesia/gatsby-theme-garden`,
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
          "**/Vagrantfile",
          "**/.obsidian/**",
          "**/obsidian.css"
        ],
      }
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "paths",
        engine: "flexsearch",
        query: `{
          allFile {
            nodes {
              id
              ext
              fields {
                title
                slug
              }
              childMdx {
                excerpt
              }
            }
          }
        }`,

        index: ["path"],

        store: ["id", "path", "title", "excerpt"],

        normalizer: ({ data }) =>
          data.allFile.nodes
            .filter((node) => node.ext === ".md")
            .map((node) => ({
              id: node.id,
              path: node.fields.slug,
              title: node.fields.title,
              // Replace weirdly formatted [ link ] in excerpt to look like wikilinks ([link])
              excerpt: node.childMdx.excerpt.replace(
                /\[\s([\w'-]+)\s\]/gi,
                (_, p1) => `[${p1}]`
              ),
            })),
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "titles",
        engine: "flexsearch",
        query: `{
          allFile {
            nodes {
              id
              ext
              fields {
                title
              }
            }
          }
        }`,

        index: ["title"],

        store: [],

        normalizer: ({ data }) =>
          data.allFile.nodes
            .filter((node) => node.ext === ".md")
            .map((node) => ({
              id: node.id,
              title: node.fields.title,
            })),
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "bodies",
        engine: "flexsearch",
        query: `{
          allFile {
            nodes {
              id
              ext
              childMdx {
                rawBody
              }
            }
          }
        }`,

        index: ["body"],

        store: [],

        normalizer: ({ data }) =>
          data.allFile.nodes
            .filter((node) => node.ext === ".md")
            .map((node) => ({
              id: node.id,
              body: node.childMdx.rawBody,
            })),
      },
    },
  ],
};
