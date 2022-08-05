import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || '';

export interface category {
    name: string
}

export interface lightPost {
    id: string;
    featuredImage: any;
    title: string;
    slug: string;
    publishedAt: string;
    category: category;
}

export interface Post {
    id: string;
    featuredPost: boolean;
    featuredImage: any;
    title: string;
    excerpt: string;
    slug: string;
    publishedAt: string;
    category: category;
}

export const getPosts = async () => {
    // TODO change to recent posts
    const query = gql`
        query MyQuery {
            postsConnection(stage: PUBLISHED) {
                edges {
                  node {
                    category {
                        name
                    }
                    excerpt
                    featuredImage {
                      url
                    }
                    featuredPost
                    id
                    publishedAt
                    slug
                    title
                  }
                }
            }
        }
    `

    const results = await request(graphqlAPI, query);
    return results.postsConnection.edges.map(({node}: any) => node);
}

export const getSimilarPosts = async (category: string = '', slug: string) => {
    const query = gql`
        query getPostDetails($slug: String!, $category: String!) {
            posts(
                where: { slug_not: $slug, AND: {category: {name: $category} }}
                last: 3
            ) {
                featuredImage {
                  url
                }
                id
                publishedAt
                slug
                title
                category {
                    name
                }
              }
        }
    `

    const results = await request(graphqlAPI, query, { category, slug });
    return results.posts;
}

export const getCategories = async () => {
    const query = gql`
        query getCategories() {
            categories {
                name
                slug
              }
        }
    `

    const results = await request(graphqlAPI, query);
    return results.categories;
}

export const getPostDetails = async (slug: string) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                author {
                    name
                }
                category {
                    name
                }
                excerpt
                featuredImage {
                  url
                }
                featuredPost
                id
                publishedAt
                slug
                title
                content {
                    raw
                }
            }
        }
    `

    const results = await request(graphqlAPI, query, { slug });
    return results.post;
}