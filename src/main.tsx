import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, Routes } from 'react-router-dom';
import { routes } from './routes/routes.tsx';
import { UserProvider } from './context/useContext.tsx';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
      <RouterProvider router={routes}></RouterProvider>
      </UserProvider>
    </QueryClientProvider>

  </StrictMode>


)
