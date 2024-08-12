import React, { useCallback, useEffect, useState } from "react";
import CommentForm from "../../components/CommentForm";
import Loading from "../../components/atoms/Loading";
import PostDetail from "../../components/PostDetail";
import SimilarArticles from "../../components/SimilarArticles";

import {
  Category,
  getPostDetails,
  getSimilarPosts,
  lightPost,
  PostDetailsProps,
  Tag,
} from "../../services";


export default function PostDetails({ slug }: { slug: string }) {
  const [post, setPost] = useState<PostDetailsProps>();
  const [lightPosts, setLightPosts] = useState<lightPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // declare the async data fetching function
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const post = await getPostDetails(slug);
    const lightPosts = await getSimilarPosts(
      post?.category?.name,
      slug,
      post?.tags?.map((tag: any) => tag.id),
    );
    setPost(post);
    setLightPosts(lightPosts);
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData]);

  return (
    <div className="flex w-full">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="flex flex-col w-full">
          <PostDetail
            title={post?.title || ""}
            theme={post?.category?.name || ""}
            image={post?.featuredImage.url || ""}
            content={post?.content?.raw}
            date={new Date(post?.displayedDate || post?.createdAt || "")}
            author={post?.author?.name}
            tags={post?.tags || []}
          />
          <SimilarArticles lightPosts={lightPosts} />
          <CommentForm postID={post?.id || ""} />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  return {
    props: { slug: params.slug },
  };
}
