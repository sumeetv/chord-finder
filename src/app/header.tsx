import React from 'react';

import { Center, Flex, Heading, Spacer } from '@chakra-ui/react';

const HeaderLink = (props: any) => {
    return (
        <Center p='0.5rem' {...props} />
    );
}

const Header: React.FC = () => {
    return (
        <Center bg='chocolate' p='1.45rem' color='white'>
            <Flex w='100%' maxW='930px' >
                <Heading size='2xl' bg='red'>
                    @sumeetv
                </Heading>
                <Spacer bg='gray' />
                <Flex>
                    <HeaderLink>
                        About
                    </HeaderLink>
                    <HeaderLink>
                        Companies
                    </HeaderLink>
                    <HeaderLink>
                        Blog
                    </HeaderLink>
                    <HeaderLink>
                        Projects
                    </HeaderLink>
                </Flex>
            </Flex>
        </Center>
        
    );
};

export default Header;