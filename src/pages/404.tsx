import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

type NotFoundPageProps = PageProps<Queries.Query>;

const NotFoundPage = (props: NotFoundPageProps) => {
  const { data, location } = props;

  const siteTitle = data.site?.siteMetadata?.title ?? undefined;

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => <SEO title="404: Not Found" />;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
