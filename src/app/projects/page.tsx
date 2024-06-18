'use client'

import { Card, CardBody, CardHeader, Heading, Image, Link, Text } from "@chakra-ui/react"

export default function Page() {
    return (
        <div>
            <Heading>Projects</Heading>
            <Text>
                Welcome to the random prototypes and side projects I put together in my spare time. Keep in mind that things might be a little rough or buggy, but let me know if you find any issues!
            </Text>
            <Link>
                <Card style={{ maxWidth: `800px` }}>
                    <CardHeader>
                        <Text>Chord Finder</Text>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            A tool to help guiitar players explore chords and scales
                        </Text>
                    </CardBody>
                    <Image src={'/chord_selector_preview.png'} style={{ paddingLeft: `1.875rem`, paddingRight: `1.875rem` }} />
                </Card>
            </Link>
        </div>
    )
}