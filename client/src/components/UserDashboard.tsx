import { Flex, Heading, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IPlayersInfo } from './../interfaces/interfaces';

interface IProps {
  player: string;
}

function UserDashboard(props: IProps) {
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
      height={['10vh', '10vh', '10vh', '15vh']}
      direction="column"
      align="center"
      justify="center"
      bg="teal.50"
      borderRadius="md"
      p={['1vh', '2vh', '2vh', '3vh']}
      boxShadow="lg"
      width={['65vw', '40vw', '30vw', '15vw']}
    >
      <Heading
        as="h2"
        size="md"
        color="teal.800"
        textAlign={['center', 'center', 'center', 'center']}
        pb={['1vh', '1vh', '1vh', '3vh']}
        width={['65vw', '40vw', '30vw', '15vw']}
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
        p={['2', '3', '4', '5']}
        color="white"
        boxShadow="md"
      ></Box>
    </Flex>
  );
}

export default UserDashboard;
