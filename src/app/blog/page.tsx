import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Page() {
    const postsData = getSortedPostsData()
    const postsLinks = postsData.map((postData) => (
        <li key={postData.id}>
            {postData.slug}
        </li>
    ));
    return (
        <div>
            <h1>Testing blog page</h1>
            <div>{postsLinks}</div>
        </div>
    )
}