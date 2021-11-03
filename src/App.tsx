import './App.css';
import { AuthProvider } from "./context/authContext";
import { Navbar } from "./navbar";
import { MainPage } from "./mainpage";
import { Footer } from "./footer";
import { DateServiceProvider } from "./context/dateContext";
import { AppServiceProvider } from './context/appServiceContext';
import { DataProvider } from './context/dataContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppServiceProvider>
        <DateServiceProvider>
          <DataProvider>
            <MainPage />
          </DataProvider>
        </DateServiceProvider>
      </AppServiceProvider>
      <Footer />
    </AuthProvider>
  );
}

export default App;
