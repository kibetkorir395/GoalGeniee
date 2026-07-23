import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
import { ThemeContextProvider } from "./ThemeContext";
import './App.scss';
import './pages.scss';
import { PriceContextProvider } from './PriceContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthContextProvider>
    <ThemeContextProvider>
      <PriceContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PriceContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
  </StrictMode>,
)
