import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Image,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

export const RaffleCard = ({
  image,
  alt,
  name,
  description = [],
  characteristics = [],
}) => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Card.Root
      display="flex"
      flexDirection={flexDirection}
      overflow="hidden"
      maxW="xl"
      border="1px solid"
      p={{ base: 4, md: 10 }}
      alignItems="center"
    >
      <Image
        objectFit="cover"
        w={{ base: "100%", md: "200px" }}
        h={{ base: "auto", md: "200px" }}
        src={image}
        alt={alt}
        borderRadius="md"
      />
      <Box flex="1" mt={{ base: 4, md: 0 }} ml={{ md: 4 }}>
        <Card.Body>
          <Card.Title mb="2">{name}</Card.Title>
          <Card.Description>
            {description.map((item, index) => (
              <span key={index}>
                {item}.
                <br />
              </span>
            ))}
          </Card.Description>
          <HStack mt="4" wrap="wrap">
            {characteristics.map((item, index) => (
              <Badge key={index}>{item}</Badge>
            ))}
          </HStack>
        </Card.Body>
        <Card.Footer mt={{ base: 4, md: 2 }}>
          <Button
            colorScheme="blue"
            _hover={{ bg: "blue.500" }}
            w={{ base: "100%", md: "auto" }}
          >
            Realizar Sorteo
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
};

export default RaffleCard;
