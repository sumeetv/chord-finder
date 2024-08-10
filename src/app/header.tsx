import React from 'react';

import { Center, Flex, HStack, Heading, Link, Spacer, Text } from '@chakra-ui/react';

const Header: React.FC = () => {
    const linkFontSize = ['xs', 'md'];

    return (
        <Center bg='orange.400' p='1.45rem' color='white'>
            <Flex w='100%' maxW='930px' >
                <Center>
                    <Link href='/'>
                        <Text fontSize={linkFontSize}>
                            @sumeetv
                        </Text>
                    </Link>
                </Center>
                <Spacer/>
                <HStack spacing={['0.25rem', '1rem']}>
                    <Center>
                        <Link href='/about'>
                            <Text fontSize={linkFontSize}>
                                About
                            </Text>
                        </Link>
                    </Center>
                    <Center>
                        <Link href='/companies'>
                            <Text fontSize={linkFontSize}>
                                Companies
                            </Text>
                        </Link>
                    </Center>
                    <Center>
                        <Link href='/blog'>
                            <Text fontSize={linkFontSize}>
                                Blog
                            </Text>
                        </Link>
                    </Center>
                    <Center>
                        <Link href='/projects'>
                            <Text fontSize={linkFontSize}>
                                Projects
                            </Text>
                        </Link>
                    </Center>
                </HStack>
            </Flex>
        </Center>
        
    );
};

export default Header;