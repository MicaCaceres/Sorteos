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
import { useNavigate } from "react-router-dom";

export const RaffleCard = ({
  image,
  alt,
  name,
  description = [],
  characteristics = [],
  redirect,
}) => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const navigate = useNavigate();
  return (
    <Card.Root
      display="flex"
      flexDirection={flexDirection}
      overflow="hidden"
      maxW="xl"
      border="1px solid"
      borderColor="#b4c3e4"
      p={{ base: 4, md: 10 }}
      alignItems="center"
      className="RaffleCard"
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
          <Card.Title mb="2" color="#2c2d68">
            {name}
          </Card.Title>
          <Card.Description color={"#4b4c9b"}>
            {description.map((item, index) => (
              <span key={index}>
                {item}.
                <br />
              </span>
            ))}
          </Card.Description>
          <HStack mt="4" wrap="wrap">
            {characteristics.map((item, index) => (
              <Badge key={index} color={"white"} fontSize="sm" bg={"#2c2d68"}>
                {item}
              </Badge>
            ))}
          </HStack>
        </Card.Body>
        <Card.Footer mt={{ base: 4, md: 2 }}>
          <Button
            bg="#2c2d68"
            _hover={{ bg: "#4b4c9b" }}
            // w={{ base: "100%", md: "auto" }}
            width="100px"
            onClick={() => navigate(redirect)}
          >
            Sortear
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
};

export default RaffleCard;
