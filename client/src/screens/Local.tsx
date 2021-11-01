import {
  Flex,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import Column from '../components/Column';
import UserDashboard from '../components/UserDashboard';
import { useState, useEffect, useRef } from 'react';
import helperFunc from '../utils/helperFunctions';
import { useSelector } from 'react-redux';
import { IPlayersInfo } from './../interfaces/interfaces';

function Local() {
  const userInfos = useSelector((state: IPlayersInfo) => {
    return state;
  });
  const initialState = ['0', '0', '0', '0', '0', '0'];
  const [column1, setColumn1] = useState(initialState);
  const [column2, setColumn2] = useState(initialState);
  const [column3, setColumn3] = useState(initialState);
  const [column4, setColumn4] = useState(initialState);
  const [column5, setColumn5] = useState(initialState);
  const [column6, setColumn6] = useState(initialState);
  const [column7, setColumn7] = useState(initialState);
  const [whoseTurn, setWhoseTurn] = useState('1');
  const [winner, setWinner] = useState('0');

  function clicked(whichColumn: string) {
    let actionWasPossible = false;
    if (whichColumn === '1' && helperFunc.checkIfColumnHasSpace(column1)) {
      const newArr = helperFunc.updateColumn(column1, whoseTurn);
      setColumn1(newArr);
      actionWasPossible = true;
      setWinner(
        helperFunc.checkForWinner(
          newArr,
          column2,
          column3,
          column4,
          column5,
          column6,
          column7,
        ),
      );
    }
    if (whichColumn === '2' && helperFunc.checkIfColumnHasSpace(column2)) {
      const newArr = helperFunc.updateColumn(column2, whoseTurn);
      setColumn2(newArr);
      actionWasPossible = true;
      setWinner(
        helperFunc.checkForWinner(
          column1,
          newArr,
          column3,
          column4,
          column5,
          column6,
          column7,
        ),
      );
    }
    if (whichColumn === '3' && helperFunc.checkIfColumnHasSpace(column3)) {
      const newArr = helperFunc.updateColumn(column3, whoseTurn);
      setColumn3(newArr);
      actionWasPossible = true;
      setWinner(
        helperFunc.checkForWinner(
          column1,
          column2,
          newArr,
          column4,
          column5,
          column6,
          column7,
        ),
      );
    }
    if (whichColumn === '4' && helperFunc.checkIfColumnHasSpace(column4)) {
      const newArr = helperFunc.updateColumn(column4, whoseTurn);
      setColumn4(newArr);
      actionWasPossible = true;
      setWinner(
        helperFunc.checkForWinner(
          column1,
          column2,
          column3,
          newArr,
          column5,
          column6,
          column7,
        ),
      );
    }
    if (whichColumn === '5' && helperFunc.checkIfColumnHasSpace(column5)) {
      const newArr = helperFunc.updateColumn(column5, whoseTurn);
      setColumn5(newArr);
      actionWasPossible = true;
      setWinner(
        helperFunc.checkForWinner(
          column1,
          column2,
          column3,
          column4,
          newArr,
          column6,
          column7,
        ),
      );
    }
    if (whichColumn === '6' && helperFunc.checkIfColumnHasSpace(column6)) {
      const newArr = helperFunc.updateColumn(column6, whoseTurn);
      setColumn6(newArr);
      actionWasPossible = true;
      setWinner(
        helperFunc.checkForWinner(
          column1,
          column2,
          column3,
          column4,
          column5,
          newArr,
          column7,
        ),
      );
    }
    if (whichColumn === '7' && helperFunc.checkIfColumnHasSpace(column7)) {
      const newArr = helperFunc.updateColumn(column7, whoseTurn);
      setColumn7(newArr);
      actionWasPossible = true;
      setWinner(
        helperFunc.checkForWinner(
          column1,
          column2,
          column3,
          column4,
          column5,
          column6,
          newArr,
        ),
      );
    }
    if (whoseTurn === '1' && actionWasPossible) {
      setWhoseTurn('2');
    } else if (whoseTurn === '2' && actionWasPossible) {
      setWhoseTurn('1');
    }
    const movesAvailable = checkIfThereAreMovesAvailable(
      column1,
      column2,
      column3,
      column4,
      column5,
      column6,
      column7,
    );
    if (!movesAvailable) {
      resetGame();
    }
  }

  function checkIfThereAreMovesAvailable(
    col1: string[],
    col2: string[],
    col3: string[],
    col4: string[],
    col5: string[],
    col6: string[],
    col7: string[],
  ) {
    if (
      !col1.includes('0') &&
      !col2.includes('0') &&
      !col3.includes('0') &&
      !col4.includes('0') &&
      !col5.includes('0') &&
      !col6.includes('0') &&
      !col7.includes('0')
    ) {
      return false;
    }
    return true;
  }

  function resetGame() {
    setColumn1(initialState);
    setColumn2(initialState);
    setColumn3(initialState);
    setColumn4(initialState);
    setColumn5(initialState);
    setColumn6(initialState);
    setColumn7(initialState);
    setWinner('0');
  }

  function ModalWinner() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ref: React.LegacyRef<HTMLButtonElement> = useRef(null);

    useEffect(() => {
      if (ref.current && winner !== '0') ref.current.click();
    }, []);

    return (
      <>
        <Button
          onClick={onOpen}
          ref={ref}
          position="absolute"
          visibility="hidden"
        >
          Trigger modal
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">
              {'Winner: '}
              {winner === '1'
                ? userInfos.playerOneName
                : userInfos.playerTwoName}
            </ModalHeader>
            <ModalCloseButton />
            <ModalFooter justifyContent="center">
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() => {
                  onClose();
                  resetGame();
                }}
              >
                Play Again
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Flex align="center" justify="space-evenly" minH="85vh" bg="teal.400">
      <ModalWinner />
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
