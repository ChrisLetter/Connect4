import { Grid, GridItem } from '@chakra-ui/react';

// TODO: change props type
function Column(props: any) {
  const arr = ['1', '2', '3', '4', '5', '6'];
  const values = props.values;

  return (
    <Grid
      templateRows="repeat(6, 1fr)"
      _hover={{ bg: 'teal.400' }}
      p="1vw"
      gap="2vw"
    >
      {arr.map((item) => (
        <GridItem
          colSpan={1}
          bg="teal.50"
          // boxShadow="md"
          borderRadius="md"
          w="8vh"
          h="8vh"
          border="1px"
          boxShadow="md"
          borderColor="gray.200"
          key={item}
          onClick={() => {
            props.clicked();
            console.log(values);
          }}
        />
      ))}
    </Grid>
  );
}

export default Column;
