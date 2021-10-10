import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import ExternalLink from "../../components/externalLink";
import { container, post, heroImage } from "./post.module.css";

const BlogPostPage = ({ data, location }) => {
    const { frontmatter, body } = data.mdx;
    const image = getImage(frontmatter.hero_image);

    return (
        <Layout title={frontmatter.title} path={location.pathname} description={frontmatter.description} image={frontmatter.hero_image.childImageSharp.fixed.src} type="article">
            <main className={container}>
                <article className={post}>
                    <h2>{frontmatter.title}</h2>
                    <small>{frontmatter.date}</small>
                    <p>{frontmatter.description}</p>
                    {
                        image &&
                        <figure>
                            <GatsbyImage image={image} alt={frontmatter.hero_image_alt} className={heroImage} />
                            <figcaption>
                                Photo by{" "}
                                <ExternalLink href={frontmatter.hero_image_credit_link}>{frontmatter.hero_image_credit_text}</ExternalLink>
                            </figcaption>
                        </figure>
                    }
                    <MDXRenderer>
                        {body}
                    </MDXRenderer>
                </article>
            </main>
        </Layout>
    );
};

export const query = graphql`
    query($slug: String) {
        mdx(slug: {eq: $slug}) {
            frontmatter {
                date(formatString: "MMMM D, YYYY")
                title
                description
                hero_image_alt
                hero_image_credit_link
                hero_image_credit_text
                hero_image {
                    childImageSharp {
                        gatsbyImageData
                        fixed {
                            src
                        }
                    }
                }
            }
            body
        }
    }
`;

export default BlogPostPage;
