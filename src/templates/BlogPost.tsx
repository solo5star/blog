import styled from '@emotion/styled';
import type { HeadProps, PageProps } from 'gatsby';
import { Link, graphql } from 'gatsby';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Article from '../components/article/Article';
import type { TOCItemTree } from '../types';

type BlogPostProps = PageProps<Queries.BlogPostBySlugQuery>;

const BlogPost = (props: BlogPostProps) => {
  const { data, location, children } = props;
  const { previous, next, site, mdx: post } = data;

  const siteTitle = site?.siteMetadata?.title || undefined;

  const title = post?.frontmatter?.title || undefined;
  const categories = (post?.frontmatter?.categories ?? undefined) as string[] | undefined;
  const date = post?.frontmatter?.date ? new Date(post.frontmatter.date) : undefined;
  const toc = (post?.tableOfContents?.items ?? undefined) as TOCItemTree | undefined;

  return (
    <Layout location={location} title={siteTitle}>
      <Article title={title} categories={categories} date={date} toc={toc}>
        {children}
      </Article>
      <hr />
      <footer>
        <Bio />
      </footer>
      <BlogPostNav>
        <BlogPostNavList>
          <BlogPostNavListItem>
            {previous && (
              <Link to={previous.fields?.slug ?? ''} rel="prev">
                ← {previous.frontmatter?.title}
              </Link>
            )}
          </BlogPostNavListItem>
          <BlogPostNavListItem>
            {next && (
              <Link to={next.fields?.slug ?? ''} rel="next">
                {next.frontmatter?.title} →
              </Link>
            )}
          </BlogPostNavListItem>
        </BlogPostNavList>
      </BlogPostNav>
    </Layout>
  );
};

export default BlogPost;

export const Head = (props: HeadProps<Queries.Query>) => {
  const {
    data: { mdx: post },
  } = props;

  return (
    <SEO
      title={post?.frontmatter?.title || undefined}
      description={post?.frontmatter?.description || post?.excerpt || undefined}
    />
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date
        description
        categories
        tags
      }
      tableOfContents
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

const BlogPostNav = styled.nav`
  & ul {
    margin: var(--spacing-0);
  }
`;

const BlogPostNavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 0;

  list-style: none;
`;

const BlogPostNavListItem = styled.li``;
