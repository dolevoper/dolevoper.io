import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/layout";

const BlogPage = ({ data }) => {
    return (
        <Layout title="Blog">
            <h2>Blog</h2>
            {data.allMdx.nodes.map(({ id, slug, frontmatter }) => (
                <article key={id}>
                    <h3><Link to={`/blog/${slug}`}>{frontmatter.title}</Link></h3>
                    <p>Published: {frontmatter.date}</p>
                </article>
            ))}
        </Layout>
    );
};

export const query = graphql`
    query {
        allMdx(sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                }
                id
                slug
            }
        }
    }
`;

export default BlogPage;
