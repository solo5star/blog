/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import { createFilePath } from 'gatsby-source-filesystem';
import path from 'node:path';

// Define the template for blog post
const BlogPost = path.resolve(`./src/templates/BlogPost.tsx`);
const HeadlessPost = path.resolve(`./src/templates/HeadlessPost.tsx`);

/** @type {import('gatsby').GatsbyNode['createPages']} */
export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            source
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
      categoriesGroup: allMdx(limit: 2000) {
        group(field: { frontmatter: { categories: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }

  const posts = result.data.allMdx.nodes;
  const blogPosts = posts.filter((post) => post.fields.source === 'blog');
  const headlessPosts = posts.filter((post) => post.fields.source === 'page');

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  blogPosts.forEach((post, index) => {
    const previousPostId = blogPosts[index - 1]?.id ?? null;
    const nextPostId = blogPosts[index + 1]?.id ?? null;

    createPage({
      path: post.fields.slug,
      component: `${BlogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    });
  });

  headlessPosts.forEach((post) => {
    createPage({
      path: post.fields.slug,
      component: `${HeadlessPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
      },
    });
  });
};

/** @type {import('gatsby').GatsbyNode['onCreateNode']} */
export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    // the source name will be on this parent node
    const { sourceInstanceName } = getNode(node.parent);

    // add the source name to the Mdx node
    createNodeField({
      node,
      name: 'source',
      value: sourceInstanceName,
    });
  }
};

/** @type {import('gatsby').GatsbyNode['createSchemaCustomization']} */
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      links: JSON
    }

    type Author {
      name: String
      summary: String
      about: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      categories: [String]
      tags: [String]
    }

    type Fields {
      source: String
      slug: String
    }
  `);
};
