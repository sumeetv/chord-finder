import React from 'react';

import { Box, Center, Flex, Spacer } from '@chakra-ui/react';

const Header: React.FC = () => {
    return (
        <Center>
            <Flex w='100%' maxW='600px'>
                <Box bg='tomato'>
                    @sumeetv
                </Box>
                <Spacer bg='gray' />
                <Flex>
                    <Center bg='mediumseagreen'>
                        About
                    </Center>
                    <Center bg='lightgray'>
                        Companies
                    </Center>
                    <Center bg='goldenrod'>
                        Blog
                    </Center>
                    <Center bg='blueviolet'>
                        Projects
                    </Center>
                </Flex>
            </Flex>
        </Center>
        
    );
};

export default Header;