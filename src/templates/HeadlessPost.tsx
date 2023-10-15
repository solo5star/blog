import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import Article from '../components/article/Article';
import type { TOCItemTree } from '../types';

type HeadlessPostProps = PageProps<Queries.HeadlessPostBySlugQuery>;

const HeadlessPost = (props: HeadlessPostProps) => {
  const { data, location, children } = props;
  const { site, mdx: post } = data;

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
    </Layout>
  );
};

export default HeadlessPost;

export const pageQuery = graphql`
  query HeadlessPostBySlug($id: String!) {
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
  }
`;
