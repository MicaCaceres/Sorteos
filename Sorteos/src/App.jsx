import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Box } from "@chakra-ui/react";
import { ListRaffle } from "./components/raffles/ListRaffle";
function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Router>
        <NavBar />
        <Box flex="1">
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/List" element={<ListRaffle />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
