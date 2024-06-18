import { marked } from 'marked';

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
        <div>
            <h1>
                {post.title}
            </h1>
            <div>
                {date.toLocaleDateString('en-US', options)}
            </div>
            <div dangerouslySetInnerHTML={{ __html: content}} />
        </div>
    )
}


type Params = {
    params: {
        slug: string;
    };
};
