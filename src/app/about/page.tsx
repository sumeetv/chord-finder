'use client'

import { Heading, Link, ListItem, OrderedList, Text } from "@chakra-ui/react"
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
                just code. I've found a lot of joy in building teams, organizations, products, and businesses.`}
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
                platform. During my time at Discord, I scaled the Communities and Bots teams, oversaw the acquisition
                and integration of the Ubiquity6 engineering team, built the creators team from scratch, ran our first AI
                product organization in collaboration with OpenAI and other major players in the space, and led our efforts
                to reinvest in gaming by partnering directly with game developers and publishers.`}
            </Text>
            <Heading size={'md'}>
                {`Uber`}
            </Heading>
            <Text>
                {`I initially joined Uber to work on the International Growth team at a time when Uber was trying to expand
                beyond the US while fending off international competition. My teams shipped referral tools that solved supply
                issues around the world along with unique fleet management tools to address a variety of markets. I moved
                over to our enterprise integrations with car rental agencies while providing prospective drivers with tools
                to get an otherwise unaffordable car so they could earn meaningful money on our platform.`}
            </Text>
            <Text>
                {`After focusing on drivers for a few years, I joined the micromobility boom and worked to integrate JUMP bikes
                and scooters into the main app. I build the product engineering organization out, led our backing infrastructure
                and firmware integrations, and, ultimately, negotiated the technical side of the Lime acquisition of our hardware
                and firmware. Having been on the other side of M&A and managing through major layoffs was a painful but educational
                experience.`}
            </Text>
            <Heading size={'md'}>
                {`Meta`}
            </Heading>
            <Text>
                {`I joined Facebook at time when people were still referring to us as 'Myspace 2.0' while Google+ and Twitter
                looked like the looming giants in the space. Joining during a company-wide lockdown and seeing what it took to
                turn the company around after our IPO helped learn what it takes to truly compete in our industry. I worked on
                privacy before joining the first iteration of the Public Content team, building tools for celebrities and creators
                while tackling the challenges of public discourse at scale with ranked and threaded comments. I later helped
                reboot the Groups product and shipped the first rich React Native integration in a core Facebook app to power a
                new standalone Groups app.`}
            </Text>
            <Heading>
                {`Investing`}
            </Heading>
            <Text>
                {`Angel investing is a way for me to ensure my incentives are aligned with founders while going deep on technical
                and product challenges they are facing. Blending the challenges of technical constraints with real business requirements
                motivates me more than either individually, and I love finding gaps in the industry and novel opportunities founders
                have discovered. When supporting founders, I offer a variety of concrete ways I can help them to avoid the usual
                song and dance of "let me know how I can be helpful." At the end of the day, I make it my priority to ensure their
                success.`}
            </Text>
        </div>
    )
}