import { Card, CardBody, CardProps, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

interface WorkHistoryCardProps extends Omit<CardProps, 'direction'> {
    companyName: string;
    description: string;
    imagePath: string;
    imageAlt: string;
    variant?: 'left' | 'right';
}

const commonImageProps = {
    objectFit: 'contain',
    padding: { base: '0.75rem', md: '1.25rem' },
    maxW: { base: '100px', md: '240px' },
    height: 'auto',
} as const;

export default function WorkHistoryCard({
    companyName,
    description,
    imagePath,
    imageAlt,
    variant = 'right',
    ...props
}: WorkHistoryCardProps) {
    const header = (
        <Flex alignItems="center" gap={{ base: 2, md: 0 }}>
            <Image 
                src={imagePath} 
                alt={imageAlt} 
                display={{ base: 'block', md: 'none' }}
                {...commonImageProps} 
            />
            <Heading size={'md'}>{companyName}</Heading>
        </Flex>
    );

    const content = (
        <Stack>
            <CardBody>
                <Stack spacing={4}>
                    {header}
                    <Text>
                        {description}
                    </Text>
                </Stack>
            </CardBody>
        </Stack>
    );

    const desktopImage = (
        <Image 
            src={imagePath} 
            alt={imageAlt} 
            display={{ base: 'none', md: 'block' }}
            {...commonImageProps} 
        />
    );

    return (
        <Card 
            marginY='1.5rem'
            overflow='hidden'
            direction={{ base: 'column', md: 'row' }}
            {...props}
        >
            {variant === 'left' ? (
                <>
                    {content}
                    {desktopImage}
                </>
            ) : (
                <>
                    {desktopImage}
                    {content}
                </>
            )}
        </Card>
    );
}
