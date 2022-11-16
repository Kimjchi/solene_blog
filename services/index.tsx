import { request, gql } from 'graphql-request';
import moment from "moment";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || '';

export interface category {
    name: string
}

export interface Tag {
    name: string
    slug: string
    posts: any
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

export interface Photo {
    id: string;
    title: string;
    image: Image;
    location: string;
    date: string;
    publishedAt: string;
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

export const getPosts = async ({first = 6, skip = 0}: {first?: number, skip?: number}) => {
    const query = gql`
        query GetPosts($first: Int!, $skip: Int!) {
            postsConnection(stage: PUBLISHED, first: $first, orderBy: publishedAt_DESC, skip: $skip, where: {featuredPost: false}) {
                aggregate {
                    count
                }
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
            posts(where: {featuredPost: true}, orderBy: publishedAt_DESC) {
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

    const results = await request(graphqlAPI, query, { skip, first });
    return {postsConnection: results.postsConnection, featuredPosts: results.posts};
}

export const getArchivePosts = async ({first = 10, skip = 0}: {first?: number, skip?: number}) => {
    const query = gql`
        query GetArchivePosts($first: Int!, $skip: Int!) {
            postsConnection(stage: PUBLISHED, first: $first, orderBy: publishedAt_DESC, skip: $skip) {
                aggregate {
                    count
                }
                edges {
                  node {
                    id
                    publishedAt
                    slug
                    title
                  }
                }
            }
        }
    `

    const results = await request(graphqlAPI, query, { skip, first });
    return results.postsConnection;
}

export const getCategoryPosts = async ({category, skip = 0}: {category: string, skip?: number}) => {
    const query = gql`
        query getCategoryPosts($category: String!, $skip: Int!) {
            postsConnection(stage: PUBLISHED, where: {category: {slug: $category}}, first: 6, orderBy: publishedAt_DESC, skip: $skip) {
                aggregate {
                    count
                }
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

    const results = await request(graphqlAPI, query, { category, skip });
    return results.postsConnection;
}

export const getSimilarPosts = async (category: string = '', slug: string, tags: string[] = []) => { 
    const query = gql`
        query getPostDetails($slug: String!, $category: String!, $tags: [ID!]!) {
            posts(
                where: {slug_not: $slug, OR: [{category: {name: $category}}, {tags_some: {id_in:$tags}}]}
                stage: PUBLISHED
                orderBy: publishedAt_DESC
                first: 4
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
            postsConnection(
                first: 4
                orderBy: publishedAt_DESC
                where: {slug_not: $slug}
            ) {
                edges {
                    node {
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
            }
        }
    `

    const {posts, postsConnection} = await request(graphqlAPI, query, { category, slug, tags });
    return posts.length > 0 ? posts : postsConnection.edges.map((edge: any) => edge.node);
}

export const getCategories = async () => {
    const query = gql`
        query getCategories {
            categories(orderBy: updatedAt_DESC) {
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
                    id
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
        query getTags {
            tags {
                name
                slug
                posts {
                  id
                }
            }
        }
    `

    const results = await request(graphqlAPI, query);
    return results.tags;
}

export const getTagPosts = async (slug: string, skip: number = 0) => {
    const query = gql`
        query getTagPosts($slug: String!, $skip: Int!) {
            postsConnection(where: {tags_some: {slug: $slug}}, first: 6, orderBy: publishedAt_DESC, skip: $skip, stage: PUBLISHED) {
                aggregate {
                  count
                }
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

    const results = await request(graphqlAPI, query, { slug, skip });
    return results.postsConnection;
}

export const getSearchedPosts = async (keyword: string, skip: number = 0) => {
    const query = gql`
        query getSearchedPosts($keyword: String!, $skip: Int!) {
            postsConnection(
                where: {OR: [{_search: $keyword}, {tags_some: {name_contains:$keyword}}]}, 
                first: 4, 
                orderBy: publishedAt_DESC, 
                skip: $skip, 
                stage: PUBLISHED
            ) {
                aggregate {
                  count
                }
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

    const results = await request(graphqlAPI, query, { keyword, skip });
    return results.postsConnection;
}

export const getTradProjects = async (): Promise<TradProject[]> => {
    const query = gql`
        query getTradProjects() {
            traductionProjects(first: 100) {
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

export const submitComment = async (obj: any) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    return result.json()
}

export const submitChildComment = async (obj: any) => {
    const result = await fetch('/api/childComments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    return result.json()
}

export enum PhotoAndPost {
    photo = "PHOTO",
    post = "POST"
}

export interface PhotoAndTravelPost {
    type: PhotoAndPost
    data: Photo | Post
}

export interface PhotoAndTravelResults {
    data: PhotoAndTravelPost[];
    photosCount: number;
    postsCount: number;
}

export const getPhotosAndTravelPosts = async ({skipPosts, skipPhotos}:{skipPosts: number, skipPhotos: number} ): Promise<PhotoAndTravelResults> => {
    const query = gql`
        query getPhotos($skipPhotos: Int!, $skipPosts: Int!) {
            photosConnection(orderBy: publishedAt_DESC, stage: PUBLISHED, first: 12, skip: $skipPhotos) {
                aggregate {
                  count
                }
                edges {
                  node {
                    date
                    id
                    image {
                      url
                    }
                    location
                    title
                    publishedAt
                  }
                }
              }
            postsConnection(stage: PUBLISHED, where: {category: {slug: "travels"}}, first: 6, orderBy: publishedAt_DESC, skip: $skipPosts) {
                aggregate {
                    count
                }
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

    const results = await request(graphqlAPI, query, { skipPhotos, skipPosts });
    return {
        data: [
        ...results.photosConnection.edges.map((photo: any) => ({
            type: PhotoAndPost.photo,
            data: photo.node,
        })), 
        ...results.postsConnection.edges.map((post: any) => ({
            type: PhotoAndPost.post,
            data: post.node,
        }))
    ].sort((a: PhotoAndTravelPost, b: PhotoAndTravelPost) => moment(b.data.publishedAt).diff(moment(a.data.publishedAt))),
    photosCount: results.photosConnection.aggregate.count,
    postsCount: results.postsConnection.aggregate.count
};
}