import PostCard from '../components/PostCard'
import { getPosts, Post } from '../services'

interface HomeProps {
  posts: Post[];
}


export default function Home( { posts }: HomeProps) {
  const sortedPosts = posts.sort((a,b) => {
    return a.featuredPost ? (b.featuredPost ? 0 : -1) : 1
  })

  return (
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 overflow-hidden h-1/2">
            {sortedPosts.map((post, index) => {
              return (
                <PostCard 
                  isFeatured={post.featuredPost} 
                  title={post.title} 
                  theme={post.category?.name} 
                  image={post.featuredImage.url} 
                  excerpt={post.excerpt} 
                  date={new Date(post.publishedAt)}
                  key={post.id}
                  url={post.slug}
                  index={index}
                  tags={post.tags.map(({name}) => name)}
                />
            )})}
        </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts() || []);

  return {
    props: { posts }
  }
}