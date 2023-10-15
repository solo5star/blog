import styled from '@emotion/styled';
import { Link } from 'gatsby';

const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium',
});

type PostListItemProps = {
  title?: string;
  description?: string;
  date?: Date;
  link?: string;
};

const PostListItem = (props: PostListItemProps) => {
  const { title, description, date, link } = props;

  return (
    <Root itemScope itemType="http://schema.org/Article">
      <Header>
        <Title>
          {link ? (
            <Link to={link}>
              <span itemProp="headline">{title}</span>
            </Link>
          ) : (
            <span itemProp="headline">{title}</span>
          )}
        </Title>
        <Section>
          {description && <p dangerouslySetInnerHTML={{ __html: description }} itemProp="description" />}
        </Section>
        {date && <PublishedDate>{dateTimeFormat.format(date)}</PublishedDate>}
      </Header>
    </Root>
  );
};

export default PostListItem;

const Root = styled.article`
  margin-top: var(--spacing-10);
  margin-bottom: var(--spacing-10);
`;

const Header = styled.header`
  margin-bottom: var(--spacing-4);
`;

const Title = styled.h2`
  margin-top: var(--spacing-0);
  margin-bottom: var(--spacing-2);
  font-size: var(--fontSize-3);
  color: var(--color-primary);
`;

const Section = styled.section``;

const PublishedDate = styled.small`
  color: var(--color-text-light);
`;
