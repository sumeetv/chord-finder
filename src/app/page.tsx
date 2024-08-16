'use client'

import { Box, Flex, Heading, Image } from "@chakra-ui/react";

export default function Home() {
    return (
        <main>
            <Flex paddingTop={'1rem'} alignItems='center'>
                <Box minWidth={'30%'}>
                    <Image
                        borderRadius={`10px`}
                        aspectRatio={1}
                        src={'/headshot.png'}
                        alt="Headshot of Sumeet Vaidya (sumeetv)"
                    />
                </Box>
                <Heading size='lg' fontFamily={'monospace'} paddingLeft={'1rem'}>
                    {`...is an engineering leader, advisor, and angel investor
                    who has scaled enterprise integrations, developer platforms, social
                    products, and more at Discord, Uber, and Meta.`}
                </Heading>
            </Flex>
        </main>
    );
}
