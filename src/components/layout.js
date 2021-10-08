import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";
import styled from "styled-components";
import ExternalLink from "./externalLink";
import { heading, navBar } from "./layout.module.css";

import "./layout.css";

const SEO = ({ title }) => {
    const { site: { siteMetadata } } = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                siteUrl
                titleTemplate
            }
        }
    }
    `);

    const url = `${siteMetadata.siteUrl}${window.location.pathname}`;

    return (
        <Helmet title={title} titleTemplate={siteMetadata.titleTemplate}>
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
        </Helmet>
    );
};

const components = {
    p: styled.p`margin: 1rem 0;`,
    h3: styled.h3`margin: 2rem 0;`,
    hr: styled.hr`margin: 2rem 0;`,
    ol: styled.ol`margin: 1rem 3rem;`,
    li: styled.li`margin: 1rem 0;`,
    a: ExternalLink,
    inlineCode: styled.code`
        background-color: #e8e8e8;
        padding: 0.1rem 0.34em;
        font-weight: 300;
        font-family: 'Roboto', sans-serif
    `,
    pre: props => {
        const className = props.children.props.className || '';
        const matches = className.match(/language-(?<lang>.*)/);

        const Pre = styled.pre`padding: 1rem;`

        return (
            <Highlight
                {...defaultProps}
                theme={theme}
                code={props.children.props.children}
                language={matches?.groups?.lang ?? ""}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Pre className={className} style={style}>
                        {tokens.slice(0, -1).map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </Pre>
                )}
            </Highlight>
        );
    }
};

const Layout = ({ title, children }) => {
    return (
        <MDXProvider components={components}>
            <SEO title={title} />
            <h1 className={heading}>DOLEVOPER</h1>
            <nav className={navBar}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/talks">Talks</Link></li>
                </ul>
            </nav>
            {children}
        </MDXProvider>
    )
};

export default Layout;
