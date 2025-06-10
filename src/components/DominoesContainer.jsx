import { useState, useMemo } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  Input,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import DominoCard from "./DominoCard";

const defaultData = [
  [1, 2],
  [1, 1],
  [4, 1],
  [3, 3],
  [6, 1],
  [5, 1],
  [3, 2],
  [2, 3],
  [3, 1],
  [5, 1],
];

const DominoesContainer = () => {
  const [dominoes, setDominoes] = useState(defaultData);
  const [sortOrder, setSortOrder] = useState(null);
  const [removeTotal, setRemoveTotal] = useState("");
  const toast = useToast();

  const doubleCount = useMemo(() => {
    return dominoes.filter(([a, b]) => a === b).length;
  }, [dominoes]);

  const sortedDominoes = useMemo(() => {
    if (!sortOrder) return dominoes;

    return [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      const minA = Math.min(...a);
      const minB = Math.min(...b);

      if (sumA !== sumB) {
        return sortOrder === "asc" ? sumA - sumB : sumB - sumA;
      }
      return sortOrder === "asc" ? minA - minB : minB - minA;
    });
  }, [dominoes, sortOrder]);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleRemoveDuplicates = () => {
    const uniqueDominoes = dominoes.filter((domino, index, self) => {
      const [a, b] = domino;
      return (
        index ===
        self.findIndex(([x, y]) => (x === a && y === b) || (x === b && y === a))
      );
    });
    setDominoes(uniqueDominoes);
    toast({
      title: "Duplicates removed",
      status: "success",
      duration: 2000,
    });
  };

  const handleFlip = () => {
    setDominoes(dominoes.map(([a, b]) => [b, a]));
    toast({
      title: "Cards flipped",
      status: "info",
      duration: 2000,
    });
  };

  const handleRemoveByTotal = () => {
    const total = parseInt(removeTotal);
    if (isNaN(total)) {
      toast({
        title: "Please enter a valid number",
        status: "error",
        duration: 2000,
      });
      return;
    }
    const filtered = dominoes.filter(([a, b]) => a + b !== total);
    setDominoes(filtered);
    setRemoveTotal("");
    toast({
      title: `Cards with total ${total} removed`,
      status: "success",
      duration: 2000,
    });
  };

  const handleReset = () => {
    setDominoes(defaultData);
    setSortOrder(null);
    setRemoveTotal("");
    toast({
      title: "Data reset to default",
      status: "info",
      duration: 2000,
    });
  };

  return (
    <VStack spacing={6} w="100%">
      <Text fontSize="xl" fontWeight="bold">
        Double Numbers: {doubleCount}
      </Text>

      <ButtonGroup spacing={4}>
        <Button
          colorScheme="blue"
          onClick={() => handleSort("asc")}
          isActive={sortOrder === "asc"}
        >
          Sort Asc
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => handleSort("desc")}
          isActive={sortOrder === "desc"}
        >
          Sort Desc
        </Button>
        <Button colorScheme="green" onClick={handleRemoveDuplicates}>
          Remove Duplicates
        </Button>
        <Button colorScheme="purple" onClick={handleFlip}>
          Flip Cards
        </Button>
        <Button colorScheme="red" onClick={handleReset}>
          Reset
        </Button>
      </ButtonGroup>

      <HStack>
        <Input
          placeholder="Enter total to remove"
          value={removeTotal}
          onChange={(e) => setRemoveTotal(e.target.value)}
          w="200px"
        />
        <Button colorScheme="orange" onClick={handleRemoveByTotal}>
          Remove by Total
        </Button>
      </HStack>

      <Flex wrap="wrap" gap={4} justify="center">
        {sortedDominoes.map((numbers, index) => (
          <DominoCard
            key={`${numbers[0]}-${numbers[1]}-${index}`}
            numbers={numbers}
          />
        ))}
      </Flex>
    </VStack>
  );
};

export default DominoesContainer;
