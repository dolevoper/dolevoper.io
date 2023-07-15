"use client";
import { PrismLight } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import { useEffect, useState } from "react";

PrismLight.registerLanguage("javascript", javascript);

const getInitialTheme = () => window.matchMedia("(prefers-color-scheme: light)").matches ? oneLight : oneDark;

export default function SyntaxHighlighter({ language, children }: { language: string, children: string | string[] }) {
    const [theme, setTheme] = useState(getInitialTheme);

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
        <PrismLight language={language} style={theme}>{children}</PrismLight>
    );
}