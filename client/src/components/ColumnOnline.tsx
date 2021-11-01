import { Grid, GridItem } from '@chakra-ui/react';

interface IProps {
  clicked: () => void;
  values: string[];
}

function ColumnOnline(props: IProps) {
  function whichColour(playerNumber: string) {
    if (playerNumber === '0') return 'teal.50';
    if (playerNumber === '1') return 'purple';
    if (playerNumber === '2') return 'blue';
  }

  const values = props.values;

  return (
    <Grid
      templateRows="repeat(6, 1fr)"
      _hover={{ bg: 'teal.200' }}
      p="1vw"
      gap="2vw"
      borderRadius="md"
      onClick={() => {
        props.clicked();
      }}
    >
      <GridItem
        colSpan={1}
        bg={whichColour(values[5])}
        borderRadius="md"
        w="5vw"
        h="5vw"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'5'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[4])}
        borderRadius="md"
        w="5vw"
        h="5vw"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'4'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[3])}
        borderRadius="md"
        w="5vw"
        h="5vw"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'3'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[2])}
        borderRadius="md"
        w="5vw"
        h="5vw"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'2'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[1])}
        borderRadius="md"
        w="5vw"
        h="5vw"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'1'}
      />
      <GridItem
        colSpan={1}
        bg={whichColour(values[0])}
        borderRadius="md"
        w="5vw"
        h="5vw"
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        key={'0'}
      />
    </Grid>
  );
}

export default ColumnOnline;
