import { Box, Flex, Button, Spacer } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1000}
      bg="rgba(42, 28, 120, 0.8)" // mismo color pero translúcido
      backdropFilter="blur(10px)"
      px={6}
      py={3}
      color="white"
      boxShadow="md"
    >
      <Flex align="center">
        <Box fontWeight="bold" fontSize="xl">
          Sorteos
        </Box>
        <Spacer />
        <Button
          variant="ghost"
          color="white"
          _hover={{ bg: "rgba(42, 28, 120, 0.8)" }}
          mr={4}
        >
          <a href="/#inicio">Inicio</a>
        </Button>
        <Button
          variant="ghost"
          color="white"
          _hover={{ bg: "rgba(42, 28, 120, 0.8)" }}
        >
          <a href="/#sorteos">Sorteos Disponibles</a>
        </Button>
      </Flex>
    </Box>
  );
};

export default NavBar;
