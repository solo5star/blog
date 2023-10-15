import { MDXProvider } from '@mdx-js/react';
import type { PropsWithChildren } from 'react';
import Code from './Code';
import CodeBlock from './CodeBlock';
import Image from './Image';
import LazyComponent from './LazyComponent';

type ProvidersProps = PropsWithChildren;

const Providers = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <MDXProvider
      components={{
        pre: CodeBlock,
        LazyComponent,
        img: Image,
        code: Code,
      }}
    >
      {children}
    </MDXProvider>
  );
};

export default Providers;
