const RaffleItems = [
  {
    name: "Sortear Listado",
    image: "https://cdn-icons-png.flaticon.com/512/2942/2942882.png",
    alt: "Raffle 1",
    description: [
      "Se puede subir un listado en formato csv o pegar un listado copiado",
      "Realiza el sorteo de un listado! 🎉 Intenta tu sorteo!",
      "Tiene un contador de segundos luego de que se encuentra un ganador",
      "Se puede descartar o quitar al ganador de la lista",
    ],
    characteristics: [],
    redirect: "/List",
  },
  {
    name: "Ruleta",
    image: "https://cdn-icons-png.flaticon.com/512/559/559741.png",
    alt: "Raffle 2",
    description: [
      "Se puede subir un listado en formato csv o pegar un listado copiado",
      "Se genera un solo ganador por tirada",
    ],
    characteristics: ["Limite: 25 participantes"],
    redirect: "/Roulette",
  },
  {
    name: "Carrera de Patos",
    image: "DuckRace.png",
    alt: "Carrera de Patos",
    description: [
      "Ingresa un listado de participantes o subelo en formato csv ",
      "Avanza hasta la meta y gana el sorteo",
    ],
    characteristics: ["Limite: 12 participantes"],
    redirect: "/DuckRace",
  },
];

export default RaffleItems;
