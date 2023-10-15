import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import useBio from '../../hooks/useBio';

const ArticleWritter = () => {
  const bio = useBio();
  const { author } = bio;

  return (
    <Root>
      <Avatar>
        <StaticImage
          layout="fixed"
          formats={['auto', 'webp', 'avif']}
          src="../../images/profile.png"
          width={30}
          height={30}
          quality={100}
          alt="Profile picture"
        />
      </Avatar>
      {author?.name && (
        <Title>Written by {author.about ? <Link to={author.about}>{author.name}</Link> : author.name}</Title>
      )}
    </Root>
  );
};

export default ArticleWritter;

const Root = styled.div`
  display: flex;
  align-items: center;

  margin-top: var(--spacing-2);

  font-family: var(--font-body);
  color: var(--color-text-light);

  & p {
    margin: 0;
    font-size: var(--fontSize-0);
  }

  & a {
    font-weight: var(--fontWeight-bold);
    text-decoration: none;
  }
`;

const Avatar = styled.div`
  overflow: hidden;

  width: 30px;
  height: 30px;
  margin-right: var(--spacing-2);

  border-radius: 100%;
`;

const Title = styled.p``;
