import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter } from 'react-router'
import {AuthProvider} from "./components/AuthToken/AuthProvider"

import Homepage from './components/Homepage'
import Post from './components/Post'
import SignUpForm from './components/SignUpForm'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>
    },
    {
        path: "post/:id",
        element: <Post/>
    },
    {
        path: "/signup",
        element: <SignUpForm/>
    }
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
             <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
    </StrictMode>,
)