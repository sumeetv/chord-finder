'use client'

import { Box, Card, CardBody, Heading, LinkBox, LinkOverlay, Text, useColorModeValue } from "@chakra-ui/react";

interface BlogLinkProps {
    title: string,
    url: string,
    date: string
}

export default function BlogLink(props: BlogLinkProps) {
    const date = new Date(props.date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    
    const bgColor = useColorModeValue('white', 'gray.800');
    const hoverBgColor = useColorModeValue('gray.50', 'gray.700');

    return (
        <LinkBox 
            as="article" 
            w="full"
            transition="all 0.2s"
            _hover={{
                transform: 'translateY(-4px)',
                shadow: 'lg',
            }}
        >
            <Card 
                variant={'elevated'} 
                bg={bgColor}
                _hover={{ bg: hoverBgColor }}
                h="100%"
                borderRadius="lg"
                overflow="hidden"
                transition="all 0.2s"
            >
                <CardBody p={6}>
                    <Box>
                        <Heading 
                            size='md' 
                            mb={3}
                            lineHeight="tall"
                            noOfLines={2}
                        >
                            <LinkOverlay href={props.url}>
                                {props.title}
                            </LinkOverlay>
                        </Heading>
                        <Text 
                            fontSize='sm' 
                            color="gray.500"
                            fontWeight="medium"
                        >
                            {date.toLocaleDateString('en-US', options)}
                        </Text>
                    </Box>
                </CardBody>
            </Card>
        </LinkBox>
    );
}