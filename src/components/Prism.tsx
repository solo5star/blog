// Highlighting for code blocks
// import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
// import 'prismjs/themes/prism-dark.css';

import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
import '../styles/prism.css';

import Prism from 'prismjs';

globalThis.Prism = globalThis.Prism || {};
Prism.manual = true;

import 'prismjs/plugins/diff-highlight/prism-diff-highlight';
import 'prismjs/plugins/line-highlight/prism-line-highlight';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-hcl';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';

export default Prism;
