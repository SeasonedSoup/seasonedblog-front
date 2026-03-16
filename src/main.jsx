import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter } from 'react-router'

import Homepage from './components/Homepage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>
    }
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
)