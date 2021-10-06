import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import { heading, navBar, main } from "./layout.module.css";

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

const Layout = ({ title, children }) => {
    return (
        <>
            <SEO title={title} />
            <h1 className={heading}>DOLEVOPER</h1>
            <nav className={navBar}>
                <ul>
                    <li><Link to="/">About</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/talks">Talks</Link></li>
                </ul>
            </nav>
            <main className={main}>
                {children}
            </main>
        </>
    )
};

export default Layout;
