import { Flex, Heading, Box } from '@chakra-ui/react';

interface IProps {
  player: string;
  playerName: string;
}

function UserDashboardOnline(props: IProps) {
  const whichColour = props.player === '1' ? 'purple' : 'blue';
  const playerName = props.playerName;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="teal.50"
      borderRadius="md"
      p="3vh"
      boxShadow="lg"
      maxW="15vw"
      minW="15vw"
    >
      <Heading
        as="h2"
        size="md"
        color="teal.800"
        textAlign={['center', 'center', 'left', 'left']}
        pb="3vh"
        maxW="15vw"
        pl="1vw"
        pr="1vw"
      >
        {playerName}
      </Heading>
      <Box
        bg={whichColour}
        w="100%"
        borderRadius="md"
        border="1px"
        borderColor="gray.200"
        p={4}
        color="white"
        boxShadow="md"
      ></Box>
    </Flex>
  );
}

export default UserDashboardOnline;
