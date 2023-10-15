/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import styled from '@emotion/styled';
import { StaticImage } from 'gatsby-plugin-image';
import useBio from '../hooks/useBio';

const Bio = () => {
  const bio = useBio();
  const { author, links } = bio;

  return (
    <Root>
      <Avatar>
        <StaticImage
          layout="fixed"
          formats={['auto', 'webp', 'avif']}
          src="../images/profile.png"
          width={80}
          height={80}
          quality={100}
          alt="Profile picture"
        />
      </Avatar>
      {author?.name && (
        <div>
          <Title>
            Written by <strong>{author.name}</strong>
          </Title>
          {author.summary && <Summary>{author.summary}</Summary>}
          {links && (
            <Links>
              {Object.entries(links).map(([label, link]) => (
                <Link key={label} target="_blank" href={link as string}>
                  {label}
                </Link>
              ))}
            </Links>
          )}
        </div>
      )}
    </Root>
  );
};

export default Bio;

const Root = styled.div`
  display: flex;
  margin-bottom: var(--spacing-16);

  & p {
    margin-bottom: var(--spacing-0);
  }
`;

const Avatar = styled.div`
  overflow: hidden;
  flex-shrink: 0;

  width: 80px;
  height: 80px;
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);

  border-radius: 100%;
`;

const Title = styled.p`
  margin-top: var(--spacing-3);
  font-size: var(--fontSize-2);
`;

const Summary = styled.p`
  font-size: var(--fontSize-1);
`;

const Links = styled.div`
  margin-top: var(--spacing-2);
`;

const Link = styled.a`
  display: inline;
  font-size: var(--fontSize-0);
  text-decoration: none;

  &:not(:first-child) {
    margin-left: var(--spacing-4);
  }
`;
