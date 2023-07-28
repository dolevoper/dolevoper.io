"use client";
import { useEffect, useId, useReducer, useState } from "react";
import { PrismLight } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";

PrismLight.registerLanguage("javascript", javascript);

type SyntaxHighlighterProps = {
    language: string;
    label?: string;
    children: string | string[];
};

export default function SyntaxHighlighter({ language, label, children }: SyntaxHighlighterProps) {
    const {
        theme,
        preId,
        labelId,
        onCopy,
        copyText
    } = useSyntaxHighlighter(
        Array.isArray(children) ? children.join("\n") : children
    );

    return (
        <>
            <PrismLight
                language={language}
                showLineNumbers
                id={preId}
                aria-labelledby={labelId}
                data-lang={language}
                style={theme}>{children}</PrismLight>
            <button onClick={onCopy}>{copyText}</button>
            {label ? <label htmlFor={preId}>{label}</label> : undefined}
        </>
    );
}

const getInitialTheme = () => window.matchMedia("(prefers-color-scheme: light)").matches ? oneLight : oneDark;

type CopyState = "not copied" | "copying" | "copied";
type CopyAction = "start" | "finish" | "error";

function copyReducer(_: CopyState, action: CopyAction): CopyState {
    switch (action) {
        case "start": return "copying";
        case "finish": return "copied";
        default: return "not copied";
    }
}

function useSyntaxHighlighter(code: string) {
    const [theme, setTheme] = useState(getInitialTheme);
    const [copyState, dispatch] = useReducer(copyReducer, "not copied");
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

    const onCopy = copyState === "copying" ? undefined : async () => {
        dispatch("start");
        try {
            await navigator.clipboard.writeText(code);
            dispatch("finish");
        } catch {
            dispatch("error");
        }
    }

    const copyText = copyState === "not copied"
        ? "Copy"
        : copyState === "copied"
            ? "Copied!"
            : "Copying...";

    return {
        theme: {
            ...theme,
            "pre[class*=\"language-\"]": {
                ...theme["pre[class*=\"language-\"]"],
                paddingInlineStart: 0
            } as any
        },
        preId,
        labelId,
        onCopy,
        copyText
    };
}