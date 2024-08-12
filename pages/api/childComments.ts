// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || "";
type Data = {
  message: string;
};

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { name, email, comment, parentCommentID, captcha } = req.body;

  if (!captcha) {
    return res.status(422).json({
      message: "Unproccesable request, please provide the required fields",
    });
  }

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
    // Ping the google recaptcha verify API to verify the captcha code you received
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        method: "POST",
      },
    );
    const captchaValidation = await response.json();
    if (captchaValidation.success) {
      const result = await graphQLClient.request<{
        createChildComment: { id: string };
      }>(query, {
        name,
        email,
        comment,
        parentCommentID,
      });
      const publishingResult = await graphQLClient.request<any>(
        publishingQuery,
        {
          childCommentID: result.createChildComment.id,
        },
      );
      return res.status(200).send(publishingResult);
    }
  } catch (error: any) {
    return res.status(500).send(error);
  }
}
