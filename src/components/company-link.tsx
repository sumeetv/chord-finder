'use client'

import { Card, CardBody, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import React from 'react';

interface CompanyLinkProps {
    name: string,
    url: string;
    imageUrl?: string;
    description?: string;
}

export default function CompanyLink({ name, url, imageUrl='', description=''}: CompanyLinkProps) {
    return (
        <LinkBox>
            <Card>
                <CardBody w={'200px'} h={'120px'} >
                    <Heading size={'xs'}>
                        <LinkOverlay href={url}>
                            {name}
                        </LinkOverlay>
                    </Heading>
                </CardBody>
            </Card>
        </LinkBox>
    );
}