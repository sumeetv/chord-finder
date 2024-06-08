import React from 'react';

import { Center, Flex, Heading, Spacer } from '@chakra-ui/react';

const HeaderLink = (props: any) => {
    return (
        <Center p='0.5rem' {...props} />
    );
}

const Header: React.FC = () => {
    return (
        <Center bg='greenyellow' p='1.45rem'>
            <Flex w='100%' maxW='930px' >
                <Heading size='2xl' bg='tomato'>
                    @sumeetv
                </Heading>
                <Spacer bg='gray' />
                <Flex>
                    <HeaderLink bg='mediumseagreen'>
                        About
                    </HeaderLink>
                    <HeaderLink bg='lightgray'>
                        Companies
                    </HeaderLink>
                    <HeaderLink bg='goldenrod'>
                        Blog
                    </HeaderLink>
                    <HeaderLink bg='blueviolet'>
                        Projects
                    </HeaderLink>
                </Flex>
            </Flex>
        </Center>
        
    );
};

export default Header;