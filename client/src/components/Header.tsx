import { Heading, Flex } from '@chakra-ui/react';

function Header() {
  return (
    <Flex align="center" justify="center" minH="15vh" bg="teal.400">
      <Heading
        as="h1"
        size="3xl"
        fontWeight="bold"
        color="teal.50"
        textAlign={['center', 'center', 'left', 'left']}
      >
        Connect4
      </Heading>
    </Flex>
  );
}

export default Header;
