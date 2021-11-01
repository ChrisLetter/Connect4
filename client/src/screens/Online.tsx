import { Heading, Flex, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import socket from './../services/socketConnection';
import { IRoom } from './../interfaces/interfaces';
import WaitingForOtherUser from './../components/WaitingForOtherUser';
import UserDashboardOnline from './../components/UserDashBoardOnline';
import ColumnOnline from '../components/ColumnOnline';
import { TriangleDownIcon } from '@chakra-ui/icons';

function Online() {
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

    function setUsersInfo(room: IRoom) {
      setPlayerOneName(room.playerOneName);
      setPlayerTwoName(room.playerTwoName);
      if (socket.id === room.playerOneSocketId) {
        setCurrentUserNumber('1');
      } else {
        setCurrentUserNumber('2');
      }
    }

    socket.on('playGame', function (room: IRoom) {
      setGameState('users-connected');
      setUsersInfo(room);
    });
  }, []);

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
            <UserDashboardOnline player="1" playerName={playerOneName} />
          </Flex>
          <Grid
            templateColumns="repeat(7, 1fr)"
            borderRadius="lg"
            bg="teal.400"
          >
            <ColumnOnline
              clicked={() => clicked('1')}
              key={'1'}
              values={column1}
            />
            <ColumnOnline
              clicked={() => clicked('2')}
              key={'2'}
              values={column2}
            />
            <ColumnOnline
              clicked={() => clicked('3')}
              key={'3'}
              values={column3}
            />
            <ColumnOnline
              clicked={() => clicked('4')}
              key={'4'}
              values={column4}
            />
            <ColumnOnline
              clicked={() => clicked('5')}
              key={'5'}
              values={column5}
            />
            <ColumnOnline
              clicked={() => clicked('6')}
              key={'6'}
              values={column6}
            />
            <ColumnOnline
              clicked={() => clicked('7')}
              key={'7'}
              values={column7}
            />
          </Grid>
          <Flex direction="column" align="center">
            <TriangleDownIcon
              pb="2vh"
              w="5vh"
              h="5vh"
              color="black"
              visibility={whoseTurn === '2' ? 'visible' : 'hidden'}
            />
            <UserDashboardOnline player="2" playerName={playerTwoName} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Online;
