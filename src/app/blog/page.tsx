import BlogLink from '@/components/blog-link';
import { getSortedPostsData } from '@/lib/posts';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

export default function Page() {
    const postsData = getSortedPostsData()
    const postsLinks = postsData.map((postData) => (
        <BlogLink
            key={postData.id}
            title={postData.title}
            url={`/blog/${postData.slug}`}
            date={postData.date}
        />
    ));
    return (
        <div>
            <Heading fontFamily={'monospace'}>
                {`blog`}
            </Heading>
            <Container maxW="container.xl" py={8}>
                <SimpleGrid 
                    columns={{ base: 1, md: 2, lg: 3 }} 
                    spacing={{ base: 4, lg: 6 }}
                    w="full"
                >
                    {postsLinks}
                </SimpleGrid>
            </Container>
        </div>
    )
}