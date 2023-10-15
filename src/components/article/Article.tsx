import styled from '@emotion/styled';
import { Link } from 'gatsby';
import type { PropsWithChildren } from 'react';
import type { TOCItemTree } from '../../types';
import TableOfContents from '../TableOfContents';
import ArticleWritter from './ArticleWritter';

const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium',
  timeStyle: 'short',
  hour12: false,
});

type ArticleProps = PropsWithChildren<{
  title?: string;
  categories?: string[];
  date?: Date;
  toc?: TOCItemTree;
}>;

const Article = (props: ArticleProps) => {
  const { title, categories, date, toc, children } = props;

  return (
    <Root itemScope itemType="http://schema.org/Article">
      <Header>
        <Title>{title || 'Untitled'}</Title>
        {categories && categories.length > 0 && (
          <Categories>
            {categories.map((category) => (
              <Category key={category}>
                <Link to={`/?category=${category}`}>{category}</Link>
              </Category>
            ))}
          </Categories>
        )}
        <ArticleWritter />
        {date && <PublishedDate>{dateTimeFormat.format(date)}</PublishedDate>}
      </Header>
      <Body itemProp="articleBody">
        {toc && toc.length > 0 && (
          <BodyAside>
            <TableOfContents toc={toc} />
          </BodyAside>
        )}
        <BodyContent>{children}</BodyContent>
      </Body>
    </Root>
  );
};

export default Article;

const Root = styled.article``;

const Header = styled.header`
  margin-bottom: var(--spacing-8);
  font-family: var(--font-heading);

  & p {
    margin: 0;
    font-size: var(--fontSize-1);
  }
`;

const Title = styled.h1`
  margin: var(--spacing-0) var(--spacing-0) var(--spacing-4) var(--spacing-0);
`;

const Categories = styled.ul`
  margin: 0;
  list-style: none;

  & > li {
    display: inline-block;
  }

  & > li:not(:first-child) {
    margin-left: var(--spacing-3);
  }
`;

const Category = styled.li`
  font-weight: 700;
  color: var(--color-primary);

  & a {
    text-decoration: none;
  }
`;

const PublishedDate = styled.p`
  font-family: var(--font-body);
  font-size: var(--fontSize-1);
  text-align: right;
`;

const Body = styled.section`
  display: grid;
  grid-template-columns: 100% 240px;
  font-family: var(--font-body);
`;

const BodyContent = styled.div`
  & img,
  & video {
    display: block;

    margin-top: var(--spacing-1);
    margin-right: auto;
    margin-bottom: var(--spacing-1);
    margin-left: auto;
  }
`;

const BodyAside = styled.aside`
  position: sticky;
  top: var(--spacing-16);

  grid-area: 1 / 2 / 1 / 2;
  align-self: flex-start;

  margin-left: var(--spacing-12);

  @media (max-width: 1200px) {
    display: none;
  }
`;
