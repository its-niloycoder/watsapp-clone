// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./static/index.css" /* why not in public folder*/


import Home from './pages/Home'
import About from './pages/About'
import Social from './pages/Social'
import WhatsappSoloGroup from './pages/WhatsappSoloGroup'

import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <WhatsappSoloGroup />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/social",
    element: <Social />
  }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
)