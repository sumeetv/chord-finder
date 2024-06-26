import BlogLink from '@/components/blog-link';
import { getSortedPostsData } from '@/lib/posts';
import { Heading, Wrap, WrapItem } from '@chakra-ui/react';

export default function Page() {
    const postsData = getSortedPostsData()
    const postsLinks = postsData.map((postData) => (
        <WrapItem key={postData.id}>
            <BlogLink
                title={postData.title}
                url={`/blog/${postData.slug}`}
                date={postData.date}
            />
        </WrapItem>
    ));
    return (
        <div>
            <Heading>
                Blog
            </Heading>
            <Wrap>
                {postsLinks}
            </Wrap>
        </div>
    )
}