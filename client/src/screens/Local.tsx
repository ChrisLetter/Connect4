import { Flex, Grid } from '@chakra-ui/react';
import Column from '../components/Column';
import { useSelector } from 'react-redux';
import { IPlayersInfo } from './../interfaces/interfaces';
import UserDashboard from '../components/UserDashboard';

function Local() {
  const row = ['1', '2', '3', '4', '5', '6', '7'];
  let userInfos = useSelector((state: IPlayersInfo) => {
    return state;
  });
  const clicked = (data: string) => {
    console.log(data);
  };

  return (
    <Flex align="center" justify="space-evenly" minH="85vh" bg="teal.400">
      <UserDashboard player="1" />
      <Grid templateColumns="repeat(7, 1fr)" gap={7}>
        {row.map((col) => (
          <Column clicked={() => clicked(col)} key={col} />
        ))}
      </Grid>
      <UserDashboard player="2" />
    </Flex>
  );
}

export default Local;
