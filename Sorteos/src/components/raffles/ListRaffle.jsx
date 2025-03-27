import {
  VStack,
  HStack,
  Textarea,
  Button,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiUpload } from "react-icons/hi";

export function ListRaffle() {
  const [participantes, setParticipantes] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");
  const [ganador, setGanador] = useState(null);
  const [modalMensaje, setModalMensaje] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleTextareaBlur = () => {
    const lista = textareaValue
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p !== "");
    setParticipantes(lista);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const contenido = e.target.result;
      const lista = contenido
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "");

      console.log("Contenido CSV cargado:", lista);
      setParticipantes(lista);
      setTextareaValue(lista.join("\n"));
    };
    reader.readAsText(file);
  };

  const realizarSorteo = () => {
    if (participantes.length === 0) {
      alert("Debe haber al menos un participante.");
      return;
    }
    const indiceGanador = Math.floor(Math.random() * participantes.length);
    setGanador(participantes[indiceGanador]);
  };

  const descartarGanador = () => {
    const nuevaLista = participantes.filter((p) => p !== ganador);
    setParticipantes(nuevaLista);
    setTextareaValue(nuevaLista.join("\n"));
    setGanador(null);
    setModalMensaje(
      `El ganador "${ganador}" ha sido descartado y eliminado de la lista.`
    );
    setMostrarModal(true);
  };

  const aceptarGanador = () => {
    const nuevaLista = participantes.filter((p) => p !== ganador);
    setParticipantes(nuevaLista);
    setTextareaValue(nuevaLista.join("\n"));

    setGanador(null);

    setTimeout(() => {
      setModalMensaje(`El ganador "${ganador}" ha sido eliminado de la lista.`);
      setMostrarModal(true);
    }, 100);
  };
  const closeModal = () => {
    setMostrarModal(false);
  };

  return (
    <VStack spacing={4} align="start" p={5}>
      <Box width="300px">
        <Text fontWeight="bold">Participantes:</Text>
        <Textarea
          placeholder="Ingrese un participante por línea..."
          value={textareaValue}
          onChange={handleTextareaChange}
          onBlur={handleTextareaBlur}
        />
      </Box>

      <HStack spacing={3}>
        <Button
          color="black"
          backgroundColor="teal.400"
          _hover={{ bg: "teal.500" }}
          onClick={realizarSorteo}
          isDisabled={participantes.length === 0}
        >
          Sortear
        </Button>

        <Button
          color="black"
          backgroundColor="teal.400"
          _hover={{ bg: "teal.500" }}
          as="label"
          htmlFor="file-upload"
          variant="outline"
        >
          <HiUpload /> Subir archivo
        </Button>
        <Input
          id="file-upload"
          type="file"
          accept=".csv"
          hidden
          onChange={handleFileUpload}
        />
      </HStack>

      {ganador && (
        <div
          style={{
            backgroundColor: "#16a085",
            color: "teal.500",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "20px",
            position: "relative",
            display: "inline-block",
            maxWidth: "400px",
          }}
        >
          <h3>¡Felicidades!</h3>
          <p>
            🎉 El ganador es: <strong>{ganador}</strong> 🎉
          </p>
          <div>
            <button
              onClick={descartarGanador}
              style={{
                backgroundColor: "#48c9b0 ",
                padding: "10px 15px",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#1abc9c ")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#48c9b0 ")
              }
            >
              Descartar
            </button>
            <button
              onClick={aceptarGanador}
              style={{
                backgroundColor: "#48c9b0 ",
                padding: "10px 15px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#1abc9c ")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#48c9b0 ")
              }
            >
              Aceptar
            </button>
          </div>
          <button
            onClick={descartarGanador}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "20px",
            }}
          >
            X
          </button>
        </div>
      )}
      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p>{modalMensaje}</p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "gray",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </VStack>
  );
}

export default ListRaffle;
