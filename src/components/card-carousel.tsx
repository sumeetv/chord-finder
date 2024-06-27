import React, { useRef, useEffect, useState } from 'react';
import { Box, Flex, keyframes } from '@chakra-ui/react';

interface CarouselProps {
  children: React.ReactNode;
  speed?: number; // pixels per second
}

const Carousel: React.FC<CarouselProps> = ({ children, speed = 50 }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth);
    }
  }, [children]);

  const scrollAnimation = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-${containerWidth}px); }
  `;

  const animationDuration = containerWidth / speed;

  return (
    <Box position="relative" width="100%" overflow="hidden" padding={`10px`}>
      <Flex
        ref={containerRef}
        width={`${containerWidth * 2}px`}
        animation={`${scrollAnimation} ${animationDuration}s linear infinite`}
      >
        {React.Children.map(children, (child, index) => (
          <Box key={index} flexShrink={0} padding={`10px`}>
            {child}
          </Box>
        ))}
        {React.Children.map(children, (child, index) => (
          <Box key={`duplicate-${index}`} flexShrink={0} paddingX={`10px`}>
            {child}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Carousel;