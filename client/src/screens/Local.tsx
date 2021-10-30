import { Flex, Grid } from '@chakra-ui/react';
import Column from '../components/Column';

function Local() {
  const row = ['1', '2', '3', '4', '5', '6', '7'];
  const clicked = (data: string) => {
    console.log(data);
  };
  return (
    <Flex align="center" justify="center" minH="85vh" bg="teal.400">
      <Grid templateColumns="repeat(7, 1fr)" gap={7}>
        {row.map((col) => (
          <Column clicked={() => clicked(col)} key={col} />
        ))}
      </Grid>
    </Flex>
  );
}

export default Local;
