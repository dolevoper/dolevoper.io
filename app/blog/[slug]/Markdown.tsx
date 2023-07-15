import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const SyntaxHighlighter = dynamic(() => import("./SyntaxHighLighter"), {
    ssr: false,
    loading(loadingProps) {
        console.log(loadingProps);
        return <code>Loading code snippet...</code>
    }
});

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