'use client'

import React from 'react';

import { Heading, ListItem, OrderedList, Text, Wrap, WrapItem } from "@chakra-ui/react";

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
            <Heading fontFamily={'monospace'}>
                {`companies`}
            </Heading>
            <Text>
                {`Angel investing is a way for me to ensure our incentives are aligned while going deep on technical and
                product challenges founders are facing. On a personal level, this helps me:`}
            </Text>
            <OrderedList p={'1rem'}>
                <ListItem>{`Get recharged for my day job by helping great founders working on interesting problems`}</ListItem>
                <ListItem>{`Dig more into industries and verticals that I am personally passionate about`}</ListItem>
                <ListItem>{`Support, coach, and mentor high-potential people I believe in`}</ListItem>
            </OrderedList>
            <Text>
                {`These are companies I have had the privilege of working with either as an investor or advisor over the years.
                Please feel free to reach out if you'd like to get in touch with any of them.`}
            </Text>
            <Wrap spacing={'20px'}>
                {companyLinks}
            </Wrap>
        </div>
    )
}