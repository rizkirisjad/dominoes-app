import { Box, Text, Flex } from "@chakra-ui/react";

const DominoCard = ({ numbers, onClick }) => {
  const [num1, num2] = numbers;

  return (
    <Box
      w="80px"
      h="160px"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      p={2}
      cursor="pointer"
      onClick={onClick}
      _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
    >
      <Flex direction="column" h="100%" justify="space-between">
        <Box
          w="100%"
          h="45%"
          bg="gray.100"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="2xl" fontWeight="bold">
            {num1}
          </Text>
        </Box>
        <Box
          w="100%"
          h="45%"
          bg="gray.100"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="2xl" fontWeight="bold">
            {num2}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default DominoCard;
