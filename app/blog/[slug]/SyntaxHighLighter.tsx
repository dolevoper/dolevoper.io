"use client";
import { useEffect, useId, useState } from "react";
import { PrismLight } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";

PrismLight.registerLanguage("javascript", javascript);

const getInitialTheme = () => window.matchMedia("(prefers-color-scheme: light)").matches ? oneLight : oneDark;

type SyntaxHighlighterProps = {
    language: string;
    label?: string;
    children: string | string[];
};

export default function SyntaxHighlighter({ language, label, children }: SyntaxHighlighterProps) {
    const [theme, setTheme] = useState(getInitialTheme);
    const id = useId();
    const preId = `${id}__pre`;
    const labelId = `${id}__label`;

    useEffect(() => {
        function updateTheme(e: MediaQueryListEvent) {
            setTheme(e.matches ? oneLight : oneDark);
        }

        const mql = window.matchMedia("(prefers-color-scheme: light)");

        mql.addEventListener("change", updateTheme);

        return () => {
            mql.removeEventListener("change", updateTheme);
        };
    }, []);

    return (
        <>
            <PrismLight
                language={language}
                showLineNumbers
                id={preId}
                aria-labelledby={labelId}
                style={{
                    ...theme,
                    "pre[class*=\"language-\"]": {
                        ...theme["pre[class*=\"language-\"]"],
                        paddingInlineStart: 0
                    } as any
                }}>{children}</PrismLight>
            {label ? <label htmlFor={preId}>{label}</label> : undefined}
        </>
    );
}