'use client'

import { Card, CardBody, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

interface BlogLinkProps {
    title: string,
    url: string,
    date: string
}

export default function BlogLink(props: BlogLinkProps) {
    const date = new Date(props.date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };



    return (
        <LinkBox>
            <Card variant={'with-shadow'}>
                <CardBody>
                    <Heading size='xs'>
                        <LinkOverlay href={props.url}>
                            {props.title}
                        </LinkOverlay>
                    </Heading>
                    <Text fontSize='xs'>
                        {date.toLocaleDateString('en-US', options)}
                    </Text>
                </CardBody>
            </Card>
        </LinkBox>
    );
}