'use client'

import { Container, ContainerProps } from "@chakra-ui/react"
import { ReactNode } from "react"

interface PageContainerProps extends ContainerProps {
    children: ReactNode
}

export default function PageContainer({ children, ...props }: PageContainerProps) {
    return (
        <Container 
            maxW="container.xl" 
            py={8} 
            {...props}
        >
            {children}
        </Container>
    )
}
