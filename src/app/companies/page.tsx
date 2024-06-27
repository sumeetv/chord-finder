'use client'

import React from 'react';

import { Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";

import { CompanyList } from '@/lib/companies';
import CompanyLink from '@/components/company-link';

export default function Page() {
    let companyLinks: React.JSX.Element[] = [];
    CompanyList.forEach(company => {
        companyLinks.push(
            <WrapItem key={company.name}>
                <CompanyLink
                    name={company.name}
                    url={company.url}
                />
            </WrapItem>
        );
    });

    return (
        <div>
            <Heading>Companies</Heading>
            <br />
            <Text>
                {`These are companies I have had the privilege of working with either as an investor or advisor over the years.
                Please feel free to reach out if you'd like to get in touch with any of them.`}
            </Text>
            <br />
            <Wrap spacing={'20px'}>
                {companyLinks}
            </Wrap>
        </div>
    )
}