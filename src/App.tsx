import './App.css';
import { AuthProvider } from "./context/authContext";
import { Navbar } from "./navbar";

function App() {
  return (
    <AuthProvider>
      <Navbar />
    </AuthProvider>
  );
}

export default App;
