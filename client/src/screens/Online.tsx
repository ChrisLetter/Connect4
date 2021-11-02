import { Heading, Flex, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import socket from './../services/socketConnection';
import { IRoom } from './../interfaces/interfaces';
import WaitingForOtherUser from './../components/WaitingForOtherUser';
import UserDashboard from './../components/UserDashboard';
import Column from '../components/Column';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { IPlayersInfo } from './../interfaces/interfaces';

function Online() {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState('');
  const [gameState, setGameState] = useState('');
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [currentUserNumber, setCurrentUserNumber] = useState('0');
  const initialState = ['0', '0', '0', '0', '0', '0'];
  const [column1, setColumn1] = useState(initialState);
  const [column2, setColumn2] = useState(initialState);
  const [column3, setColumn3] = useState(initialState);
  const [column4, setColumn4] = useState(initialState);
  const [column5, setColumn5] = useState(initialState);
  const [column6, setColumn6] = useState(initialState);
  const [column7, setColumn7] = useState(initialState);
  const [whoseTurn, setWhoseTurn] = useState('1');

  useEffect(() => {
    socket.on('joinedRoom', function (room: IRoom) {
      setRoomName(room.id);
      setGameState('waiting-for-other-user');
      console.log('game', room);
      socket.emit('ready');
    });

    socket.on('playGame', function (room: IRoom) {
      setGameState('users-connected');
      const userChoices: IPlayersInfo = {
        playerOneName: room.playerOneName,
        playerOneColour: 'purple',
        playerTwoName: room.playerTwoName,
        playerTwoColour: 'blue',
      };
      dispatch({ type: 'PLAYERSINFO', payload: { ...userChoices } });
      setUsersInfo(room);
    });
  }, []);

  function setUsersInfo(room: IRoom) {
    setPlayerOneName(room.playerOneName);
    setPlayerTwoName(room.playerTwoName);
    if (socket.id === room.playerOneSocketId) {
      setCurrentUserNumber('1');
    } else {
      setCurrentUserNumber('2');
    }
  }

  function clicked(numberCol: string) {
    console.log(numberCol);
  }

  return (
    <Flex align="center" justify="space-evenly" minH="85vh" bg="teal.400">
      {gameState === 'waiting-for-other-user' ? (
        <WaitingForOtherUser roomName={roomName} />
      ) : (
        <Flex width="100vw" align="center" justify="space-evenly">
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
