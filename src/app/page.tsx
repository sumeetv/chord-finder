'use client'

import { Link } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <div>
        <Link href='https://www.google.com' color='blue.400' _hover={{ color: 'blue.500' }}>
          Where does this go
        </Link>
      </div>
    </main>
  );
}
