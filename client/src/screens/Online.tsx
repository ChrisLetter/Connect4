import {
  Button,
  Modal,
  Flex,
  Grid,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import socket from './../services/socketConnection';
import WaitingForOtherUser from './../components/WaitingForOtherUser';
import UserDashboard from './../components/UserDashboard';
import Column from '../components/Column';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { IPlayersInfo, IRoom } from './../interfaces/interfaces';
import helperFunc from './../utils/helperFunctions';
import { useHistory } from 'react-router-dom';

function Online() {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialStateGame: IRoom = {
    id: '',
    playerOneName: '',
    playerOneSocketId: '',
    playerTwoName: '',
    playerTwoSocketId: '',
    game: {
      currentTurn: '',
      winner: '',
      moves: 0,
      column1: ['0', '0', '0', '0', '0', '0'],
      column2: ['0', '0', '0', '0', '0', '0'],
      column3: ['0', '0', '0', '0', '0', '0'],
      column4: ['0', '0', '0', '0', '0', '0'],
      column5: ['0', '0', '0', '0', '0', '0'],
      column6: ['0', '0', '0', '0', '0', '0'],
      column7: ['0', '0', '0', '0', '0', '0'],
    },
  };
  const [roomName, setRoomName] = useState('');
  const [gameStatus, setGameStatus] = useState('waiting-for-other-user');
  const [allGameInfo, setAllGameInfo] = useState(initialStateGame);
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [currentUserNumber, setCurrentUserNumber] = useState('0');
  const initialStateColumn = ['0', '0', '0', '0', '0', '0'];
  const [column1, setColumn1] = useState(initialStateColumn);
  const [column2, setColumn2] = useState(initialStateColumn);
  const [column3, setColumn3] = useState(initialStateColumn);
  const [column4, setColumn4] = useState(initialStateColumn);
  const [column5, setColumn5] = useState(initialStateColumn);
  const [column6, setColumn6] = useState(initialStateColumn);
  const [column7, setColumn7] = useState(initialStateColumn);
  const [whoseTurn, setWhoseTurn] = useState('1');
  const [currentWinner, setCurrentWinner] = useState('0');

  useEffect(() => {
    socket.on('joinedRoom', function (room: IRoom) {
      setRoomName(room.id);
      setGameStatus('waiting-for-other-user');
      console.log('game', room);
      socket.emit('ready');
    });

    socket.on('playGame', function (room: IRoom) {
      if (
        room.game.currentTurn === '1' &&
        socket.id === room.playerOneSocketId
      ) {
        setGameStatus('your-turn');
      } else {
        setGameStatus('other-player-turn');
      }
      const userChoices: IPlayersInfo = {
        playerOneName: room.playerOneName,
        playerOneColour: 'purple',
        playerTwoName: room.playerTwoName,
        playerTwoColour: 'blue',
      };
      dispatch({ type: 'PLAYERSINFO', payload: { ...userChoices } });
      setUsersInfo(room);
      setAllGameInfo(room);
    });

    socket.on('new-turn-info', function (newInfo: IRoom) {
      setAllGameInfo(newInfo);
      setColumn1(newInfo.game.column1);
      setColumn2(newInfo.game.column2);
      setColumn3(newInfo.game.column3);
      setColumn4(newInfo.game.column4);
      setColumn5(newInfo.game.column5);
      setColumn6(newInfo.game.column6);
      setColumn7(newInfo.game.column7);
      if (
        newInfo.game.currentTurn === '1' &&
        socket.id === newInfo.playerOneSocketId
      ) {
        setGameStatus('your-turn');
      } else if (
        newInfo.game.currentTurn === '2' &&
        socket.id === newInfo.playerTwoSocketId
      ) {
        setGameStatus('your-turn');
      } else {
        setGameStatus('other-player-turn');
      }
      setWhoseTurn(newInfo.game.currentTurn);
    });

    socket.on('winner-name', function (name: string, newInfo: IRoom) {
      console.log('newinfo', newInfo);
      setAllGameInfo(newInfo);
      setColumn1(newInfo.game.column1);
      setColumn2(newInfo.game.column2);
      setColumn3(newInfo.game.column3);
      setColumn4(newInfo.game.column4);
      setColumn5(newInfo.game.column5);
      setColumn6(newInfo.game.column6);
      setColumn7(newInfo.game.column7);
      if (
        newInfo.game.currentTurn === '1' &&
        socket.id === newInfo.playerOneSocketId
      ) {
        setGameStatus('your-turn');
      } else if (
        newInfo.game.currentTurn === '2' &&
        socket.id === newInfo.playerTwoSocketId
      ) {
        setGameStatus('your-turn');
      } else {
        setGameStatus('other-player-turn');
      }
      setWhoseTurn(newInfo.game.currentTurn);
      setCurrentWinner(name);
    });

    socket.on('abandonRoom', function (room) {
      const resetUserInfo: IPlayersInfo = {
        playerOneName: allGameInfo.playerOneName,
        playerOneColour: '',
        playerTwoName: '',
        playerTwoColour: '',
      };
      dispatch({ type: 'PLAYERSINFO', payload: { ...resetUserInfo } });
      setGameStatus('');
      history.push('/landing');
    });
  }, []);

  function setUsersInfo(room: IRoom) {
    // TODO: check if I really need the username of the users
    setPlayerOneName(room.playerOneName);
    setPlayerTwoName(room.playerTwoName);
    if (socket.id === room.playerOneSocketId) {
      setCurrentUserNumber('1');
    } else {
      setCurrentUserNumber('2');
    }
  }

  function clicked(numberCol: string) {
    if (
      numberCol === '1' &&
      helperFunc.checkIfColumnHasSpace(column1) &&
      gameStatus === 'your-turn'
    ) {
      const newArr = helperFunc.updateColumn(column1, whoseTurn);
      const winner = helperFunc.checkForWinner(
        newArr,
        column2,
        column3,
        column4,
        column5,
        column6,
        column7,
      );
      if (winner !== '0') {
        const winnerName =
          winner === '1'
            ? allGameInfo.playerOneName
            : allGameInfo.playerTwoName;
        socket.emit('we-have-a-winner', winnerName);
      } else {
        const newRoom = allGameInfo;
        if (allGameInfo.game.currentTurn === '1') {
          newRoom.game.currentTurn = '2';
        } else {
          newRoom.game.currentTurn = '1';
        }
        newRoom.game.column1 = newArr;
        socket.emit('turn-played', newRoom);
      }
    }
    if (
      numberCol === '2' &&
      helperFunc.checkIfColumnHasSpace(column2) &&
      gameStatus === 'your-turn'
    ) {
      const newArr = helperFunc.updateColumn(column2, whoseTurn);
      const winner = helperFunc.checkForWinner(
        column1,
        newArr,
        column3,
        column4,
        column5,
        column6,
        column7,
      );
      if (winner !== '0') {
        const winnerName =
          winner === '1'
            ? allGameInfo.playerOneName
            : allGameInfo.playerTwoName;
        socket.emit('we-have-a-winner', winnerName);
      } else {
        const newRoom = allGameInfo;
        if (allGameInfo.game.currentTurn === '1') {
          newRoom.game.currentTurn = '2';
        } else {
          newRoom.game.currentTurn = '1';
        }
        newRoom.game.column2 = newArr;
        socket.emit('turn-played', newRoom);
      }
    }
    if (
      numberCol === '3' &&
      helperFunc.checkIfColumnHasSpace(column3) &&
      gameStatus === 'your-turn'
    ) {
      const newArr = helperFunc.updateColumn(column3, whoseTurn);
      const winner = helperFunc.checkForWinner(
        column1,
        column2,
        newArr,
        column4,
        column5,
        column6,
        column7,
      );
      if (winner !== '0') {
        const winnerName =
          winner === '1'
            ? allGameInfo.playerOneName
            : allGameInfo.playerTwoName;
        socket.emit('we-have-a-winner', winnerName);
      } else {
        const newRoom = allGameInfo;
        if (allGameInfo.game.currentTurn === '1') {
          newRoom.game.currentTurn = '2';
        } else {
          newRoom.game.currentTurn = '1';
        }
        newRoom.game.column3 = newArr;
        socket.emit('turn-played', newRoom);
      }
    }
    if (
      numberCol === '4' &&
      helperFunc.checkIfColumnHasSpace(column4) &&
      gameStatus === 'your-turn'
    ) {
      const newArr = helperFunc.updateColumn(column4, whoseTurn);
      const winner = helperFunc.checkForWinner(
        column1,
        column2,
        column3,
        newArr,
        column5,
        column6,
        column7,
      );
      if (winner !== '0') {
        const winnerName =
          winner === '1'
            ? allGameInfo.playerOneName
            : allGameInfo.playerTwoName;
        socket.emit('we-have-a-winner', winnerName);
      } else {
        const newRoom = allGameInfo;
        if (allGameInfo.game.currentTurn === '1') {
          newRoom.game.currentTurn = '2';
        } else {
          newRoom.game.currentTurn = '1';
        }
        newRoom.game.column4 = newArr;
        socket.emit('turn-played', newRoom);
      }
    }
    if (
      numberCol === '5' &&
      helperFunc.checkIfColumnHasSpace(column5) &&
      gameStatus === 'your-turn'
    ) {
      const newArr = helperFunc.updateColumn(column5, whoseTurn);
      const winner = helperFunc.checkForWinner(
        column1,
        column2,
        column3,
        column4,
        newArr,
        column6,
        column7,
      );
      if (winner !== '0') {
        const winnerName =
          winner === '1'
            ? allGameInfo.playerOneName
            : allGameInfo.playerTwoName;
        socket.emit('we-have-a-winner', winnerName);
      } else {
        const newRoom = allGameInfo;
        if (allGameInfo.game.currentTurn === '1') {
          newRoom.game.currentTurn = '2';
        } else {
          newRoom.game.currentTurn = '1';
        }
        newRoom.game.column5 = newArr;
        socket.emit('turn-played', newRoom);
      }
    }
    if (
      numberCol === '6' &&
      helperFunc.checkIfColumnHasSpace(column6) &&
      gameStatus === 'your-turn'
    ) {
      const newArr = helperFunc.updateColumn(column6, whoseTurn);
      const winner = helperFunc.checkForWinner(
        column1,
        column2,
        column3,
        column4,
        column5,
        newArr,
        column7,
      );
      if (winner !== '0') {
        const winnerName =
          winner === '1'
            ? allGameInfo.playerOneName
            : allGameInfo.playerTwoName;
        socket.emit('we-have-a-winner', winnerName);
      } else {
        const newRoom = allGameInfo;
        if (allGameInfo.game.currentTurn === '1') {
          newRoom.game.currentTurn = '2';
        } else {
          newRoom.game.currentTurn = '1';
        }
        newRoom.game.column6 = newArr;
        socket.emit('turn-played', newRoom);
      }
    }
    if (
      numberCol === '7' &&
      helperFunc.checkIfColumnHasSpace(column7) &&
      gameStatus === 'your-turn'
    ) {
      const newArr = helperFunc.updateColumn(column7, whoseTurn);
      const winner = helperFunc.checkForWinner(
        column1,
        column2,
        column3,
        column4,
        column5,
        column6,
        newArr,
      );
      if (winner !== '0') {
        const winnerName =
          winner === '1'
            ? allGameInfo.playerOneName
            : allGameInfo.playerTwoName;
        socket.emit('we-have-a-winner', winnerName);
      } else {
        const newRoom = allGameInfo;
        if (allGameInfo.game.currentTurn === '1') {
          newRoom.game.currentTurn = '2';
        } else {
          newRoom.game.currentTurn = '1';
        }
        newRoom.game.column7 = newArr;
        socket.emit('turn-played', newRoom);
      }
    }
  }

  const leaveRoom = () => {
    socket.emit('leaveRoom', allGameInfo);
    history.push('/landing');
    const resetUserInfo: IPlayersInfo = {
      playerOneName: allGameInfo.playerOneName,
      playerOneColour: '',
      playerTwoName: '',
      playerTwoColour: '',
    };
    dispatch({ type: 'PLAYERSINFO', payload: { ...resetUserInfo } });
    setGameStatus('');
  };

  function ModalWinner() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ref: React.LegacyRef<HTMLButtonElement> = useRef(null);
    useEffect(() => {
      if (ref.current && currentWinner !== '0') ref.current.click();
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
              {currentWinner}
            </ModalHeader>
            <ModalCloseButton />
            <ModalFooter justifyContent="center">
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => {
                  onClose();
                  setCurrentWinner('0');
                }}
              >
                Play Again
              </Button>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  onClose();
                  leaveRoom();
                }}
              >
                Exit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Flex align="center" minH="85vh" bg="teal.400" justify="space-evenly">
      <ModalWinner />
      {gameStatus === 'waiting-for-other-user' ? (
        <WaitingForOtherUser roomName={roomName} />
      ) : (
        <Flex
          width="100vw"
          minH="85vh"
          align="center"
          justify="space-evenly"
          direction={['column', 'column', 'column', 'row']}
        >
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
          <Grid
            templateColumns="repeat(7, 1fr)"
            borderRadius="lg"
            bg="teal.400"
            width={['90vw', '80vw', '70vw', '50vw']}
          >
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
      )}
    </Flex>
  );
}

export default Online;
