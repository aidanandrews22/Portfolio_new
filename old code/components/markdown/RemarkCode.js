import React, { useEffect, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Import languages
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import swift from 'react-syntax-highlighter/dist/esm/languages/prism/swift';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin';
import scala from 'react-syntax-highlighter/dist/esm/languages/prism/scala';
import haskell from 'react-syntax-highlighter/dist/esm/languages/prism/haskell';
import lua from 'react-syntax-highlighter/dist/esm/languages/prism/lua';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import powershell from 'react-syntax-highlighter/dist/esm/languages/prism/powershell';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);
SyntaxHighlighter.registerLanguage('scala', scala);
SyntaxHighlighter.registerLanguage('haskell', haskell);
SyntaxHighlighter.registerLanguage('lua', lua);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('powershell', powershell);

const RemarkCode = ({ children, className, inline }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'text';

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return !inline ? (
    <div className="relative">
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <button className="absolute top-2 right-2 p-1 rounded bg-gray-800 text-white opacity-50 hover:opacity-100 transition-opacity">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter
        style={oneDark}
        language={lang}
        PreTag="div"
        className="rounded-md"
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className}>{children}</code>
  );
};

export default RemarkCode;