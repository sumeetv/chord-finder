'use client'

import { Button, Card, CardBody, forwardRef, Heading, Link, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverTrigger, Portal } from '@chakra-ui/react';
import React from 'react';

import { Company } from '@/lib/companies';

interface CompanyLinkProps {
    company: Company,
}

const FocusedCard = forwardRef(({children, ...props}, ref) => {
    return (
        <Card w={'200px'} {...props} ref={ref}>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
})

export default function CompanyLink({company}: CompanyLinkProps) {
    const initialFocusRef = React.useRef()
    return (
        <Popover trigger='hover'>
            <PopoverTrigger>
                <FocusedCard>
                    <Heading size='xs'>
                        {company.name}
                    </Heading>
                </FocusedCard>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                        {company.desc}
                    </PopoverBody>
                    <PopoverFooter>
                        <Link href={company.url}>
                            <Button variant='ghost' colorScheme='cyan'>
                                {`Visit site`}
                            </Button>
                        </Link>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}