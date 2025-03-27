const RaffleItems = [
  {
    name: "Sortear Listado",
    image: "https://cdn-icons-png.flaticon.com/512/2942/2942882.png",
    alt: "Raffle 1",
    description: [
      "Se puede subir un listado en formato csv o pegar un listado copiado",
      "Se puede elegir la cantidad de ganadores/suplentes",
    ],
    characteristics: ["Limite: 1000 participantes", "Duracion: Hasta 1 minuto"],
  },
  {
    name: "Ruleta",
    image: "https://cdn-icons-png.flaticon.com/512/559/559741.png",
    alt: "Raffle 2",
    description: [
      "Se puede subir un listado en formato csv o pegar un listado copiado",
      "Se genera un solo ganador por tirada",
      "Se puede elegir modo de ganador: ganador por primera tirada o ganador por ultima tirada",
    ],
    characteristics: ["Limite: 25 participantes", "Duracion: Modificable"],
  },
  {
    name: "Carrera de Patos",
    image: "DuckRace.png",
    alt: "Carrera de Patos",
    description: [
      "Ingresa un listado de participantes o subelo en formato csv ",
      "Avanza hasta la meta y gana el sorteo",
    ],
    characteristics: ["Limite: 10 participantes", "Duracion: Modificable"],
    redirect: "/duck-race",
  },
];

export default RaffleItems;
