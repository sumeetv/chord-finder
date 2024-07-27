'use client'

import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";

import { CompanyList } from "@/lib/companies";
import CompanyLink from '@/components/company-link';
import Carousel from "@/components/card-carousel";

export default function Home() {
    let companyLinks: React.JSX.Element[] = [];
    CompanyList.forEach(company => {
        companyLinks.push(
            <CompanyLink
                key={company.name}
                name={company.name}
                url={company.url}
            />
        );
    });

    return (
        <main>
            <Heading size='lg' fontFamily={'monospace'}>
                {`...is an engineering and product leader, advisor, and angel investor
                who has scaled enterprise integrations, developer platforms, social
                products, and more at Discord, Uber, and Meta.`}
            </Heading>
            <Stack spacing={4} direction={['column', 'row']}>
                <Box>
                    <Image
                        borderRadius={`10px`}
                        aspectRatio={1}
                        src={'/headshot.png'}
                        alt="Headshot of Sumeet Vaidya (sumeetv)"
                    />
                </Box>
                <Text maxW={['100%', '70%']}>
                    {`Welcome to my site! You can find information on companies I have advised and invested,
                    information on my overall investing philosophy, and how I try to help companies I'm
                    working with. I also try to use this as a place to dump thoughts
                    that I feel a need to think through and might hopefully be useful to at least one
                    other person. I've also got a section for random projects I work on more for my own
                    sake but (again) hopefully others might find useful.`}
                </Text>
            </Stack>
            <Heading size={'xs'}>
                {`Companies I have had the privilege of advising or investing in.`}
            </Heading>
            <Carousel>
                {companyLinks}
            </Carousel>
        </main>
    );
}
