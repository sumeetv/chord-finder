import React from 'react';

import { Center, Flex, Link, Text } from '@chakra-ui/react';

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
            </Flex>
        </Center>
        
    );
};

export default Header;