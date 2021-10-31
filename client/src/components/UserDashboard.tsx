import { Flex, Heading } from '@chakra-ui/react';
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
    <Flex direction="column" align="center" justify="center">
      <Heading
        as="h2"
        size="lg"
        color="teal.50"
        textAlign={['center', 'center', 'left', 'left']}
        pb="3vh"
      >
        Player {DisplayInfo.playerNumber}
      </Heading>
      <Heading
        as="h2"
        size="md"
        color="teal.50"
        textAlign={['center', 'center', 'left', 'left']}
        pb="3vh"
      >
        Name: {DisplayInfo.playerName}
      </Heading>
      <Heading
        as="h2"
        size="md"
        color="teal.50"
        textAlign={['center', 'center', 'left', 'left']}
        pb="3vh"
      >
        Colour: {DisplayInfo.playerColour}
      </Heading>
    </Flex>
  );
}

export default UserDashboard;
