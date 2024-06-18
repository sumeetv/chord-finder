import { marked } from 'marked';

import BlogContent from './blog-content';
import { getPostBySlug } from "@/lib/posts";

export default async function Page({ params }: Params) {
    const post = getPostBySlug(params.slug);
    const content = marked.parse(post.content);

    const date = new Date(post.date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };


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
