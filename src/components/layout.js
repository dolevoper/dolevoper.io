import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";
import styled from "styled-components";
import ExternalLink from "./externalLink";
import { heading, navBar, hamburger, menuOpen } from "./layout.module.css";

import "./layout.css";

const Seo = ({ title, description }) => {
    const { site: { siteMetadata } } = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                siteUrl
                title
                titleTemplate
                description
            }
        }
    }
    `);

    const [url, setUrl] = React.useState(siteMetadata.siteUrl);

    React.useEffect(() => {
        setUrl(`${siteMetadata.siteUrl}${window.location.pathname}`);
    }, [siteMetadata.siteUrl]);

    return (
        <Helmet
            title={title}
            titleTemplate={siteMetadata.titleTemplate}
            defaultTitle={siteMetadata.title}
            htmlAttributes={{ lang: "en" }}>
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title ?? siteMetadata.title} />
            <meta property="description" content={description ?? siteMetadata.description} />
        </Helmet>
    );
};

const components = {
    p: styled.p`margin: 1rem 0;`,
    h3: styled.h3`margin: 2rem 0;`,
    hr: styled.hr`margin: 2rem 0;`,
    ol: styled.ol`margin: 1rem 0 1rem 3rem;`,
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

        const Pre = styled.pre`
            padding: 1rem;
            line-height: 1;
            overflow: auto;
            max-height: 70vh;
        `

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

const Layout = ({ title, description, children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <MDXProvider components={components}>
            <Seo title={title} description={description} />
            <h1 className={heading}>DOLEVOPER</h1>
            <nav className={navBar}>
                <FontAwesomeIcon icon={faBars} className={hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                <ul className={isMenuOpen ? menuOpen : ""}>
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
