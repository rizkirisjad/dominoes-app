import { ChakraProvider, Box, VStack, Heading } from "@chakra-ui/react";
import DominoesContainer from "./components/DominoesContainer";

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" py={8}>
        <VStack spacing={8} maxW="1200px" mx="auto" px={4}>
          <Heading as="h1" size="xl" color="blue.600">
            Dominoes Game
          </Heading>
          <DominoesContainer />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
