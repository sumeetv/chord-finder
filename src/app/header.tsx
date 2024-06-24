import React from 'react';

import { Center, Flex, Heading, Link, Spacer } from '@chakra-ui/react';

const LinkHeader = (props: any) => {
    return (
        <Center p='0.5rem' {...props} />
    );
}

const Header: React.FC = () => {
    return (
        <Center bg='orange.400' p='1.45rem' color='white'>
            <Flex w='100%' maxW='930px' >
                <Heading size='2xl'>
                    @sumeetv
                </Heading>
                <Spacer/>
                <Flex>
                    <LinkHeader>
                        <Link href='/'>
                            About
                        </Link>
                    </LinkHeader>
                    <LinkHeader>
                        <Link href='/companies'>
                            Companies
                        </Link>
                    </LinkHeader>
                    <LinkHeader>
                        <Link href='/blog'>
                            Blog
                        </Link>
                    </LinkHeader>
                    <LinkHeader>
                        <Link href='/projects'>
                            Projects
                        </Link>
                    </LinkHeader>
                </Flex>
            </Flex>
        </Center>
        
    );
};

export default Header;