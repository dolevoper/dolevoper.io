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

                if (!hasLang) {
                    return <code className={className} {...props}>{children}</code>;
                }

                const meta = node.data?.meta as string | undefined;
                const hasLabel = meta ? /\[(.*)\]/.exec(meta) : null;

                return <SyntaxHighlighter language={hasLang[1]} label={hasLabel?.[1]}>{children as string | string[]}</SyntaxHighlighter>;
            }
        }}>
            {children}
        </ReactMarkdown>
    );
}