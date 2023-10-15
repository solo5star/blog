import styled from '@emotion/styled';
import type { PageProps } from 'gatsby';
import { graphql, navigate } from 'gatsby';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostListItem from '../components/post/PostListItem';

type IndexPageProps = PageProps<Queries.Query>;

const IndexPage = (props: IndexPageProps) => {
  const { data, location } = props;

  const siteTitle = data.site?.siteMetadata?.title || 'Blog';
  const posts = data.allMdx.nodes.map((post) => ({
    title: (post.frontmatter?.title || post.fields?.slug) ?? undefined,
    description: (post.frontmatter?.description || post.excerpt) ?? undefined,
    date: post.frontmatter?.date ? new Date(post.frontmatter.date) : undefined,
    link: post.fields?.slug || undefined,
    categories: post?.frontmatter?.categories ?? undefined,
  }));
  const categories = data.allMdx.group
    .map(({ fieldValue, totalCount }) => ({ name: fieldValue, totalCount }))
    .sort((a, b) => b.totalCount - a.totalCount);

  const selectedCategory = new URLSearchParams(location.search).get('category');

  const handleSelectCategory = (category: string | null) => {
    navigate(category ? `/?category=${category}` : '/', { replace: true });
  };

  const postsByCategory = selectedCategory
    ? posts.filter((post) => post.categories?.includes(selectedCategory))
    : undefined;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the
          "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <CategoryList>
        <CategoryListItem>
          <CategoryButton onClick={() => handleSelectCategory(null)} $selected={selectedCategory === null}>
            전체 ({posts.length})
          </CategoryButton>
        </CategoryListItem>

        {categories.map((category) => (
          <CategoryListItem key={category.name}>
            <CategoryButton
              onClick={() => handleSelectCategory(category.name)}
              $selected={selectedCategory === category.name}
            >
              {category.name} ({category.totalCount})
            </CategoryButton>
          </CategoryListItem>
        ))}
      </CategoryList>
      <PostList>
        {(postsByCategory || posts).map((post) => (
          <li key={post.link}>
            <PostListItem title={post.title} description={post.description} date={post.date} link={post.link} />
          </li>
        ))}
      </PostList>
    </Layout>
  );
};

export default IndexPage;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <SEO title="All posts" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }, filter: { fields: { source: { eq: "blog" } } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date
          title
          description
          categories
        }
        tableOfContents
      }
      group(field: { frontmatter: { categories: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

const PostList = styled.ol`
  margin: 0;
  list-style: none;
`;

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);

  margin: 0;

  list-style: none;
`;

const CategoryListItem = styled.li`
  margin: 0;
`;

const CategoryButton = styled.button<{ $selected?: boolean }>`
  cursor: pointer;

  padding: 8px 8px;

  font-size: var(--fontSize-0);
  color: ${({ $selected }) => ($selected ? 'white' : 'none')};

  background: ${({ $selected }) => ($selected ? '#3f3f3f' : 'none')};
  border: 1px solid #3f3f3f;
  border-radius: 8px;
  outline: none;
`;
