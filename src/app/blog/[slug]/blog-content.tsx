'use client'

import { Heading, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';

import './markdown.css'

interface BlogContentProps {
    title: string,
    date: string,
    content: string,
}

export default function BlogContent(props: BlogContentProps) {

    const date = new Date(props.date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };


    return (
        <div>
            <Heading>
                {props.title}
            </Heading>
            <Text>
                {date.toLocaleDateString('en-US', options)}
            </Text>
            <br />
            <ReactMarkdown className='markdown-content' components={ChakraUIRenderer()} skipHtml>
                {props.content}
            </ReactMarkdown>
        </div>
    )
}