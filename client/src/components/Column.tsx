import { Grid, GridItem } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IPlayersInfo } from './../interfaces/interfaces';

// TODO: change props type
function Column(props: any) {
  const userInfos = useSelector((state: IPlayersInfo) => {
    return state;
  });

  function whichColour(playerNumber: string) {
    if (playerNumber === '0') return 'teal.50';
    if (playerNumber === '1') return userInfos.playerOneColour;
    if (playerNumber === '2') return userInfos.playerTwoColour;
  }

  const values = props.values;

  return (
    <Grid
      templateRows="repeat(6, 1fr)"
      _hover={{ bg: 'teal.400' }}
      p="1vw"
      gap="2vw"
      onClick={() => {
        props.clicked();
      }}
    >
      <GridItem
        colSpan={1}
        bg={whichColour(values[5])}
        borderRadius="md"
        w="8vh"
        h="8vh"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'5'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[4])}
        borderRadius="md"
        w="8vh"
        h="8vh"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'4'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[3])}
        borderRadius="md"
        w="8vh"
        h="8vh"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'3'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[2])}
        borderRadius="md"
        w="8vh"
        h="8vh"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'2'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[1])}
        borderRadius="md"
        w="8vh"
        h="8vh"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'1'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[0])}
        borderRadius="md"
        w="8vh"
        h="8vh"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'0'}
      />
    </Grid>
  );
}

export default Column;
