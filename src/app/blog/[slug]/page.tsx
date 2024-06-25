import BlogContent from './blog-content';
import { getPostBySlug } from "@/lib/posts";

export default async function Page({ params }: Params) {
    const post = getPostBySlug(params.slug);

    return (
        <BlogContent
            title={post.title}
            date={post.date}
            content={post.content}
        />
    )
}


type Params = {
    params: {
        slug: string;
    };
};
