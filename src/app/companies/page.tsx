'use client'

import React from 'react';

import { Center, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";

import CompanyLink from '@/components/company-link';

type Company = {
    name: string;
    url: string;
}

const CompanyList: Company[] = [
    {
        name: 'Atoms',
        url: 'https://atoms.com',
    },
    {
        name: 'Bazaar',
        url: 'https://www.bazaartech.com',
    },
    {
        name: 'Bedelia',
        url: 'https://www.bedelia.ai/',

    },
    {
        name: 'Coda',
        url: 'https://coda.io/',
    },
    {
        name: 'Cycle',
        url: 'https://www.cycle.app/',
    },
    {
        name: 'Dandelion Chocolate',
        url: 'https://www.dandelionchocolate.com/',
    },
    {
        name: 'Detail',
        url: 'https://detail.dev/',
    },
    {
        name: 'Dromo',
        url: 'https://dromo.io/',
    },
    {
        name: 'Marble Wallet',
        url: 'https://www.marblewallet.com/',
    },
    {
        name: 'Maverick',
        url: 'https://www.trymaverick.com/'
    },
    {
        name: 'Metal',
        url: 'https://www.metal.so/',
    },
    {
        name: 'Mykare Health',
        url: 'https://mykarehealth.com/',
    },
    {
        name: 'Nursewallet',
        url: 'https://www.nursewallet.co/',
    },
    {
        name: 'QA Wolf',
        url: 'https://www.qawolf.com/',
    },
    {
        name: 'Reins',
        url: 'https://myreins.com/',
    },
    {
        name: 'Serif Health',
        url: 'https://www.serifhealth.com/',
    },
    {
        name: 'Staging Labs',
        url: 'https://www.staginglabs.io/',
    },
    {
        name: 'Tellescope',
        url: 'https://tellescope.com/',
    },
    {
        name: 'Thoughtful',
        url: 'https://thoughtful.community/'
    },
];

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