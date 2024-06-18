import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Page() {
    const postsData = getSortedPostsData()
    const postsLinks = postsData.map((postData) => (
        <li key={postData.id}>
            <Link href={`/blog/${postData.slug}`}>
                {postData.title}
            </Link>
        </li>
    ));
    return (
        <div>
            <div>{postsLinks}</div>
        </div>
    )
}