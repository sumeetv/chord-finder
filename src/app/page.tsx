'use client'

import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <main>
            <Stack spacing={4} direction={['column', 'row']} paddingTop={'1rem'}>
                <Box>
                    <Image
                        borderRadius={`10px`}
                        aspectRatio={1}
                        src={'/headshot.png'}
                        alt="Headshot of Sumeet Vaidya (sumeetv)"
                    />
                </Box>
                <Heading size='lg' fontFamily={'monospace'}>
                    {`...is an engineering and product leader, advisor, and angel investor
                    who has scaled enterprise integrations, developer platforms, social
                    products, and more at Discord, Uber, and Meta.`}
                </Heading>
            </Stack>
        </main>
    );
}
