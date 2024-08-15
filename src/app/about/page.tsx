'use client'

import { Card, CardBody, Heading, Image, Link, ListItem, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"

export default function Page() {
    const headingPadding = "1.5rem";
    const paragraphPadding = "0.5rem";

    const commonImageProps: Object = {
        objectFit: 'contain',
        padding: '1.25rem',
    };

    const commonCardProps: Object = {
        marginY: '1.5rem',
        overflow:'hidden',
        direction: 'row',
    };

    const coffeeMenu =
        <Tabs pt={paragraphPadding}>
            <TabList>
                <Tab>Small</Tab>
                <Tab>Medium</Tab>
                <Tab>Large</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Heading size='xs'>
                        {`I can typically provide these quickly over email.`}
                    </Heading>
                    <UnorderedList>
                    <ListItem>
                            <Text>
                                {`Warm introductions to a network of strong operators with a proven track record`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`Document templates (e.g. engineering RFC, PRD, product spec)`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`Planning templates (e.g. annual, quarterly)`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`Broad engineering archetypes for career growth`}
                            </Text>
                        </ListItem>
                    </UnorderedList>
                </TabPanel>
                <TabPanel>
                    <Heading size='xs'>
                        {`These tend to be working sessions or longer async discussions.`}
                    </Heading>
                    <UnorderedList>
                        <ListItem>
                            <Text>
                                {`Pitch deck runthrough`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`One-off coaching sessions`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`Vetting a potential hire / helping with an interview`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`Giving feedback on a technical approach`}
                            </Text>
                        </ListItem>
                    </UnorderedList>
                </TabPanel>
                <TabPanel>
                    <Heading size='xs'>
                        {`Longer term projects for companies I advise.`}
                    </Heading>
                    <UnorderedList>
                        <ListItem>
                            <Text>
                                {`Developing custom engineering ladders with variable flexiblity and archetypes`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`Develping a new hiring process for a given role or job family`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`Collaborating on company strategy, planning, and goals`}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text>
                                {`Iterating on a GTM plan based on consumer feedback and industry trends`}
                            </Text>
                        </ListItem>
                    </UnorderedList>
                </TabPanel>
            </TabPanels>
        </Tabs>

    return (
        <div>
            <Heading fontFamily={'monospace'}>
                {`whois sumeetv`}
            </Heading>
            <Text>
                {`Hi! I'm an engineer at heart who loves building things, but I've learned that building goes beyond
                just code. I've found a lot of joy in building teams, organizations, products, and businesses.`}
            </Text>
            <Heading pt={headingPadding}>
                {`Investing`}
            </Heading>
            <Text>
                {`Angel investing is a way for me to ensure my incentives are aligned with founders while going deep on technical
                and product challenges they are facing. Blending the challenges of technical constraints with real business requirements
                motivates me more than either individually, and I love finding gaps in the industry and novel opportunities founders
                have discovered.`}
            </Text>
            <Text pt={paragraphPadding}>
                {`When supporting founders, I offer a variety of concrete ways I can help them to avoid the usual
                song and dance of "let me know how I can be helpful." For any founders interested in chatting, here is a sample of
                what I can offer.`}
            </Text>
            {coffeeMenu}
            <Heading pt={headingPadding}>
                {`Work`}
            </Heading>
            <Text>
                {`Or you can always check out my `}
                <Link as={NextLink} href={'https://www.linkedin.com/in/sumeet-vaidya/'} color={'blue.400'}>
                    LinkedIn
                </Link>
                {` here.`}
            </Text>
            <Card {...commonCardProps}>
                <Image src={'/about-assets/discord_logo.jpg'} alt="discord logo" {...commonImageProps} />
                <Stack>
                    <CardBody>
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
                    </CardBody>
                </Stack>
            </Card>
            <Card {...commonCardProps}>
                <Stack>
                    <CardBody>
                        <Heading size={'md'}>
                            {`Uber`}
                        </Heading>
                        <Text>
                            {`My time at Uber was split across competition in new markets on our International Growth team, building out
                            enterprise integrations for major car rental agencies, and managing our micromobility efforts during JUMP's
                            explosive growth years. My teams shipped referral tools that solved supply issues around the world, fleet
                            management tools that scaled to more markets than we anticipated, and the core products and firmware integrations
                            needed to power our fleets of bikes and scooters. I also negotiated the technical side of the Lime's acquisition of
                            our hardware and firmware. Having been on the other side of M&A and managing through major layoffs was a painful
                            but educational experience.`}
                        </Text>
                    </CardBody>
                </Stack>
                <Image src={'/about-assets/uber_com_logo.jpg'} alt="uber logo" {...commonImageProps}/>
            </Card>
            <Card {...commonCardProps}>
                <Image src={'/about-assets/facebook_logo.jpg'} alt="facebook logo" {...commonImageProps}/>
                <Stack>
                    <CardBody>
                        <Heading size={'md'}>
                            {`Meta`}
                        </Heading>
                        <Text>
                            {`I joined Facebook at time when people were still referring to us as 'Myspace 2.0' while Google+ and Twitter
                            looked like the looming giants in the space. Joining during a company-wide lockdown and seeing what it took to
                            turn the company around after our IPO helped me learn what it takes to truly compete in our industry. I worked on
                            privacy before joining the first iteration of the Public Content team, building tools for celebrities and creators
                            while tackling the challenges of public discourse at scale with ranked and threaded comments. I later helped
                            reboot the Groups product and shipped the first rich React Native integration in a core Facebook app to power a
                            new standalone Groups app.`}
                        </Text>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    )
}
