import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { getArchivePosts, Post } from "../services";

const POSTS_DISPLAYED = 10;

export default function archives() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  // declare the async data fetching function
  const fetchData = useCallback(async (selectedPage: number) => {
    const skip = (selectedPage - 1) * POSTS_DISPLAYED;
    const postsConnection = await getArchivePosts({ skip });
    const posts = postsConnection.edges.map((edge) => edge.node);
    setPosts(posts);
    setTotalPage(Math.ceil(postsConnection.aggregate.count / POSTS_DISPLAYED));
  }, []);

  useEffect(() => {
    fetchData(1)
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData]);

  return (
    <div className="w-full h-full pl-10 pt-5">
      <h4 className="mb-5 text-2xl font-finlandica-500">
        Liste de tous les articles
      </h4>
      <ul className="w-full overflow-hidden h-1/2 pl-5">
        {posts.map((post) => {
          return (
            <li className="square-list text-lg hover-yellow" key={post.id}>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
      {posts.length > 0 && (
        <Pagination pageNumber={totalPage} callBack={fetchData} />
      )}
    </div>
  );
}
