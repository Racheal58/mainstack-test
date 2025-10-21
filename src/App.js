import { ChakraProvider } from "@chakra-ui/react";
import RevenueDashboard from "./views/revenue/RevenueDashboard";
import Navbar from "./layouts/Navbar";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <RevenueDashboard />
    </ChakraProvider>
  );
}

export default App;
