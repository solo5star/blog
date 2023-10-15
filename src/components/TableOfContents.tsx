import styled from '@emotion/styled';
import { Link } from 'gatsby';
import type { TOCItemTree } from '../types';

type TOCTreeProps = {
  toc: TOCItemTree;
};

const TOCTree = (props: TOCTreeProps) => {
  const { toc } = props;

  return (
    <TOCUList>
      {toc.map((item) => (
        <TOCLI key={item.url}>
          <Link to={item.url}>{item.title}</Link>
          {item.items && <TOCTree toc={item.items} />}
        </TOCLI>
      ))}
    </TOCUList>
  );
};

type TableOfContentsProps = {
  toc: TOCItemTree;
};

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc } = props;

  return (
    <Container>
      <TOCTree toc={toc} />
    </Container>
  );
};

export default TableOfContents;

const Container = styled.div`
  font-size: var(--fontSize-0);
  color: var(--color-heading);
`;

const TOCUList = styled.ul`
  margin-top: 0;
  margin-left: 0;
  list-style: none;
`;

const TOCLI = styled.li`
  margin: var(--spacing-2) 0;

  & > a {
    opacity: 0.5;
    transition: opacity 0.05s;
  }

  & > a:hover {
    opacity: 1;
  }

  & > ${TOCUList} {
    margin-left: var(--spacing-4);
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;
