import { Flex, Grid } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import Column from '../components/Column';
import UserDashboard from '../components/UserDashboard';
import { useState } from 'react';
import helperFunc from '../utils/helperfunctions';

function Local() {
  const initialState = ['0', '0', '0', '0', '0', '0'];
  const [column1, setColumn1] = useState(initialState);
  const [column2, setColumn2] = useState(initialState);
  const [column3, setColumn3] = useState(initialState);
  const [column4, setColumn4] = useState(initialState);
  const [column5, setColumn5] = useState(initialState);
  const [column6, setColumn6] = useState(initialState);
  const [column7, setColumn7] = useState(initialState);
  const [whoseTurn, setWhoseTurn] = useState('1');

  function clicked(whichColumn: string) {
    let winner = '0';
    let actionWasPossible = false;
    if (whichColumn === '1' && helperFunc.checkIfColumnHasSpace(column1)) {
      const newArr = helperFunc.updateColumn(column1, whoseTurn);
      setColumn1(newArr);
      actionWasPossible = true;
      winner = helperFunc.checkForWinner(
        newArr,
        column2,
        column3,
        column4,
        column5,
        column6,
        column7,
      );
    }
    if (whichColumn === '2' && helperFunc.checkIfColumnHasSpace(column2)) {
      const newArr = helperFunc.updateColumn(column2, whoseTurn);
      setColumn2(newArr);
      actionWasPossible = true;
      winner = helperFunc.checkForWinner(
        column1,
        newArr,
        column3,
        column4,
        column5,
        column6,
        column7,
      );
    }
    if (whichColumn === '3' && helperFunc.checkIfColumnHasSpace(column3)) {
      const newArr = helperFunc.updateColumn(column3, whoseTurn);
      setColumn3(newArr);
      actionWasPossible = true;
      winner = helperFunc.checkForWinner(
        column1,
        column2,
        newArr,
        column4,
        column5,
        column6,
        column7,
      );
    }
    if (whichColumn === '4' && helperFunc.checkIfColumnHasSpace(column4)) {
      const newArr = helperFunc.updateColumn(column4, whoseTurn);
      setColumn4(newArr);
      actionWasPossible = true;
      winner = helperFunc.checkForWinner(
        column1,
        column2,
        column3,
        newArr,
        column5,
        column6,
        column7,
      );
    }
    if (whichColumn === '5' && helperFunc.checkIfColumnHasSpace(column5)) {
      const newArr = helperFunc.updateColumn(column5, whoseTurn);
      setColumn5(newArr);
      actionWasPossible = true;
      winner = helperFunc.checkForWinner(
        column1,
        column2,
        column3,
        column4,
        newArr,
        column6,
        column7,
      );
    }
    if (whichColumn === '6' && helperFunc.checkIfColumnHasSpace(column6)) {
      const newArr = helperFunc.updateColumn(column6, whoseTurn);
      setColumn6(newArr);
      actionWasPossible = true;
      winner = helperFunc.checkForWinner(
        column1,
        column2,
        column3,
        column4,
        column5,
        newArr,
        column7,
      );
    }
    if (whichColumn === '7' && helperFunc.checkIfColumnHasSpace(column7)) {
      const newArr = helperFunc.updateColumn(column7, whoseTurn);
      setColumn7(newArr);
      actionWasPossible = true;
      winner = helperFunc.checkForWinner(
        column1,
        column2,
        column3,
        column4,
        column5,
        column6,
        newArr,
      );
    }
    if (whoseTurn === '1' && actionWasPossible) {
      setWhoseTurn('2');
    } else if (whoseTurn === '2' && actionWasPossible) {
      setWhoseTurn('1');
    }
  }

  return (
    <Flex align="center" justify="space-evenly" minH="85vh" bg="teal.400">
      <Flex direction="column" align="center">
        <TriangleDownIcon
          pb="2vh"
          w="5vh"
          h="5vh"
          color="black"
          visibility={whoseTurn === '1' ? 'visible' : 'hidden'}
        />
        <UserDashboard player="1" />
      </Flex>
      <Grid templateColumns="repeat(7, 1fr)" borderRadius="lg" bg="teal.400">
        <Column clicked={() => clicked('1')} key={'1'} values={column1} />
        <Column clicked={() => clicked('2')} key={'2'} values={column2} />
        <Column clicked={() => clicked('3')} key={'3'} values={column3} />
        <Column clicked={() => clicked('4')} key={'4'} values={column4} />
        <Column clicked={() => clicked('5')} key={'5'} values={column5} />
        <Column clicked={() => clicked('6')} key={'6'} values={column6} />
        <Column clicked={() => clicked('7')} key={'7'} values={column7} />
      </Grid>
      <Flex direction="column" align="center">
        <TriangleDownIcon
          pb="2vh"
          w="5vh"
          h="5vh"
          color="black"
          visibility={whoseTurn === '2' ? 'visible' : 'hidden'}
        />
        <UserDashboard player="2" />
      </Flex>
    </Flex>
  );
}

export default Local;
