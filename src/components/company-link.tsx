'use client'

import { Button, Card, CardBody, Heading, Link, LinkBox, LinkOverlay, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { Company } from '@/lib/companies';

interface CompanyLinkProps {
    company: Company,
}

export default function CompanyLink({company}: CompanyLinkProps) {
    const {isOpen, onOpen, onClose } = useDisclosure();

    return (
        <LinkBox>
            <Card cursor={'pointer'}>
                <CardBody w={'200px'} h={'120px'} >
                    <Heading size='xs' onClick={onOpen}>
                        {company.name}
                    </Heading>
                </CardBody>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent width={'800px'}>
                    <ModalHeader>
                        {company.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {company.desc}
                    </ModalBody>

                    <ModalFooter>
                    <Button colorScheme='blue' onClick={onClose} marginRight={'10px'}>
                        {`Close`}
                    </Button>
                    <Link href={company.url}>
                        <Button variant='ghost'>
                            {`Visit site`}
                        </Button>
                    </Link>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </LinkBox>
    );
}