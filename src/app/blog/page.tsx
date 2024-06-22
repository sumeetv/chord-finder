import { getSortedPostsData } from '@/lib/posts';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import Link from 'next/link';

export default function Page() {
    const postsData = getSortedPostsData()
    const postsLinks = postsData.map((postData) => (
        <ListItem key={postData.id}>
            <Link href={`/blog/${postData.slug}`}>
                {postData.title}
            </Link>
        </ListItem>
    ));
    return (
        <UnorderedList>
            {postsLinks}
        </UnorderedList>
    )
}