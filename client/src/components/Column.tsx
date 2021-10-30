import { Grid, GridItem } from '@chakra-ui/react';

function Column(props: any) {
  const arr = ['1', '2', '3', '4', '5', '6'];

  return (
    <Grid templateRows="repeat(6, 1fr)" gap={7} _hover={{ bg: 'red' }}>
      {arr.map((item) => (
        <GridItem
          colSpan={1}
          bg="teal.50"
          boxShadow="md"
          borderRadius="md"
          w="9vh"
          h="9vh"
          border="1px"
          borderColor="gray.200"
          key={item}
          onClick={() => {
            props.clicked();
          }}
        />
      ))}
    </Grid>
  );
}

export default Column;
