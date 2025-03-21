import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import Color from "./Color";

const NavBar = () => {
  return (
    <Box bg="teal.500" color="white" px={4}>
      <Flex align="center" py={4}>
        Sorteos
        <Spacer />
        <Button variant="link"  mr={4}>
          <a href="#inicio">Inicio</a>
        </Button>
        <Button variant="link" >
          <a href="#sorteos">Sorteos Disponibles</a>
        </Button>
        <Color/>
      </Flex>
    </Box>
  );
};

export default NavBar;
