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
    mutation createChildComment(
      $name: String!
      $email: String!
      $comment: String!
      $parentCommentID: ID!
    ) {
      createChildComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          parentComment: { connect: { id: $parentCommentID } }
        }
      ) {
        id
      }
    }
  `;

  const publishingQuery = gql`
    mutation publishChildComment($childCommentID: ID!) {
      publishChildComment(where: { id: $childCommentID }, to: PUBLISHED) {
        id
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query, req.body);
    const publishingResult = await graphQLClient.request(publishingQuery, {
      childCommentID: result.createChildComment.id,
    });
    return res.status(200).send(publishingResult);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(error);
  }
}
