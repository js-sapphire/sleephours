import './App.css';
import { AuthProvider } from "./context/authContext";
import { Navbar } from "./navbar";
import { MainPage } from "./mainpage";
import { Footer } from "./footer";
import { DateServiceProvider } from "./context/dateContext";
import { AppServiceProvider } from './context/appServiceContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppServiceProvider>
        <DateServiceProvider>
          <MainPage />
        </DateServiceProvider>
      </AppServiceProvider>
      <Footer />
    </AuthProvider>
  );
}

export default App;
