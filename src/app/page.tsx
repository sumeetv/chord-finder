'use client'

import { Heading, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <main>
            <Heading size='xl'>
                🏗️ Under Construction
            </Heading>
            <br />
            <Text>
                {`I'm currently updating my homepage, so come back in a bit to see something that is hopefully a bit better`}
            </Text>
            <br />
            <Text>
                {`I'm an engineering and product leader, advisor, and angel investor who has hired and scaled teams to
                build enterprise integrations, developer platforms, social products, and more at Discord, Uber, and Facebook.
                You can find information on my past work, investments, approach to angel investing, and some of my many 
                side projects here.`}
            </Text>
        </main>
    );
}
