'use client'

import { Heading, Text } from "@chakra-ui/react"
import Head from "next/head"
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
                {`Some text about Discord, Uber, and Meta`}
            </Text>
            <Heading>
                {`Investing`}
            </Heading>
            <Text>
                {`Investing philosophy, coffee menu offerings`}
            </Text>
        </div>
    )
}