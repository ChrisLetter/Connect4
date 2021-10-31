import { Flex } from '@chakra-ui/react';
import FormPlayerNameOnline from './../components/FormPlayerNameOnline';

function WaitingRoomOnline() {
  return (
    <Flex align="center" justify="center" minH="85vh" bg="teal.400">
      <FormPlayerNameOnline />
    </Flex>
  );
}

export default WaitingRoomOnline;
