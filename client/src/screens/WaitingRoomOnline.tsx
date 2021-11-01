import { useState } from 'react';
import { FormControl, Button, Input, Flex, useToast } from '@chakra-ui/react';
import CreateRoom from './../components/CreateRoom';
import JoinRoom from './../components/JoinRoom';

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
        <Flex direction="column" alignItems="center" width="15vw">
          <FormControl id="first-name" colorScheme="teal" isRequired pb="3vh">
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
            width="10vw"
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
        <Flex direction="row" minW="60vw" justifyContent="space-between">
          <CreateRoom playerName={userName} />
          <JoinRoom playerName={userName} />
        </Flex>
      )}
    </Flex>
  );
}

export default WaitingRoomOnline;
