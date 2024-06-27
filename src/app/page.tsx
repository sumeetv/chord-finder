'use client'

import { Box, Center, Heading, Image, Text } from "@chakra-ui/react";

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
            <br />
            <Center paddingY={`40px`}>
                <Box paddingRight={`4`}>
                    <Image
                        borderRadius={`10px`}
                        aspectRatio={1}
                        src={'/headshot.png'}
                        alt="Headshot of Sumeet Vaidya (sumeetv)"
                    />
                </Box>
                <Text>
                    {`Welcome to my site! This is an intro for people who want to get to know
                    me, a portfolio of companies I have advised and invested in, and a playground
                    for me to tinker with.`}
                </Text>
            </Center>
            <br />
            <Heading size={'xs'}>
                {`Companies I have had the privilege of advising or investing in.`}
            </Heading>
            <Carousel>
                {companyLinks}
            </Carousel>
        </main>
    );
}
