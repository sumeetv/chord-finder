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
                    {`...is the co-founder and CEO of Crafting and an active angel investor.
                    Previously, he scaled enterprise integrations, social products, dev
                    platforms, and more at Discord, Uber, and Meta.`}
                </Heading>
            </Flex>
        </main>
    );
}
