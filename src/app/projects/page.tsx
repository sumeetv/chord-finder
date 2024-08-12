'use client'

import { Card, CardBody, CardHeader, Heading, Image, Link, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"

export default function Page() {
    return (
        <div>
            <Heading fontFamily={'monospace'}>
                {`projects`}
            </Heading>
            <Text>
                Welcome to the random prototypes and side projects I put together in my spare time. Keep in mind that things might be a little rough or buggy, but let me know if you find any issues!
            </Text>
            <LinkBox>
                <Card variant={'with-shadow'} style={{ maxWidth: `800px` }} marginTop={`2rem`}>
                    <CardBody>
                        <LinkOverlay href='/projects/chord-finder'>
                            <Heading size={'lg'}>Chord Finder</Heading>
                        </LinkOverlay>
                        <Text>
                            A tool to help guitar players explore chords and scales
                        </Text>
                        <Image src={'/chord-selector-preview.png'} alt="Preview image of chord selector tool" />
                    </CardBody>
                </Card>
            </LinkBox>
        </div>
    )
}