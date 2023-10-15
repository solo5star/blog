import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Providers from './Providers';

type LayoutProps = React.PropsWithChildren<{
  location: Location;
  title?: string;
}>;

const Layout = (props: LayoutProps) => {
  const { location, title, children } = props;

  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <Providers>
      <GlobalWrapper>
        <GlobalHeader>
          {isRootPath ? (
            <MainHeading>
              <Link to="/">{title}</Link>
            </MainHeading>
          ) : (
            <HeaderLinkHome to="/">{title}</HeaderLinkHome>
          )}
        </GlobalHeader>
        <main>{children}</main>
        <footer>
          <Copyright>
            © {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
          </Copyright>
        </footer>
      </GlobalWrapper>
    </Providers>
  );
};

export default Layout;

const GlobalWrapper = styled.div`
  max-width: var(--maxWidth-wrapper);
  margin: var(--spacing-0) auto;
  padding: var(--spacing-10) var(--spacing-5);
`;

const GlobalHeader = styled.header`
  margin-bottom: var(--spacing-12);
`;

const Copyright = styled.span`
  display: block;
  text-align: center;
`;

const MainHeading = styled.h1`
  margin: 0;
  font-size: var(--fontSize-7);
`;

const HeaderLinkHome = styled(Link)`
  font-family: var(--font-heading);
  font-size: var(--fontSize-2);
  font-weight: var(--fontWeight-bold);
  text-decoration: none;
`;
