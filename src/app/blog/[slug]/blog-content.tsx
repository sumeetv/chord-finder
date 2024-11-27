'use client'

import { Heading } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import PageContainer from '@/components/page-container';

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
            <Heading size="xs">
                {date.toLocaleDateString('en-US', options)}
            </Heading>
            <PageContainer>
                <ReactMarkdown className='markdown-content' components={ChakraUIRenderer()} skipHtml>
                    {props.content}
                </ReactMarkdown>
            </PageContainer>
        </div>
    )
}