import { Box, Text, VStack, Flex, Button } from "@chakra-ui/react";
import RaffleItems from "./utils/RaffleItems";
import RaffleCard from "./RaffleCard";
import DuckRace from "../raffles/DuckRace";
const Home = () => {
  return (
    <>
      <Box id="inicio" p={8}>
        <Text fontSize="3xl" fontWeight="bold" textAlign={"center"}>
          Bienvenido a la Página de Sorteos
        </Text>
        <Text mt={4} textAlign={"center"}>
          Aquí puedes ver nuestros sorteos disponibles.
        </Text>
      </Box>

      <Box id="sorteos" p={8}>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="teal.600"
          textAlign={"center"}
        >
          Sorteos Disponibles
        </Text>
        <Flex wrap="wrap" justify="center" itemsAlign="center" gap={6} mt={6}>
          {RaffleItems.map((item, index) => (
            <RaffleCard
              key={index}
              name={item.name}
              image={item.image}
              alt={item.alt}
              description={item.description}
              characteristics={item.characteristics}
            />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Home;
