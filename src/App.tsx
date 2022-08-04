import { Center, Heading, Image } from '@chakra-ui/react';
import Sample from '@/components/Sample';
import ReactIcon from '@/assets/react.svg';

const App = () => {
  return (
    <Center p={5} flexDir={'column'}>
      <Heading>Vite ChakraUI template</Heading>
      <Image src={ReactIcon} width={100} height={100} />
      <Sample text={'Sample text'} />
    </Center>
  );
};

export default App;
