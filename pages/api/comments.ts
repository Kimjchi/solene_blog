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
  const { name, email, comment, postID, captcha } = req.body;

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
        createComment: { id: string };
      }>(query, {
        name,
        email,
        comment,
        postID,
      });
      const publishingResult = await graphQLClient.request<any>(
        publishingQuery,
        {
          commentID: result.createComment.id,
        },
      );
      return res.status(200).send(publishingResult);
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(error);
  }
}
