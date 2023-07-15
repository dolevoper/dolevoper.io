import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "./SyntaxHighLighter";

export default function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown components={{
            code({ node, inline, className, children, ...props }) {
                const hasLang = /language-(\w+)/.exec(className ?? "");

                return hasLang ?
                    <SyntaxHighlighter language={hasLang[1]}>{children as string | string[]}</SyntaxHighlighter> :
                    <code className={className} {...props}>{children}</code>
            }
        }}>
            {children}
        </ReactMarkdown>
    );
}