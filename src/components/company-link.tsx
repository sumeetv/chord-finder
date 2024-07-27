'use client'

import { Card, CardBody, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import React from 'react';

import { Company } from '@/lib/companies';

interface CompanyLinkProps {
    company: Company,
}

export default function CompanyLink({company}: CompanyLinkProps) {
    return (
        <LinkBox>
            <Card>
                <CardBody w={'200px'} h={'120px'} >
                    <Heading size='xs'>
                        <LinkOverlay href={company.url}>
                            {company.name}
                        </LinkOverlay>
                    </Heading>
                </CardBody>
            </Card>
        </LinkBox>
    );
}