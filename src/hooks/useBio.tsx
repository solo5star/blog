import { graphql, useStaticQuery } from 'gatsby';
import { useMemo } from 'react';

const useBio = () => {
  const data = useStaticQuery<Queries.BioQueryQuery>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
            about
          }
          links
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site?.siteMetadata?.author;
  const links = data.site?.siteMetadata?.links;

  const bio = useMemo(
    () => ({
      author,
      links,
    }),
    [],
  );

  return bio;
};

export default useBio;
