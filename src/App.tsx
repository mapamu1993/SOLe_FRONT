import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./features/auth/components/ui/input";
import { cn } from "@/lib/utils";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-900 p-10">
      
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Formulario de Prueba
        </h2>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input id="email" type="email" placeholder="hola@ejemplo.com" />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>

      </div>

    </div>
  );
}