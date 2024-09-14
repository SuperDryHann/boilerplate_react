import logo from './logo.svg';
import './App.css';
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./features/auth/msalConfig";
import PrivateRoute from "./features/auth/PrivateRoute";
import LogoutButton from "./features/auth/LogoutButton";
import AuthTestButton from "./features/auth/AuthTestButton";


function App() {
  return (
    <div className="App">
      <MsalProvider instance={msalInstance}>
        <PrivateRoute>
          <LogoutButton/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <AuthTestButton/>
          </header>
        </PrivateRoute>  
      </MsalProvider>
    </div>
  );
}

export default App;
