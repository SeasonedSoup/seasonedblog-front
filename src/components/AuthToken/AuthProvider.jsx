import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    async function verifyAuth() {
        const token = localStorage.getItem("token");

        if(!token) {
            setLoading(false);
            console.log("no token found");
            return;
        }

        const url = "http://localhost:8000/api/"
        try {
            const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            });

            if (!response.ok) {
                throw new Error(response.status);
            }

            const result = await response.json();

            setUser(result);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        console.log("Here is where we verify you everytime")
        verifyAuth();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, loading, verifyAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

