import './App.css';
import { AuthProvider } from "./context/authContext";
import { Navbar } from "./navbar";
import { MainPage } from "./mainpage";
import { Footer } from "./footer";
import { DateServiceProvider } from "./context/dateContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <DateServiceProvider>
        <MainPage />
      </DateServiceProvider>
      <Footer />
    </AuthProvider>
  );
}

export default App;
