import './App.css';
import { AuthProvider } from "./context/authContext";
import { Navbar } from "./navbar";
import { MainPage } from "./mainpage";
import { Footer } from "./footer";
import { DateServiceProvider } from "./context/dateContext";
import { AppContextProvider } from './context/appContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppContextProvider>
        <DateServiceProvider>
          <MainPage />
        </DateServiceProvider>
      </AppContextProvider>
      <Footer />
    </AuthProvider>
  );
}

export default App;
