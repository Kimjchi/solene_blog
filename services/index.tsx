import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || '';

export interface category {
    name: string
}

export interface Tag {
    name: string
    slug: string
}

export interface Image {
    url: string
}

export interface lightPost {
    id: string;
    featuredImage: Image;
    title: string;
    slug: string;
    publishedAt: string;
    category: category;
}

export interface Post {
    id: string;
    featuredPost: boolean;
    featuredImage: Image;
    title: string;
    excerpt: string;
    slug: string;
    publishedAt: string;
    category: category;
    tags: Tag[];
}

export interface TradProject {
    id: string;
    title: string;
    image: Image;
    platform: string;
    numberOfSubtitles: number;
    genres: Genre[];
    koreanName?: string;
    priority?: Priority;
}

export interface Genre {
    nom: string;
}

export interface Priority {
    order: number;
}

export interface Comment extends BaseComment {
    childComments: Comment[]
}

export interface BaseComment {
    id: string;
    name: string;
    email: string;
    comment: string;
    createdAt: string;
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
                    tags {
                        name
                    }
                  }
                }
            }
        }
    `

    const results = await request(graphqlAPI, query);
    return results.postsConnection.edges.map(({node}: any) => node);
}

export const getCategoryPosts = async (category: string) => {
    // TODO change to recent posts
    const query = gql`
        query getCategoryPosts($category: String!) {
            postsConnection(stage: PUBLISHED, where: {category: {slug: $category}}) {
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
                        tags {
                            name
                        }
                    }
                }
            }
        }
    `

    const results = await request(graphqlAPI, query, { category });
    return results.postsConnection.edges.map(({node}: any) => node);
}

export const getSimilarPosts = async (category: string = '', slug: string) => { 
    // TODO get only published posts 
    const query = gql`
        query getPostDetails($slug: String!, $category: String!) {
            posts(
                where: { slug_not: $slug, AND: {category: {name: $category} }}
                last: 4
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
                tags {
                    name
                }
            }
        }
    `

    const results = await request(graphqlAPI, query, { slug });
    return results.post;
}

export const getTags = async (): Promise<Tag[]> => {
    const query = gql`
        query getTags() {
            tags(last: 10) {
                name
                slug
            }
        }
    `

    const results = await request(graphqlAPI, query);
    return results.tags;
}

export const getTagPosts = async (slug: string) => {
    // TODO change to recent posts
    const query = gql`
        query getTagPosts($slug: String!) {
            posts(where: {tags_some: {slug: $slug}}, stage: PUBLISHED, first: 10) {
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
                tags {
                    name
                }
            }
        }
    `

    const results = await request(graphqlAPI, query, { slug });
    return results.posts;
}

export const getSearchedPosts = async (keyword: string) => {
    // TODO change to recent posts
    const query = gql`
        query getSearchedPosts($keyword: String!) {
            posts(where: {_search: $keyword}, stage: PUBLISHED, first: 10) {
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
                tags {
                    name
                }
            }
        }
    `

    const results = await request(graphqlAPI, query, { keyword });
    return results.posts;
}

export const getTradProjects = async (): Promise<TradProject[]> => {
    const query = gql`
        query getTradProjects() {
            traductionProjects {
                title
                platform
                numberOfSubtitles
                image {
                  url
                }
                id
                genres {
                    nom
                }
                koreanName
                priority {
                    order
                }
            }
        }
    `

    const results = await request(graphqlAPI, query);
    return results.traductionProjects;
}

export const getPostComments = async (postID: string): Promise<Comment[]> => {
    const query = gql`
        query GetPostComments($postID: ID!) {
            comments(
            orderBy: publishedAt_ASC
            where: {post: {id: $postID}}
            ) {
            comment
            email
            name
            id
            childComments {
                comment
                email
                id
                name
                createdAt
            }
            createdAt
            }
        }
    `
    const results = await request(graphqlAPI, query, { postID });
    return results.comments;
}