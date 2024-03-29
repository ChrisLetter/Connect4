import { useState } from 'react';
import {
  FormControl,
  Button,
  Input,
  Flex,
  useToast,
  Heading,
} from '@chakra-ui/react';
import CreateRoom from '../components/CreateRoom';
import JoinRoom from '../components/JoinRoom';
import AvailableRooms from '../components/AvailableRooms';

function WaitingRoomOnline() {
  const toast = useToast();
  const [userName, setUserName] = useState('');
  const [hasSetUsername, setHasSetUsername] = useState(false);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="85vh"
      bg="teal.400"
    >
      {!hasSetUsername ? (
        <Flex
          direction="column"
          alignItems="center"
          width={['70vw', '70vw', '60vw', '40vw']}
        >
          <Heading
            as="h2"
            size="lg"
            color="white"
            textAlign="center"
            pb={['4vh', '4vh', '4vh', '4vh']}
          >
            Choose an Username
          </Heading>
          <FormControl
            id="first-name"
            colorScheme="teal"
            isRequired
            pb="3vh"
            width={['40vw', '40vw', '30vw', '15vw']}
          >
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              boxShadow="lg"
              placeholder="Enter Your Name"
              color="gray.600"
              bg="teal.50"
            />
          </FormControl>
          <Button
            colorScheme="blackAlpha"
            color="white"
            boxShadow="lg"
            mt={4}
            width={['25vw', '25vw', '20vw', '10vw']}
            type="submit"
            onClick={() => {
              if (!userName) {
                toast({
                  title: 'Error',
                  description: 'Enter your username',
                  status: 'error',
                  duration: 4000,
                  isClosable: true,
                });
              } else {
                setHasSetUsername(true);
              }
            }}
          >
            Continue
          </Button>
        </Flex>
      ) : (
        <Flex
          direction={['column', 'column', 'column', 'row']}
          alignItems="center"
          minW="80vw"
          minH="85vh"
          justifyContent="space-evenly"
        >
          <CreateRoom playerName={userName} />
          <JoinRoom playerName={userName} />
          <AvailableRooms playerName={userName} />
        </Flex>
      )}
    </Flex>
  );
}

export default WaitingRoomOnline;
