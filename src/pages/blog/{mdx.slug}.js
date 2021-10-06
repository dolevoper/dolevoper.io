import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";

const BlogPostPage = ({ data }) => {
    const { frontmatter, body } = data.mdx;
    return (
        <Layout title={frontmatter.title}>
            <h2>{frontmatter.title}</h2>
            <MDXRenderer>{body}</MDXRenderer>
        </Layout>
    );
};

export const query = graphql`
    query($slug: String) {
        mdx(slug: {eq: $slug}) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
            }
            body
        }
    }
`;

export default BlogPostPage;
