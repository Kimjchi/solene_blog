import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || '';

export interface category {
    name: string
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