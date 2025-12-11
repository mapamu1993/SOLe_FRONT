import React from "react";
import { createRoot } from "react-dom/client"; // 1. Importar la función real, no el tipo
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./features/auth/context/auth.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento root");
}

// 2. Usar createRoot directamente desde react-dom/client
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
