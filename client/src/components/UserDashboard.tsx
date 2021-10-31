import { Flex, Heading, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IPlayersInfo } from './../interfaces/interfaces';

// TODO: fix props type

function UserDashboard(props: any) {
  const userInfos = useSelector((state: IPlayersInfo) => {
    return state;
  });
  const DisplayInfo = {
    playerNumber: props.player,
    playerName:
      props.player === '1' ? userInfos.playerOneName : userInfos.playerTwoName,
    playerColour:
      props.player === '1'
        ? userInfos.playerOneColour
        : userInfos.playerTwoColour,
  };
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
        {DisplayInfo.playerName}
      </Heading>
      <Box
        bg={DisplayInfo.playerColour}
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

export default UserDashboard;
