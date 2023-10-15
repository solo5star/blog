import styled from '@emotion/styled';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import Prism from './Prism';

type CodeBlockProps = ComponentPropsWithoutRef<'pre'> & {
  file?: string;
  diff?: boolean;
  highlight?: string;
};

const CodeBlock = (props: CodeBlockProps) => {
  const { children, file, diff, highlight, ...restProps } = props;

  const ref = useRef<HTMLPreElement>(null);
  const className = (children && typeof children === 'object' && 'props' in children && children.props.className) || '';
  let language: string = className.match(/language-(?<lang>.*)/)?.groups?.lang?.toLowerCase() || '';
  const code: string =
    (children && typeof children === 'object' && 'props' in children && children.props.children?.trimEnd()) || '';

  language = diff ? `diff-${language}` : language;

  const html = useMemo(() => {
    const grammar = diff ? Prism.languages.diff : Prism.languages[language] ?? Prism.languages.plain;

    return Prism.highlight(code, grammar, language);
  }, [code, language, diff]);

  useEffect(() => {
    Prism.plugins.lineHighlight.highlightLines(ref.current)();
  }, [code, language, highlight]);

  return (
    <Root>
      {file && <CodeBlockTitle>{file}</CodeBlockTitle>}
      <pre
        ref={ref}
        className={classNames(`language-${language}`, diff && 'diff-highlight')}
        data-line={highlight}
        {...restProps}
      >
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </Root>
  );
};

export default CodeBlock;

const CodeBlockTitle = styled.div`
  display: block;

  margin-top: 0.5em;
  padding: 0.5em 1em;

  font-size: 0.8em;
  color: black;
  color: #c3cee3;

  background: #263238;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

const Root = styled.div`
  &:has(${CodeBlockTitle}) > pre {
    margin-top: 0;
  }
`;
