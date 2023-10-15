/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import blogConfig from './blog-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @type {import('gatsby').GatsbyConfig}
 */
export default {
  siteMetadata: blogConfig,
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-image',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'page',
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        ...blogConfig.manifest,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-robots-txt',
    //   options: {
    //     host: 'https://www.example.com',
    //     sitemap: 'https://www.example.com/sitemap.xml',
    //     policy: [{ userAgent: '*', allow: '/' }],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 630,
              withWebp: true,
              withAvif: true,
              showCaptions: true,
              quality: 100,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-images-zoom',
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeMdxCodeProps, rehypeSlug],
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMdx } }) => {
    //           return allMdx.nodes.map((node) => {
    //             return Object.assign({}, node.frontmatter, {
    //               description: node.excerpt,
    //               date: node.frontmatter.date,
    //               url: site.siteMetadata.siteUrl + node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + node.fields.slug,
    //               custom_elements: [{ 'content:encoded': node.html }],
    //             });
    //           });
    //         },
    //         query: `{
    //           allMdx(sort: {frontmatter: {date: DESC}}) {
    //             nodes {
    //               excerpt
    //               fields {
    //                 slug
    //               }
    //               frontmatter {
    //                 title
    //                 date
    //               }
    //             }
    //           }
    //         }`,
    //         output: '/rss.xml',
    //         title: 'Gatsby Starter Blog RSS Feed',
    //       },
    //     ],
    //   },
    // },
  ],
};
