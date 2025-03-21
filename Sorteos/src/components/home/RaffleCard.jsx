import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react"

export const RaffleCard = ({ image,alt, name, description = [], characteristics = [] }) => (
  <Card.Root flexDirection="row" overflow="hidden" maxW="xl" border={"1px solid"} p={10}>
    <Image
      objectFit="fit-cover"
      maxW="200px"
      maxH="200px"
      src={image}
      alt={alt}
    />
    <Box >
      <Card.Body>
        <Card.Title mb="2">{name}</Card.Title>
        <Card.Description>
        {description.map((item, index) => (
    <span key={index}>{item+"."}<br/></span>
  ))}
        </Card.Description>
        <HStack mt="4">
        {characteristics.map((item, index) => (
    <Badges>{item}</Badge>
  ))}
        </HStack>
      </Card.Body>
      <Card.Footer>
        <Button colorScheme={"blue"} _hover={{ bg: "blue.500" }}> Realizar Sorteo</Button>
      </Card.Footer>
    </Box>
  </Card.Root>
)
 export default RaffleCard