import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx';
import { ProductProvider } from "./context/ProductContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      
      <CartProvider>
        <ProductProvider>
        <App />
      </ProductProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
