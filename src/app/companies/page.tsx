'use client'

import React from 'react';

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Container, Heading, Link, Text } from "@chakra-ui/react";
import { LinkIcon } from '@chakra-ui/icons';

import { CompanyList } from '@/lib/companies';

export default function Page() {
    let companyLinks: React.JSX.Element[] = [];
    CompanyList.forEach(company => {
        companyLinks.push(
            <AccordionItem>
                <Heading size='sm'>
                    <AccordionButton cursor='select' display='flex' justifyContent='space-between'>
                        <div>
                            {company.name}
                            <Link href={company.url} isExternal={true}>
                                <LinkIcon marginLeft={'0.5rem'} color='blue.400' />
                            </Link>
                        </div>
                        <AccordionIcon />
                    </AccordionButton>
                </Heading>
                <AccordionPanel>
                    {company.desc}
                </AccordionPanel>
            </AccordionItem>
        );
    });

    return (
        <div>
            <Heading fontFamily={'monospace'}>
                {`companies`}
            </Heading>
            <Container maxW="container.xl" py={8}>
                <Text>
                    {`These are companies I have had the privilege of working with either as an investor or advisor over the years.
                    Please feel free to reach out if you'd like to get in touch with any of them.`}
                </Text>
                <Accordion allowToggle={true} paddingTop={'1rem'} paddingBottom={'3rem'}>
                    {companyLinks}
                </Accordion>
            </Container>
        </div>
    )
}