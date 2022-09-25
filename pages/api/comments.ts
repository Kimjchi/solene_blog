// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || "";
type Data = {
  name: string;
};

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $postID: ID!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { id: $postID } }
        }
      ) {
        id
      }
    }
  `;

  const publishingQuery = gql`
    mutation PublishComment($commentID: ID!) {
      publishComment(where: { id: $commentID }, to: PUBLISHED) {
        id
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query, req.body);
    const publishingResult = await graphQLClient.request(publishingQuery, {
      commentID: result.createComment.id,
    });
    return res.status(200).send(publishingResult);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(error);
  }
}
