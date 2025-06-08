import moment from "moment";
import Link from "next/link";
import React from "react";
import { lightPost } from "../services";

interface SimilarArticlesProps {
  lightPosts: lightPost[];
}

export default function SimilarArticles({ lightPosts }: SimilarArticlesProps) {
  return (
    <div className="md:w-5/6 mt-7 mb-10 md:mb-0">
      <h3 className="ml-3 font-finlandica-500 text-xl mb-2">
        Ces articles devraient vous plaire
      </h3>
      <div className="flex flex-row p-3 relative bg-white">
        {lightPosts.map((post) => (
          <Link href={`/post/${post.slug}`} key={post.id} className="tw-flex">
            <div
              key={post.id}
              className="flex flex-col h-full cursor-pointer space-y-1"
            >
              <div className="relative overflow-hidden shadow-md pb-52 w-11/12">
                <img
                  src={post.featuredImage?.url}
                  alt={post.title}
                  className="object-top absolute h-52 w-full object-cover shadow-lg rounded-lg"
                ></img>
              </div>
              <h4 className="">{post.title}</h4>
              <h4 className="">
                {moment(post.displayedDate || post.createdAt).format(
                  "MMM DD, YYYY",
                ) +
                  " " +
                  (post?.category?.name || "")}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
