import { Box, Text, VStack, Flex, Button } from "@chakra-ui/react";
import RaffleItems from "./utils/RaffleItems";
import RaffleCard from "./RaffleCard";
import DuckRace from "../raffles/DuckRace";
import Carrousel from "./Carrousel";
const Home = () => {
  return (
    <>
      <Box id="inicio" p={8}>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          textAlign={"center"}
          color="#2c2d68"
        >
          Bienvenido a la Página de Sorteos
        </Text>
      </Box>
      <Carrousel />
      <Box id="sorteos" p={8}>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          textAlign={"center"}
          color="#2c2d68"
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
              redirect={item.redirect}
            />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Home;
