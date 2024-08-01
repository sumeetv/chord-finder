'use client'

import { Heading, Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"

export default function Page() {
    return (
        <div>
            <Heading fontFamily={'monospace'}>
                {`whois sumeetv`}
            </Heading>
            <Text>
                {`Hi! I'm an engineer at heart who loves building things, but I've learned that building goes beyond
                just code. I've found a lot of joy in building teams, organizations, products, and businesses. I find
                that branching out to work with founders gives me energy and inspiration on how I focus in my
                day-to-day work.`}
            </Text>
            <Heading>
                {`Work`}
            </Heading>
            <Text>
                {`Or you can always check out my `}
                <Link as={NextLink} href={'https://www.linkedin.com/in/sumeet-vaidya/'} color={'blue.400'}>
                    LinkedIn
                </Link>
                {` here.`}
            </Text>
            <Heading size={'md'}>
                {`Discord`}
            </Heading>
            <Text>
                {`I first joined Discord when we were about 250 people and exploding in usage and popularity. During
                2020, the narrative of Discord shifted from a chat app for gamers to a global communities and communication
                platform. During my time at Discord, I helped scale the Communities and Bots teams, oversaw the acquisition
                and integration of the Ubiquity6 engineering team to form what is now our developer platform ecosystem,
                build the creators team from scratch, ran an experimental AI product organization in collaboration with
                OpenAI and other major players in the space, and led our engineering efforts to reinvest in gaming by
                partnering directly with game developers and publishers.`}
            </Text>
            <Heading size={'md'}>
                {`Uber`}
            </Heading>
            <Text>
                {``}
            </Text>
            <Heading size={'md'}>
                {`Meta`}
            </Heading>
            <Heading>
                {`Investing`}
            </Heading>
            <Text>
                {`Investing philosophy, coffee menu offerings`}
            </Text>
        </div>
    )
}