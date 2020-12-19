import { graphql, PageProps, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import { SEO } from '../components/seo';

type BlogPostProps = PageProps<
  Data,
  { previous: MarkdownRemark; next: MarkdownRemark }
>;

type MarkdownRemark = {
  id: string;
  excerpt: string;
  html: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
  };
};

type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  markdownRemark: MarkdownRemark;
};

const BlogPost: React.FC<BlogPostProps> = (props) => {
  const data = props.data;
  const post = data.markdownRemark;
  const siteMetadata = data.site.siteMetadata;
  const { previous, next } = props.pageContext;

  return (
    <Layout location={props.location} title={siteMetadata.title}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer></footer>
      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default BlogPost;