import * as React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import { container, post, coverImage } from "./blog.module.css";

const BlogPage = ({ data }) => {
    return (
        <Layout title="Blog">
            <main className={container}>
                <h2>Blog</h2>
                {data.allMdx.nodes.map(({ id, slug, frontmatter }) => {
                    const image = getImage(frontmatter.hero_image);

                    return (
                        <article key={id} className={post}>
                            <figure>
                                <GatsbyImage image={image} alt={frontmatter.hero_image_alt} className={coverImage} />
                            </figure>
                            <h3><Link to={`/blog/${slug}`}>{frontmatter.title}</Link></h3>
                            <small>Published: {frontmatter.date}</small>
                            <p>{frontmatter.description}</p>
                        </article>
                    );
                })}
            </main>
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
                    description
                    hero_image_alt
                    hero_image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                id
                slug
            }
        }
    }
`;

export default BlogPage;
