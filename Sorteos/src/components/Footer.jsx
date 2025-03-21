import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py={4} mt={8}>
      <Flex justify="center" gap={4}>
        <Link href="https://www.linkedin.com/in/tu-perfil" isExternal>
          <IconButton
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            size="lg"
            colorScheme="blue"
          />
        </Link>

        <Link href="https://github.com/tu-usuario" isExternal>
          <IconButton
            aria-label="GitHub"
            icon={<FaGithub />}
            size="lg"
            colorScheme="gray"
          />
        </Link>

        <Link href="mailto:tuemail@example.com">
          <IconButton
            aria-label="Email"
            icon={<FaEnvelope />}
            size="lg"
            colorScheme="red"
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
