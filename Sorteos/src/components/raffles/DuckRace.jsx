import { useEffect, useState } from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const participants = ["Mica", "Lisandro", "Sofi", "Leo", "Ana"];

const DuckRace = () => {
  const [positions, setPositions] = useState(
    participants.map(() => 0)
  );
  const [raceStarted, setRaceStarted] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (raceStarted) {
      const interval = setInterval(() => {
        setPositions((prevPositions) => {
          const newPositions = prevPositions.map((pos) =>
            pos < 80 ? pos + Math.random() * 5 : pos
          );

          // Verificamos si alguien ha llegado a la meta
          if (newPositions.some((pos) => pos >= 80)) {
            // Detenemos la carrera
            clearInterval(interval);

            // Encontramos el ganador
            const winnerIndex = newPositions.indexOf(Math.max(...newPositions));
            setWinner(participants[winnerIndex]);
          }

          return newPositions;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [raceStarted]);

  const startRace = () => {
    setPositions(participants.map(() => 0));
    setWinner(null);
    setRaceStarted(true);
  };

  return (
    <VStack spacing={4} p={4}>
      <Button onClick={startRace} isDisabled={raceStarted}>
        ¡Iniciar Carrera!
      </Button>
      <Box position="relative" w="100%" h="200px" border="1px solid black">
        {participants.map((name, index) => (
          <motion.div
            key={index}
            animate={{ x: `${positions[index]}%` }}
            transition={{ duration: 0.5, ease: "linear" }}
            style={{
              position: "absolute",
              top: `${index * 40}px`, // Fija la distancia entre cada patito
              display: "flex",
              alignItems: "center",
            }}
          >
            🦆
            <Text fontSize="sm" fontWeight="bold" mr={2}>
              {name}
            </Text>
          </motion.div>
        ))}
      </Box>
      {winner && <Text fontSize="xl" fontWeight="bold">🎉 Ganador: {winner} 🎉</Text>}
    </VStack>
  );
};

export default DuckRace;
