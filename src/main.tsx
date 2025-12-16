import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./features/auth/context/auth.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack"; // 1. IMPORTAR ESTO

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento root");
}

const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <AuthProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
