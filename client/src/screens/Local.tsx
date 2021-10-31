import { Flex, Grid } from '@chakra-ui/react';
import Column from '../components/Column';
import { useSelector } from 'react-redux';
import { IPlayersInfo } from './../interfaces/interfaces';
import UserDashboard from '../components/UserDashboard';
import { useState } from 'react';
import helperFunc from '../utils/helperfunctions';

function Local() {
  const initialState = ['0', '0', '0', '0', '0', '0'];
  const [row1, setRow1] = useState(initialState);
  const [row2, setRow2] = useState(initialState);
  const [row3, setRow3] = useState(initialState);
  const [row4, setRow4] = useState(initialState);
  const [row5, setRow5] = useState(initialState);
  const [row6, setRow6] = useState(initialState);
  const [row7, setRow7] = useState(initialState);
  const [whoseTurn, setWhoseTurn] = useState('1');

  function clicked(whichColumn: string) {
    if (whichColumn === '1') {
      const newArr = helperFunc.updateRow(row1, whoseTurn);
      setRow1(newArr);
    }
    if (whichColumn === '2') {
      const newArr = helperFunc.updateRow(row2, whoseTurn);
      setRow2(newArr);
    }
    if (whichColumn === '3') {
      const newArr = helperFunc.updateRow(row3, whoseTurn);
      setRow3(newArr);
    }
    if (whichColumn === '4') {
      const newArr = helperFunc.updateRow(row4, whoseTurn);
      setRow4(newArr);
    }
    if (whichColumn === '5') {
      const newArr = helperFunc.updateRow(row5, whoseTurn);
      setRow5(newArr);
    }
    if (whichColumn === '6') {
      const newArr = helperFunc.updateRow(row6, whoseTurn);
      setRow6(newArr);
    }
    if (whichColumn === '7') {
      const newArr = helperFunc.updateRow(row7, whoseTurn);
      setRow7(newArr);
    }
    if (whoseTurn === '1') {
      setWhoseTurn('2');
    } else if (whoseTurn === '2') {
      setWhoseTurn('1');
    }
  }

  return (
    <Flex align="center" justify="space-evenly" minH="85vh" bg="teal.400">
      <UserDashboard player="1" />
      <Grid templateColumns="repeat(7, 1fr)" borderRadius="lg" bg="teal.700">
        <Column clicked={() => clicked('1')} key={'1'} values={row1} />
        <Column clicked={() => clicked('2')} key={'2'} values={row2} />
        <Column clicked={() => clicked('3')} key={'3'} values={row3} />
        <Column clicked={() => clicked('4')} key={'4'} values={row4} />
        <Column clicked={() => clicked('5')} key={'5'} values={row5} />
        <Column clicked={() => clicked('6')} key={'6'} values={row6} />
        <Column clicked={() => clicked('7')} key={'7'} values={row7} />
      </Grid>
      <UserDashboard player="2" />
    </Flex>
  );
}

export default Local;
