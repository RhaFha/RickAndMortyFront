import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {ThemeProvider } from '@mui/material/styles';
import { themeOptions } from './utils/theme';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from './components/Layout';
import Home from './projects/pages/Home';
import Personajes from './projects/pages/Personajes';
import PersonajeDetalle from './projects/pages/PersonajeDetalle';
import Lugares from './projects/pages/Lugares';
import LugarDetalle from './projects/pages/LugarDetalle';
import Episodios from './projects/pages/Episodios';
import EpisodioDetalle from './projects/pages/EpisodioDetalle';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/Personaje",
        element: <Personajes />
      },
      {
        path: "/Personaje/:idPersonaje",
        element: <PersonajeDetalle />
      },
      {
        path: "/Lugar",
        element: <Lugares />
      },
      {
        path: "/Lugar/:idLugar",
        element: <LugarDetalle />
      },
      {
        path: "/Episodio",
        element: <Episodios />
      },
      {
        path: "/Episodio/:idEpisodio",
        element: <EpisodioDetalle />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
