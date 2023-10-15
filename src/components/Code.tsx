import type { ComponentPropsWithoutRef } from 'react';

type CodeProps = ComponentPropsWithoutRef<'code'>;

const Code = (props: CodeProps) => <code className="language-text" {...props} />;

export default Code;
