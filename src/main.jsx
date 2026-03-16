import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter } from 'react-router'

import Homepage from './components/Homepage'
import Post from './components/Post'
const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>
    },
    {
        path: "post/:id",
        element: <Post/>
    }
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
)